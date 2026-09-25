import logoImg from "@/imports/logo.png";

export { logoImg };

export type CategoryId = "denuncia" | "reclamacao" | "elogio" | "sugestao" | "solicitacao" | "consulta" | null;

export interface CategoryConfig {
  id: CategoryId;
  label: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
  badgeBg: string;
  description: string;
  placeholder: string;
}

export const CATEGORIES: CategoryConfig[] = [
  {
    id: "denuncia",
    label: "Denúncia",
    icon: "⚠",
    color: "text-[#b51a1a]",
    bg: "bg-[#fff5f5]",
    border: "border-[#f5c0c0]",
    badgeBg: "bg-[#fde8e8] text-[#b51a1a]",
    description: "Relate irregularidades, ilegalidades ou violações de direitos nos serviços de saúde.",
    placeholder: "Descreva detalhadamente a situação irregular que você deseja denunciar. Informe local, data, pessoas envolvidas e qualquer evidência que possua...",
  },
  {
    id: "reclamacao",
    label: "Reclamação",
    icon: "✕",
    color: "text-[#b55d0a]",
    bg: "bg-[#fff8f2]",
    border: "border-[#fad4b0]",
    badgeBg: "bg-[#feecd8] text-[#b55d0a]",
    description: "Manifeste sua insatisfação com atendimento, serviços ou condições de saúde.",
    placeholder: "Conte o que aconteceu. Informe a unidade de saúde, data do atendimento e o motivo da sua insatisfação...",
  },
  {
    id: "elogio",
    label: "Elogio",
    icon: "★",
    color: "text-[#1a7a4a]",
    bg: "bg-[#f2fff8]",
    border: "border-[#a8e0c4]",
    badgeBg: "bg-[#d8f5e8] text-[#1a7a4a]",
    description: "Reconheça profissionais, equipes ou serviços que se destacaram positivamente.",
    placeholder: "Compartilhe sua experiência positiva. Mencione os profissionais ou equipes que merecem ser reconhecidos...",
  },
  {
    id: "sugestao",
    label: "Sugestão",
    icon: "◎",
    color: "text-[#1456a0]",
    bg: "bg-[#f2f6ff]",
    border: "border-[#aec4f0]",
    badgeBg: "bg-[#dce9fc] text-[#1456a0]",
    description: "Contribua com ideias para melhorar os serviços e políticas de saúde pública.",
    placeholder: "Descreva sua sugestão. Seja específico sobre o que pode ser melhorado e como isso beneficiaria os usuários dos serviços de saúde...",
  },
  {
    id: "solicitacao",
    label: "Solicitação",
    icon: "→",
    color: "text-[#5a1a8f]",
    bg: "bg-[#faf2ff]",
    border: "border-[#d4b0f0]",
    badgeBg: "bg-[#eedcfc] text-[#5a1a8f]",
    description: "Solicite informações, serviços, documentos ou providências relacionados à saúde pública.",
    placeholder: "Descreva o que você está solicitando. Seja específico sobre o serviço, documento ou providência que necessita...",
  },
];

export const UNIDADES = [
  { group: "Unidades Básicas de Saúde", items: ["UBS Centro", "UBS São Francisco", "UBS Novo Horizonte", "UBS Jardim das Flores", "UBS Vila Nova"] },
  { group: "Urgência e Emergência", items: ["UPA 24h", "Pronto Atendimento Municipal"] },
  { group: "Hospitais", items: ["Hospital Municipal Dr. Hélio Rodrigues"] },
  { group: "Atenção Especializada", items: ["CAPS — Centro de Atenção Psicossocial", "CEO — Centro de Especialidades Odontológicas", "Policlínica Municipal"] },
  { group: "Departamentos / Setores", items: ["Departamento de Vigilância Sanitária", "Departamento de Vigilância Epidemiológica", "Farmácia Municipal", "Central de Regulação", "Secretaria Municipal de Saúde — Sede"] },
];

export const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  nova:       { label: "Nova",        cls: "bg-[#dce9fc] text-[#1456a0]" },
  analise:    { label: "Em análise",  cls: "bg-[#feecd8] text-[#b55d0a]" },
  respondida: { label: "Respondida",  cls: "bg-[#d8f5e8] text-[#1a7a4a]" },
  encerrada:  { label: "Encerrada",   cls: "bg-[#e8e8e8] text-[#5a6480]" },
  prazo:      { label: "Prazo vencendo", cls: "bg-[#fde8e8] text-[#b51a1a]" },
};

export interface Manifestacao {
  id: string;
  protocol: string;
  tipo: CategoryId;
  status: keyof typeof STATUS_CONFIG;
  nome: string | null;
  whatsapp: string | null;
  email: string | null;
  unidade: string;
  data: string;
  dataRegistro: string;
  descricao: string;
  tentouContato: string;
  respostaRecebida: string;
  resposta?: string;
  dataResposta?: string;
  anexos?: { id: string; nomeOriginal: string; caminho: string; tamanho: number, origem: string }[];
}

