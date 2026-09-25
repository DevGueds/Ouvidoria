import { useState, useRef, useEffect } from "react";
import {
  logoImg, CATEGORIES, CategoryConfig, CategoryId,
  inputCls, FieldLabel, SectionCard, RadioGroup, BackButton, STATUS_CONFIG
} from "./shared";

function Header({ onHome }: { onHome: () => void }) {
  return (
    <header className="bg-[#182257] text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-5 py-3 border-b border-white/10">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={onHome}>
            <img src={logoImg} alt="Prefeitura de Capanema" className="h-12 object-contain" />
            <div className="border-l border-white/20 pl-4">
              <div className="text-[10px] uppercase tracking-widest font-semibold text-[#e8b820]" style={{ fontFamily: "var(--font-display)" }}>
                Secretaria Municipal de Saúde
              </div>
              <div className="text-base font-bold leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                Ouvidoria em Saúde
              </div>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2 text-white/60 text-xs">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            0800 123 4567
          </div>
        </div>
        <nav className="flex gap-0 text-sm">
          {[{ label: "Início", active: true }, { label: "Sobre a Ouvidoria" }].map((item) => (
            <button key={item.label} className={`px-4 py-3 transition-all border-b-2 text-sm font-medium cursor-pointer ${item.active ? "border-[#e8b820] text-white" : "border-transparent text-white/60 hover:text-white/90 hover:border-white/30"}`} style={{ fontFamily: "var(--font-display)" }}>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero({ onSelect }: { onSelect: (id: CategoryId) => void }) {
  return (
    <div className="bg-gradient-to-br from-[#111840] via-[#182257] to-[#1e2d6e] text-white py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-[#e8b820]/15 border border-[#e8b820]/30 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 text-[#f0cc50]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8b820] animate-pulse" />
            Serviço 24h disponível
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Fale com a Ouvidoria
            <br />
            <span className="text-[#e8b820]">da Saúde</span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-8">
            Sua voz é fundamental para melhorar os serviços de saúde pública de Capanema.
            Registre sua manifestação com anonimato garantido e acompanhe o andamento.
          </p>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button key={cat.id} onClick={() => onSelect(cat.id)} className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#e8b820]/60 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105 cursor-pointer" style={{ fontFamily: "var(--font-display)" }}>
                {cat.label}
              </button>
            ))}
            <button onClick={() => onSelect("consulta")} className="bg-[#c89a10] hover:bg-[#e8b820] text-[#111827] px-5 py-2.5 rounded-lg text-sm font-bold transition-all hover:scale-105 cursor-pointer shadow-md" style={{ fontFamily: "var(--font-display)" }}>
              Consultar Manifestação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryCards({ onSelect }: { onSelect: (id: CategoryId) => void }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-xl font-bold text-[#111827] mb-2" style={{ fontFamily: "var(--font-display)" }}>
        Como podemos ajudar?
      </h2>
      <p className="text-[#5a6480] mb-8 text-sm">Selecione o tipo de manifestação que deseja registrar ou consulte uma existente.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {CATEGORIES.map((cat) => (
          <button key={cat.id} onClick={() => onSelect(cat.id)} className={`group text-left p-5 rounded-xl border-2 ${cat.bg} ${cat.border} hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer`}>
            <div className={`text-2xl mb-3 ${cat.color}`}>{cat.icon}</div>
            <h3 className={`font-bold text-sm mb-1 ${cat.color}`} style={{ fontFamily: "var(--font-display)" }}>{cat.label}</h3>
            <p className="text-[#5a6480] text-xs leading-relaxed">{cat.description}</p>
            <div className={`mt-4 text-xs font-semibold ${cat.color} flex items-center gap-1 group-hover:gap-2 transition-all`}>
              Registrar
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" /></svg>
            </div>
          </button>
        ))}
      </div>
      <button onClick={() => onSelect("consulta")} className="w-full flex items-center gap-4 p-5 rounded-xl border-2 border-[#d2d8ec] bg-white hover:border-[#182257] hover:shadow-md transition-all cursor-pointer group">
        <div className="w-12 h-12 rounded-lg bg-[#eef0f8] flex items-center justify-center flex-shrink-0 group-hover:bg-[#dce2f4] transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#182257">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </div>
        <div className="text-left flex-1">
          <h3 className="font-bold text-[#182257] text-base" style={{ fontFamily: "var(--font-display)" }}>Consultar Manifestação</h3>
          <p className="text-[#5a6480] text-xs mt-0.5">Acompanhe o andamento do seu protocolo com o número de registro.</p>
        </div>
        <svg className="text-[#182257] opacity-50 group-hover:opacity-100 transition-opacity" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>
      </button>
    </section>
  );
}

function InfoBanner() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />, title: "Sigilo Garantido", text: "Suas informações são protegidas por lei. Você pode registrar anonimamente." },
          { icon: <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />, title: "Prazo de Resposta", text: "Manifestações são respondidas em até 20 dias úteis conforme legislação." },
          { icon: <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />, title: "Número de Protocolo", text: "Você receberá um número de protocolo para acompanhar sua manifestação." },
        ].map((item) => (
          <div key={item.title} className="bg-white rounded-xl border border-[#d2d8ec] p-5 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-lg bg-[#eef0f8] flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#182257">{item.icon}</svg>
            </div>
            <div>
              <h4 className="font-semibold text-[#111827] text-sm mb-1" style={{ fontFamily: "var(--font-display)" }}>{item.title}</h4>
              <p className="text-[#5a6480] text-xs leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FormPage({ category, onBack, onSuccess }: { category: CategoryConfig; onBack: () => void; onSuccess: (protocol: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ identificado: "", nome: "", whatsapp: "", email: "", unidade: "", data: "", descricao: "", tentouContato: "", respostaRecebida: "", aceite: false });
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [unidades, setUnidades] = useState<{ id: string; nome: string; status: string }[]>([]);

  useEffect(() => {
    fetch('/api/unidades').then(r => r.json()).then(data => setUnidades(data.filter((u: any) => u.status === 'ativo')));
  }, []);

  const set = (field: string, value: string | boolean) => setForm((f) => ({ ...f, [field]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    try {
      const formData = new FormData();
      formData.append("tipo", category.id);
      formData.append("nome", form.nome);
      formData.append("whatsapp", form.whatsapp);
      formData.append("email", form.email);
      formData.append("unidade", form.unidade);
      formData.append("data", form.data);
      formData.append("descricao", form.descricao);
      formData.append("tentouContato", form.tentouContato);
      formData.append("respostaRecebida", form.respostaRecebida);

      arquivos.forEach((file) => {
        formData.append("anexos", file);
      });

      const res = await fetch('/api/manifestacoes', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        onSuccess(data.protocol);
      } else {
        alert("Erro ao enviar manifestação.");
        setSubmitted(false);
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão ao enviar manifestação.");
      setSubmitted(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <BackButton onClick={onBack} />
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${category.bg} ${category.color}`}>
        <span>{category.icon}</span>{category.label}
      </div>
      <h1 className="text-2xl font-bold text-[#111827] mb-1" style={{ fontFamily: "var(--font-display)" }}>Registrar {category.label}</h1>
      <p className="text-[#5a6480] text-sm mb-8">{category.description}</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <SectionCard step={1} title="Identificação do Manifestante">
          <p className="text-xs text-[#5a6480] mb-4 leading-relaxed">Você pode se identificar ou permanecer anônimo. Suas informações serão tratadas com sigilo.</p>
          <FieldLabel label="Deseja se identificar?" required />
          <RadioGroup value={form.identificado} onChange={(v) => set("identificado", v)} options={[{ value: "sim", label: "Sim, quero me identificar" }, { value: "nao", label: "Não, prefiro permanecer anônimo" }]} />
          {form.identificado === "sim" && (
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <FieldLabel label="Nome Completo" required />
                <input type="text" required value={form.nome} onChange={(e) => set("nome", e.target.value)} placeholder="Seu nome completo" className={inputCls()} />
              </div>
              <div>
                <FieldLabel label="WhatsApp para Contato" />
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5a6480]">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                  </span>
                  <input type="tel" value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="(91) 99999-9999" className={`${inputCls()} pl-10`} />
                </div>
              </div>
              <div>
                <FieldLabel label="E-mail" />
                <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="seu@email.com" className={inputCls()} />
              </div>
            </div>
          )}
          {form.identificado === "nao" && (
            <div className="mt-4 flex items-start gap-2 bg-[#eef0f8] rounded-lg px-4 py-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#182257" className="flex-shrink-0 mt-0.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
              <p className="text-xs text-[#5a6480] leading-relaxed">Sua manifestação será registrada anonimamente. Guarde o número de protocolo para acompanhar o andamento.</p>
            </div>
          )}
        </SectionCard>

        <SectionCard step={2} title="Sobre a Manifestação">
          <div className="space-y-4">
            <div>
              <FieldLabel label="Unidade de Saúde, Serviço, Departamento ou Setor" required />
              <select required value={form.unidade} onChange={(e) => set("unidade", e.target.value)} className={inputCls()}>
                <option value="">Selecione a unidade, serviço ou setor relacionado</option>
                {unidades.map(u => (
                  <option key={u.id} value={u.nome}>{u.nome}</option>
                ))}
                <option value="outro">Outro / Não sei informar</option>
              </select>
            </div>
            <div>
              <FieldLabel label="Data em que o fato ocorreu" />
              <input type="date" value={form.data} onChange={(e) => set("data", e.target.value)} max={new Date().toISOString().split("T")[0]} className={inputCls()} />
            </div>
            <div>
              <FieldLabel label="Descrição da Manifestação" required />
              <textarea required rows={6} value={form.descricao} onChange={(e) => set("descricao", e.target.value)} placeholder={category.placeholder} className={`${inputCls()} resize-none leading-relaxed`} />
              <p className="text-xs text-[#5a6480] mt-1.5 text-right">{form.descricao.length}/2000 caracteres</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard step={3} title="Tentativa de Resolução Prévia">
          <div className="space-y-4">
            <div>
              <FieldLabel label="Você já tentou procurar a unidade ou setor responsável para resolver esta situação?" required />
              <RadioGroup value={form.tentouContato} onChange={(v) => { set("tentouContato", v); if (v !== "sim") set("respostaRecebida", ""); }} options={[{ value: "sim", label: "Sim" }, { value: "nao", label: "Não" }, { value: "nao_aplica", label: "Não se aplica" }]} />
            </div>
            {form.tentouContato === "sim" && (
              <div>
                <FieldLabel label="Qual resposta ou retorno você recebeu?" />
                <textarea rows={3} value={form.respostaRecebida} onChange={(e) => set("respostaRecebida", e.target.value)} placeholder="Descreva o que foi dito ou a resposta que recebeu ao tentar resolver a situação diretamente..." className={`${inputCls()} resize-none leading-relaxed`} />
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard step={4} title="Documentos Anexos (opcional)">
          <p className="text-xs text-[#5a6480] mb-4 leading-relaxed">Você pode anexar fotos, documentos ou outros arquivos que ajudem a esclarecer sua manifestação. Formatos aceitos: PDF, JPG, PNG, DOCX. Tamanho máximo: 10 MB por arquivo.</p>
          <input ref={fileRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.docx,.doc" onChange={(e) => { if (e.target.files) setArquivos(Array.from(e.target.files)); }} className="hidden" />
          <button type="button" onClick={() => fileRef.current?.click()} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-[#c0ccd4] hover:border-[#182257] hover:bg-[#eef0f8] text-sm text-[#5a6480] hover:text-[#182257] transition-all cursor-pointer font-medium">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11z" /></svg>
            Selecionar Arquivos
          </button>
          {arquivos.length > 0 && (
            <div className="mt-3 space-y-2">
              {arquivos.map((file, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#f2f4fb] rounded-lg px-3 py-2.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#182257"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
                  <span className="text-xs text-[#111827] flex-1 truncate">{file.name}</span>
                  <span className="text-xs text-[#5a6480]">{(file.size / 1024).toFixed(0)} KB</span>
                  <button type="button" onClick={() => setArquivos((p) => p.filter((_, idx) => idx !== i))} className="text-[#5a6480] hover:text-[#b51a1a] transition-colors cursor-pointer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        <div className="bg-[#f2f4fb] rounded-xl border border-[#d2d8ec] p-5">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" required checked={form.aceite} onChange={(e) => set("aceite", e.target.checked)} className="w-4 h-4 mt-0.5 accent-[#182257]" />
            <span className="text-xs text-[#5a6480] leading-relaxed">
              Declaro que as informações prestadas são verdadeiras e autorizo o uso dos meus dados para análise desta manifestação, conforme a <span className="text-[#182257] underline cursor-pointer">Lei de Acesso à Informação (Lei nº 12.527/2011)</span> e a <span className="text-[#182257] underline cursor-pointer">LGPD (Lei nº 13.709/2018)</span>.
            </span>
          </label>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={onBack} className="flex-1 sm:flex-none px-6 py-3 rounded-lg border-2 border-[#d2d8ec] text-[#5a6480] text-sm font-semibold hover:border-[#182257] hover:text-[#182257] transition-all cursor-pointer">Cancelar</button>
          <button type="submit" disabled={submitted || !form.identificado || !form.tentouContato} className="flex-1 bg-[#182257] hover:bg-[#1e2d6e] text-white px-8 py-3 rounded-lg text-sm font-bold transition-all hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" style={{ fontFamily: "var(--font-display)" }}>
            {submitted ? "Enviando..." : "Enviar Manifestação"}
          </button>
        </div>
      </form>
    </div>
  );
}

function SuccessPage({ protocol, category, onHome, onConsulta }: { protocol: string; category: string; onHome: () => void; onConsulta: () => void }) {
  return (
    <div className="max-w-xl mx-auto px-6 py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-[#d8f5e8] flex items-center justify-center mx-auto mb-6">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="#1a7a4a"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
      </div>
      <h1 className="text-2xl font-bold text-[#111827] mb-3" style={{ fontFamily: "var(--font-display)" }}>Manifestação Registrada!</h1>
      <p className="text-[#5a6480] mb-8 leading-relaxed">Sua {category.toLowerCase()} foi registrada com sucesso. Guarde o número de protocolo abaixo para acompanhar o andamento.</p>
      <div className="bg-[#eef0f8] border-2 border-dashed border-[#182257]/20 rounded-xl p-6 mb-8">
        <p className="text-xs font-semibold text-[#5a6480] uppercase tracking-wider mb-2">Número de Protocolo</p>
        <p className="text-3xl font-bold text-[#182257] font-mono tracking-wider">{protocol}</p>
        <p className="text-xs text-[#5a6480] mt-2">Registrado em {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button onClick={onHome} className="px-6 py-3 rounded-lg border-2 border-[#d2d8ec] text-[#5a6480] text-sm font-semibold hover:border-[#182257] hover:text-[#182257] transition-all cursor-pointer">Voltar ao Início</button>
        <button onClick={onConsulta} className="bg-[#182257] hover:bg-[#1e2d6e] text-white px-6 py-3 rounded-lg text-sm font-bold transition-all cursor-pointer" style={{ fontFamily: "var(--font-display)" }}>Consultar esta Manifestação</button>
      </div>
    </div>
  );
}



function ConsultaPage({ onBack }: { onBack: () => void }) {
  const [protocol, setProtocol] = useState("");
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearched(true);
    setResult(null);
    try {
      const res = await fetch('/api/manifestacoes/protocol/' + protocol.trim());
      if (res.ok) {
        const data = await res.json();
        const st = STATUS_CONFIG[data.status] || { label: data.status, cls: "bg-[#eef0f8] text-[#182257]" };
        const cat = CATEGORIES.find(c => c.id === data.tipo);
        
        setResult({
          protocol: data.protocol,
          type: cat ? cat.label : data.tipo,
          status: st.label,
          date: data.dataRegistro,
          unit: data.unidade,
          statusColor: st.cls,
          descricao: data.descricao,
          resposta: data.resposta,
          dataResposta: data.dataResposta,
          anexos: data.anexos
        } as any);
      } else {
        alert("A API retornou erro: " + res.status);
      }
    } catch (err: any) {
      console.error(err);
      alert("Erro na consulta: " + err.message);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <BackButton onClick={onBack} />
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-[#eef0f8] text-[#182257]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
        Consultar Manifestação
      </div>
      <h1 className="text-2xl font-bold text-[#111827] mb-1" style={{ fontFamily: "var(--font-display)" }}>Acompanhar Manifestação</h1>
      <p className="text-[#5a6480] text-sm mb-8">Digite o número de protocolo recebido no momento do registro para consultar o status.</p>

      <form onSubmit={handleSearch} className="bg-white rounded-xl border border-[#d2d8ec] p-6 mb-6">
        <FieldLabel label="Número de Protocolo" />
        <div className="flex gap-3">
          <input type="text" value={protocol} onChange={(e) => setProtocol(e.target.value)} placeholder="Ex: OUV-2024-883421" className={`${inputCls()} flex-1 font-mono`} />
          <button type="submit" className="bg-[#182257] hover:bg-[#1e2d6e] text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer whitespace-nowrap" style={{ fontFamily: "var(--font-display)" }}>Consultar</button>
        </div>
        <p className="text-xs text-[#5a6480] mt-2">Digite o protocolo gerado ao enviar sua manifestação.</p>
      </form>

      {searched && result && (
        <div className="bg-white rounded-xl border-2 border-[#182257]/20 overflow-hidden">
          <div className="bg-[#182257] text-white px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-white/60 font-medium uppercase tracking-wider mb-1">Protocolo</p>
              <p className="font-mono font-bold text-lg tracking-wider">{result.protocol}</p>
            </div>
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${result.statusColor}`}>{result.status}</span>
          </div>
          
          <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-5 border-b border-[#d2d8ec]">
            {[{ label: "Tipo", value: result.type }, { label: "Data de Registro", value: result.date }, { label: "Unidade", value: result.unit }].map((item) => (
              <div key={item.label}>
                <p className="text-xs font-semibold text-[#5a6480] uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-sm font-medium text-[#111827]">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="p-6 border-b border-[#d2d8ec]">
            <p className="text-xs font-semibold text-[#5a6480] uppercase tracking-wider mb-2">Mensagem Original</p>
            <p className="text-sm text-[#111827] leading-relaxed">{result.descricao}</p>
            {result.anexos && result.anexos.some((a: any) => a.origem !== 'admin') && (
              <div className="mt-4">
                <p className="text-xs font-semibold text-[#5a6480] uppercase tracking-wider mb-2">Anexos (Enviados por você)</p>
                <div className="flex flex-col gap-2">
                  {result.anexos.filter((a: any) => a.origem !== 'admin').map((anexo: any) => (
                    <a key={anexo.id} href={`/api/downloads/${anexo.id}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-[#f2f4fb] rounded-lg px-3 py-2.5 hover:bg-[#eef0f8] transition-colors w-fit">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#182257"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
                      <span className="text-xs text-[#182257] font-medium underline">{anexo.nomeOriginal}</span>
                      <span className="text-xs text-[#5a6480]">({(anexo.tamanho / 1024).toFixed(0)} KB)</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {result.resposta && (
            <div className="p-6 bg-[#f2fff8] border-b border-[#a8e0c4]">
              <div className="flex items-center gap-2 mb-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1a7a4a"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                <p className="text-xs font-bold text-[#1a7a4a] uppercase tracking-wider">Resposta da Ouvidoria</p>
                <span className="text-xs text-[#1a7a4a]/60 ml-auto">{result.dataResposta}</span>
              </div>
              <p className="text-sm text-[#111827] leading-relaxed mb-4">{result.resposta}</p>
              
              {result.anexos && result.anexos.some((a: any) => a.origem === 'admin') && (
                <div className="mt-4 pt-4 border-t border-[#a8e0c4]">
                  <p className="text-xs font-semibold text-[#1a7a4a]/80 uppercase tracking-wider mb-2">Documentos da Ouvidoria</p>
                  <div className="flex flex-col gap-2">
                    {result.anexos.filter((a: any) => a.origem === 'admin').map((anexo: any) => (
                      <a key={anexo.id} href={`/api/downloads/${anexo.id}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-white/60 border border-[#a8e0c4] rounded-lg px-3 py-2.5 hover:bg-white transition-colors w-fit shadow-sm">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#1a7a4a"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
                        <span className="text-xs text-[#1a7a4a] font-bold underline">{anexo.nomeOriginal}</span>
                        <span className="text-xs text-[#1a7a4a]/80">({(anexo.tamanho / 1024).toFixed(0)} KB)</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="px-6 py-6">
            <p className="text-xs font-semibold text-[#5a6480] uppercase tracking-wider mb-3">Andamento</p>
            <div className="flex items-center">
              {["Recebida", "Em análise", "Respondida"].map((step, i) => {
                let stepIndex = -1;
                if (result.status === "Nova" || result.status === "Prazo vencendo" || result.status === "Recebida") stepIndex = 0;
                if (result.status === "Em análise") stepIndex = 1;
                if (result.status === "Respondida" || result.status === "Encerrada") stepIndex = 2;

                const done = i <= stepIndex;
                return (
                  <div key={step} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${done ? "bg-[#182257] border-[#182257] text-white" : "border-[#d2d8ec] text-[#d2d8ec]"}`}>{done ? "✓" : i + 1}</div>
                      <p className={`text-xs mt-1.5 font-medium whitespace-nowrap ${done ? "text-[#182257]" : "text-[#c0ccd4]"}`}>{step}</p>
                    </div>
                    {i < 2 && <div className={`h-0.5 flex-1 mx-2 mb-4 ${i < stepIndex ? "bg-[#182257]" : "bg-[#d2d8ec]"}`} />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {searched && !result && (
        <div className="bg-white rounded-xl border border-[#d2d8ec] p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-[#fde8e8] flex items-center justify-center mx-auto mb-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#b51a1a"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
          </div>
          <h3 className="font-bold text-[#111827] mb-2" style={{ fontFamily: "var(--font-display)" }}>Protocolo não encontrado</h3>
          <p className="text-[#5a6480] text-sm">Não encontramos nenhuma manifestação com este número. Verifique o protocolo e tente novamente.</p>
        </div>
      )}


    </div>
  );
}

function Footer({ onAdmin }: { onAdmin: () => void }) {
  return (
    <footer className="bg-[#111840] text-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <img src={logoImg} alt="Prefeitura de Capanema" className="h-10 object-contain mb-3" />
            <p className="text-white/50 text-xs leading-relaxed">Canal oficial para manifestações dos cidadãos sobre os serviços de saúde pública do município de Capanema — PA.</p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3 text-[#e8b820]" style={{ fontFamily: "var(--font-display)" }}>Contato</h4>
            <div className="space-y-1.5 text-xs text-white/60">
              <p>0800 123 4567 (gratuito)</p>
              <p>ouvidoria.saude@capanema.pa.gov.br</p>
              <p>Seg–Sex, 8h–18h</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3 text-[#e8b820]" style={{ fontFamily: "var(--font-display)" }}>Links Úteis</h4>
            <div className="space-y-1.5 text-xs text-white/60">
              <p className="hover:text-white cursor-pointer transition-colors">Portal da Transparência</p>
              <p className="hover:text-white cursor-pointer transition-colors">Lei de Acesso à Informação</p>
              <a href="https://www.capanema.pa.gov.br/" target="_blank" rel="noreferrer" className="block hover:text-white cursor-pointer transition-colors">Prefeitura de Capanema</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© 2024 Secretaria Municipal de Saúde de Capanema — PA. Todos os direitos reservados.</p>
          <button onClick={onAdmin} className="text-white/20 hover:text-white/50 transition-colors cursor-pointer text-xs">Acesso Administrativo</button>
        </div>
      </div>
    </footer>
  );
}

type View = { page: "home" } | { page: "form"; category: CategoryConfig } | { page: "success"; protocol: string; category: string } | { page: "consulta" };

export default function PublicApp({ onAdmin }: { onAdmin: () => void }) {
  const [view, setView] = useState<View>({ page: "home" });

  function handleSelect(id: CategoryId) {
    if (id === "consulta") { setView({ page: "consulta" }); return; }
    const cat = CATEGORIES.find((c) => c.id === id)!;
    setView({ page: "form", category: cat });
  }

  return (
    <div className="min-h-full flex flex-col bg-[#f2f4fb]">
      <Header onHome={() => setView({ page: "home" })} />
      {view.page === "home" && (<><Hero onSelect={handleSelect} /><CategoryCards onSelect={handleSelect} /><InfoBanner /><div className="flex-1" /></>)}
      {view.page === "form" && (<FormPage category={view.category} onBack={() => setView({ page: "home" })} onSuccess={(protocol) => setView({ page: "success", protocol, category: view.category.label })} />)}
      {view.page === "success" && (<SuccessPage protocol={view.protocol} category={view.category} onHome={() => setView({ page: "home" })} onConsulta={() => setView({ page: "consulta" })} />)}
      {view.page === "consulta" && (<ConsultaPage onBack={() => setView({ page: "home" })} />)}
      <Footer onAdmin={onAdmin} />
    </div>
  );
}
