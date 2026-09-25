import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Prevent path traversal and dangerous names by using a UUID
    const safeName = crypto.randomUUID();
    cb(null, safeName);
  }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = [
    'application/pdf', 
    'image/jpeg', 
    'image/png', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
    'application/msword'
  ];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Formato de arquivo não suportado. Apenas PDF, JPG, PNG e DOCX são permitidos.'));
  }
};

const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});


const JWT_SECRET = process.env.JWT_SECRET || 'ouvidoria-super-secret-key-2024';

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { user, pass } = req.body;
    const usuario = await prisma.usuario.findUnique({ where: { login: user } });
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const isMatch = await bcrypt.compare(pass, usuario.senha);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ id: usuario.id, role: 'admin' }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// Auth middleware
const requireAuth = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};

// List all manifestacoes
app.get('/api/manifestacoes', async (req, res) => {
  try {
    const manifestacoes = await prisma.manifestacao.findMany({
      include: { anexos: true },
      orderBy: { dataRegistro: 'desc' }
    });
    res.json(manifestacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar manifestações' });
  }
});

// Get by protocol
app.get('/api/manifestacoes/protocol/:protocol', async (req, res) => {
  try {
    const manifestacao = await prisma.manifestacao.findUnique({
      where: { protocol: req.params.protocol },
      include: { anexos: true }
    });
    
    if (!manifestacao) {
      return res.status(404).json({ error: 'Protocolo não encontrado' });
    }
    
    res.json(manifestacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar protocolo' });
  }
});

// Create new manifestacao
app.post('/api/manifestacoes', upload.array('anexos', 10), async (req, res) => {
  try {
    const data = req.body;
    
    // Generate a protocol if not provided
    if (!data.protocol) {
      data.protocol = `OUV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    }
    
    // Ensure default status is 'nova'
    if (!data.status) {
      data.status = 'nova';
    }

    // Set dates if not provided
    if (!data.dataRegistro) {
      const today = new Date();
      data.dataRegistro = today.toLocaleDateString('pt-BR');
      data.data = today.toLocaleDateString('pt-BR');
    }
    
    // tentouContato is a required string in schema, ensure it exists
    if (!data.tentouContato) data.tentouContato = 'nao';
    if (!data.respostaRecebida) data.respostaRecebida = '';

    const newManifestacao = await prisma.manifestacao.create({
      data: {
        protocol: data.protocol,
        tipo: data.tipo,
        status: data.status,
        nome: data.nome || null,
        whatsapp: data.whatsapp || null,
        email: data.email || null,
        unidade: data.unidade,
        data: data.data,
        dataRegistro: data.dataRegistro,
        descricao: data.descricao,
        tentouContato: data.tentouContato,
        respostaRecebida: data.respostaRecebida,
        resposta: data.resposta || null,
        dataResposta: data.dataResposta || null,
      }
    });

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const anexosData = req.files.map((file) => ({
        nomeOriginal: file.originalname,
        nomeArquivo: file.filename,
        caminho: `/api/downloads/${file.filename}`, // the frontend relies on id now, so this is just metadata
        tamanho: file.size,
        manifestacaoId: newManifestacao.id,
        origem: 'cidadao'
      }));

      await prisma.anexo.createMany({
        data: anexosData
      });
    }

    const manifestacaoCompleta = await prisma.manifestacao.findUnique({
      where: { id: newManifestacao.id },
      include: { anexos: true }
    });
    
    res.status(201).json(manifestacaoCompleta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar manifestação' });
  }
});

// Update manifestacao (Protected)
app.put('/api/manifestacoes/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { id: _id, anexos, ...updateData } = req.body;
    
    const updated = await prisma.manifestacao.update({
      where: { id },
      data: updateData
    });
    
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar manifestação' });
  }
});

// Admin upload anexos
app.post('/api/manifestacoes/:id/anexos', requireAuth, upload.array('anexos', 10), async (req, res) => {
  try {
    const { id } = req.params;
    
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const anexosData = req.files.map((file) => ({
        nomeOriginal: file.originalname,
        nomeArquivo: file.filename,
        caminho: `/api/downloads/${file.filename}`,
        tamanho: file.size,
        manifestacaoId: id,
        origem: 'admin'
      }));

      await prisma.anexo.createMany({
        data: anexosData
      });
    }

    const manifestacaoCompleta = await prisma.manifestacao.findUnique({
      where: { id },
      include: { anexos: true }
    });
    
    res.json(manifestacaoCompleta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao salvar anexos do administrador' });
  }
});

// Unidades CRUD
app.get('/api/unidades', async (req, res) => {
  try {
    const unidades = await prisma.unidade.findMany({ orderBy: { nome: 'asc' } });
    res.json(unidades);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar unidades' });
  }
});

app.post('/api/unidades', requireAuth, async (req, res) => {
  try {
    const { nome, status } = req.body;
    const unidade = await prisma.unidade.create({ data: { nome, status: status || 'ativo' } });
    res.status(201).json(unidade);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar unidade' });
  }
});

app.put('/api/unidades/:id', requireAuth, async (req, res) => {
  try {
    const { nome, status } = req.body;
    const unidade = await prisma.unidade.update({
      where: { id: req.params.id },
      data: { nome, status }
    });
    res.json(unidade);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar unidade' });
  }
});

app.delete('/api/unidades/:id', requireAuth, async (req, res) => {
  try {
    await prisma.unidade.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir unidade' });
  }
});

// Usuarios CRUD (Protected)
app.get('/api/usuarios', requireAuth, async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: { id: true, nome: true, login: true },
      orderBy: { nome: 'asc' }
    });
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

app.post('/api/usuarios', requireAuth, async (req, res) => {
  try {
    const { nome, login, senha } = req.body;
    const hash = await bcrypt.hash(senha, 10);
    const usuario = await prisma.usuario.create({
      data: { nome, login, senha: hash }
    });
    res.status(201).json({ id: usuario.id, nome: usuario.nome, login: usuario.login });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

app.delete('/api/usuarios/:id', requireAuth, async (req, res) => {
  try {
    await prisma.usuario.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
});

// Secure Download Endpoint
app.get('/api/downloads/:id', async (req, res) => {
  try {
    const anexo = await prisma.anexo.findUnique({
      where: { id: req.params.id }
    });
    
    if (!anexo) {
      return res.status(404).json({ error: 'Anexo não encontrado' });
    }

    const filePath = path.join(uploadsDir, anexo.nomeArquivo);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Arquivo físico não encontrado no servidor' });
    }

    // Previne execução no navegador (XSS) forçando como anexo (attachment) 
    // ou servindo com o content-type octet-stream para que o browser baixe o arquivo em vez de abri-lo como script
    res.download(filePath, anexo.nomeOriginal, {
      headers: {
        'X-Content-Type-Options': 'nosniff'
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao baixar o anexo' });
  }
});

// Seed Initial Admin and Units if DB is empty
async function seed() {
  try {
    const countUsers = await prisma.usuario.count();
    if (countUsers === 0) {
      console.log('Seeding initial admin user...');
      const hash = await bcrypt.hash('ouvidoria2024', 10);
      await prisma.usuario.create({
        data: { nome: 'Administrador Padrão', login: 'admin', senha: hash }
      });
    }

    const countUnits = await prisma.unidade.count();
    if (countUnits === 0) {
      console.log('Seeding initial units...');
      const defaultUnits = ["UBS Centro", "UBS Bairro Novo", "Hospital Municipal", "Secretaria de Saúde", "Vigilância Sanitária"];
      for (const u of defaultUnits) {
        await prisma.unidade.create({ data: { nome: u, status: 'ativo' } });
      }
    }
  } catch (err) {
    console.error('Seed error:', err);
  }
}

seed().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