export const MOCK_DATA: Manifestacao[] = [
  { id: "1", protocol: "OUV-2024-883421", tipo: "reclamacao", status: "analise", nome: "Maria Silva Santos", whatsapp: "(91) 98765-4321", email: "maria.santos@email.com", unidade: "UPA 24h", data: "05/09/2024", dataRegistro: "06/09/2024", descricao: "Aguardei mais de 6 horas na UPA sem receber atendimento. Os profissionais não informavam sobre a espera e o ambiente estava em más condições de limpeza.", tentouContato: "sim", respostaRecebida: "Fui informada que era necessário aguardar pois havia muitos pacientes.", resposta: "", dataResposta: "" },
  { id: "2", protocol: "OUV-2024-741203", tipo: "denuncia", status: "respondida", nome: null, whatsapp: null, email: null, unidade: "UBS Centro", data: "28/08/2024", dataRegistro: "29/08/2024", descricao: "Medicamentos essenciais estão em falta há mais de 30 dias na farmácia da UBS. Pacientes com doenças crônicas estão sem acesso aos remédios que necessitam.", tentouContato: "nao", respostaRecebida: "", resposta: "Verificamos a situação junto à farmácia municipal. O abastecimento foi realizado em 10/09/2024 e os medicamentos já estão disponíveis. Pedimos desculpas pelo transtorno causado.", dataResposta: "12/09/2024" },
  { id: "3", protocol: "OUV-2024-612905", tipo: "sugestao", status: "analise", nome: "João Carlos Oliveira", whatsapp: "(91) 99123-4567", email: "joao.oliveira@gmail.com", unidade: "CAPS — Centro de Atenção Psicossocial", data: "15/08/2024", dataRegistro: "16/08/2024", descricao: "Sugiro a criação de um grupo de apoio semanal para familiares de usuários do CAPS. Muitos familiares relatam dificuldades em lidar com a situação e precisam de suporte emocional.", tentouContato: "nao_aplica", respostaRecebida: "", resposta: "", dataResposta: "" },
  { id: "4", protocol: "OUV-2024-559012", tipo: "elogio", status: "encerrada", nome: "Ana Paula Ferreira", whatsapp: "(91) 98888-1234", email: null, unidade: "Hospital Municipal Dr. Hélio Rodrigues", data: "10/08/2024", dataRegistro: "10/08/2024", descricao: "Quero elogiar a equipe de enfermagem do plantão noturno do dia 09/08. Fui tratada com muito carinho e profissionalismo durante toda a minha internação. Destaque especial para a enfermeira Cláudia.", tentouContato: "nao_aplica", respostaRecebida: "", resposta: "Obrigado pelo seu elogio! Transmitiremos o reconhecimento à equipe de enfermagem. Seu feedback é muito importante para nos motivarmos a continuar melhorando.", dataResposta: "15/08/2024" },
  { id: "5", protocol: "OUV-2024-990871", tipo: "solicitacao", status: "nova", nome: "Roberto Mendes Costa", whatsapp: "(91) 97654-3210", email: "roberto.costa@hotmail.com", unidade: "Farmácia Municipal", data: "11/09/2024", dataRegistro: "11/09/2024", descricao: "Solicito informações sobre o processo de cadastro para retirada de medicamentos de uso contínuo. Preciso saber quais documentos são necessários e os horários de atendimento.", tentouContato: "nao", respostaRecebida: "", resposta: "", dataResposta: "" },
  { id: "6", protocol: "OUV-2024-334521", tipo: "denuncia", status: "prazo", nome: "Francisca Lima", whatsapp: "(91) 96543-2100", email: "francisca.lima@yahoo.com", unidade: "UBS São Francisco", data: "22/08/2024", dataRegistro: "22/08/2024", descricao: "Denuncio a venda irregular de fichas de consulta na frente da UBS. Pessoas estão comercializando vagas nas filas de madrugada por valores entre R$20 e R$50.", tentouContato: "sim", respostaRecebida: "O responsável disse que não era da alçada da unidade resolver o problema.", resposta: "", dataResposta: "" },
];

export function inputCls() {
  return "w-full px-3.5 py-2.5 rounded-lg border border-[#d2d8ec] text-sm focus:outline-none focus:border-[#182257] focus:ring-2 focus:ring-[#182257]/10 transition-all bg-white text-[#111827]";
}

export function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold text-[#5a6480] uppercase tracking-wider mb-1.5">
      {label} {required && <span className="text-[#b51a1a]">*</span>}
    </label>
  );
}

export function SectionCard({ step, title, children }: { step: number | string; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-[#d2d8ec] p-6">
      <h3 className="font-semibold text-[#111827] mb-5 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
        <span className="w-6 h-6 rounded-full bg-[#182257] text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
          {step}
        </span>
        {title}
      </h3>
      {children}
    </div>
  );
}

export function RadioGroup({ options, value, onChange }: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-2 cursor-pointer group" onClick={() => onChange(opt.value)}>
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${value === opt.value ? "border-[#182257] bg-[#182257]" : "border-[#c0ccd4] group-hover:border-[#182257]/50"}`}>
            {value === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
          </div>
          <span className={`text-sm transition-colors ${value === opt.value ? "text-[#182257] font-medium" : "text-[#111827]"}`}>
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  );
}

export function BackButton({ onClick, label = "Voltar ao início" }: { onClick: () => void; label?: string }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 text-[#182257] hover:text-[#243480] text-sm font-medium mb-6 transition-colors cursor-pointer">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
      </svg>
      {label}
    </button>
  );
}
