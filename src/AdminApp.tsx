import { useState, useEffect } from "react";
import { logoImg, CATEGORIES, MOCK_DATA, STATUS_CONFIG, Manifestacao } from "./shared";

function StatCard({ label, value, sub, accent, icon }: { label: string; value: string | number; sub?: string; accent: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-[#d2d8ec] p-5 flex items-start gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${accent}`}>{icon}</div>
      <div>
        <p className="text-2xl font-bold text-[#111827]" style={{ fontFamily: "var(--font-display)" }}>{value}</p>
        <p className="text-sm font-medium text-[#111827]">{label}</p>
        {sub && <p className="text-xs text-[#5a6480] mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function MiniBar({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-[#5a6480]">{label}</span>
        <span className="text-xs font-semibold text-[#111827]">{count}</span>
      </div>
      <div className="h-2 bg-[#eef0f8] rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Dashboard({ data, onViewAll }: { data: Manifestacao[]; onViewAll: () => void }) {
  const total = data.length;
  const novas = data.filter((d) => d.status === "nova").length;
  const analise = data.filter((d) => d.status === "analise").length;
  const respondidas = data.filter((d) => d.status === "respondida").length;
  const prazo = data.filter((d) => d.status === "prazo").length;

  const porTipo = CATEGORIES.map((c) => ({ label: c.label, count: data.filter((d) => d.tipo === c.id).length, color: c.color }));

  const recentes = [...data].sort((a, b) => b.dataRegistro.localeCompare(a.dataRegistro)).slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-[#111827] mb-1" style={{ fontFamily: "var(--font-display)" }}>Dashboard</h2>
        <p className="text-sm text-[#5a6480]">Visão geral das manifestações recebidas pela Ouvidoria.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total de Manifestações" value={total} sub="Todas as categorias" accent="bg-[#eef0f8]" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="#182257"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>} />
        <StatCard label="Novas" value={novas} sub="Aguardando análise" accent="bg-[#dce9fc]" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="#1456a0"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>} />
        <StatCard label="Em Análise" value={analise} sub="Em andamento" accent="bg-[#feecd8]" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="#b55d0a"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>} />
        <StatCard label="Prazo Vencendo" value={prazo} sub="Requer atenção urgente" accent="bg-[#fde8e8]" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="#b51a1a"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-[#d2d8ec] p-5">
          <h3 className="font-semibold text-[#111827] text-sm mb-4" style={{ fontFamily: "var(--font-display)" }}>Por Tipo de Manifestação</h3>
          <div className="space-y-3">
            {porTipo.map((t) => (
              <MiniBar key={t.label} label={t.label} count={t.count} total={total} color={
                t.label === "Denúncia" ? "bg-[#b51a1a]" :
                t.label === "Reclamação" ? "bg-[#b55d0a]" :
                t.label === "Elogio" ? "bg-[#1a7a4a]" :
                t.label === "Sugestão" ? "bg-[#1456a0]" : "bg-[#5a1a8f]"
              } />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#d2d8ec] p-5">
          <h3 className="font-semibold text-[#111827] text-sm mb-4" style={{ fontFamily: "var(--font-display)" }}>Por Status</h3>
          <div className="space-y-3">
            {[
              { key: "nova", color: "bg-[#1456a0]" },
              { key: "analise", color: "bg-[#b55d0a]" },
              { key: "respondida", color: "bg-[#1a7a4a]" },
              { key: "encerrada", color: "bg-[#5a6480]" },
              { key: "prazo", color: "bg-[#b51a1a]" },
            ].map((s) => (
              <MiniBar key={s.key} label={STATUS_CONFIG[s.key].label} count={data.filter((d) => d.status === s.key).length} total={total} color={s.color} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#d2d8ec] p-5">
          <h3 className="font-semibold text-[#111827] text-sm mb-4" style={{ fontFamily: "var(--font-display)" }}>Taxa de Resposta</h3>
          <div className="flex items-center justify-center py-4">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#eef0f8" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#182257" strokeWidth="3"
                  strokeDasharray={`${respondidas / total * 100} ${100 - respondidas / total * 100}`}
                  strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-[#182257]" style={{ fontFamily: "var(--font-display)" }}>{total > 0 ? Math.round(respondidas / total * 100) : 0}%</span>
                <span className="text-xs text-[#5a6480]">respondidas</span>
              </div>
            </div>
          </div>
          <div className="flex justify-around text-center mt-2">
            <div><p className="text-lg font-bold text-[#1a7a4a]">{respondidas}</p><p className="text-xs text-[#5a6480]">Respondidas</p></div>
            <div><p className="text-lg font-bold text-[#b55d0a]">{analise + novas}</p><p className="text-xs text-[#5a6480]">Pendentes</p></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#d2d8ec] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#d2d8ec] flex items-center justify-between">
          <h3 className="font-semibold text-[#111827] text-sm" style={{ fontFamily: "var(--font-display)" }}>Manifestações Recentes</h3>
          <button onClick={onViewAll} className="text-xs text-[#182257] font-medium hover:underline cursor-pointer">Ver todas</button>
        </div>
        <div className="divide-y divide-[#f2f4fb]">
          {recentes.map((m) => {
            const cat = CATEGORIES.find((c) => c.id === m.tipo);
            const st = STATUS_CONFIG[m.status];
            return (
              <div key={m.id} className="px-5 py-3.5 flex items-center gap-4 hover:bg-[#fafbfd] transition-colors">
                <span className={`text-sm w-4 text-center flex-shrink-0 ${cat?.color}`}>{cat?.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#182257]">{m.protocol}</span>
                    <span className="text-[#d2d8ec]">·</span>
                    <span className="text-xs text-[#5a6480] truncate">{m.unidade}</span>
                  </div>
                  <p className="text-xs text-[#5a6480] mt-0.5 truncate">{m.descricao}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 ${st.cls}`}>{st.label}</span>
                <span className="text-xs text-[#5a6480] whitespace-nowrap hidden sm:block">{m.dataRegistro}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ManifestacoesList({ data, onView }: { data: Manifestacao[]; onView: (m: Manifestacao) => void }) {
  const [search, setSearch] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filtered = data.filter((m) => {
    const q = search.toLowerCase();
    const matchSearch = !q || m.protocol.toLowerCase().includes(q) || m.descricao.toLowerCase().includes(q) || (m.nome || "").toLowerCase().includes(q) || m.unidade.toLowerCase().includes(q);
    const matchTipo = !filterTipo || m.tipo === filterTipo;
    const matchStatus = !filterStatus || m.status === filterStatus;
    return matchSearch && matchTipo && matchStatus;
  });

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-[#111827] mb-1" style={{ fontFamily: "var(--font-display)" }}>Manifestações</h2>
        <p className="text-sm text-[#5a6480]">{filtered.length} registro{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a6480]" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por protocolo, nome, unidade..." className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#d2d8ec] text-sm focus:outline-none focus:border-[#182257] focus:ring-2 focus:ring-[#182257]/10 transition-all bg-white" />
        </div>
        <select value={filterTipo} onChange={(e) => setFilterTipo(e.target.value)} className="px-3.5 py-2.5 rounded-lg border border-[#d2d8ec] text-sm focus:outline-none focus:border-[#182257] bg-white text-[#111827] cursor-pointer">
          <option value="">Todos os tipos</option>
          {CATEGORIES.map((c) => <option key={c.id} value={c.id!}>{c.label}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3.5 py-2.5 rounded-lg border border-[#d2d8ec] text-sm focus:outline-none focus:border-[#182257] bg-white text-[#111827] cursor-pointer">
          <option value="">Todos os status</option>
          {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-[#d2d8ec] overflow-hidden">
        <div className="divide-y divide-[#f2f4fb]">
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#d2d8ec" className="mx-auto mb-3"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
              <p className="text-[#5a6480] text-sm">Nenhuma manifestação encontrada.</p>
            </div>
          )}
          {filtered.map((m) => {
            const cat = CATEGORIES.find((c) => c.id === m.tipo);
            const st = STATUS_CONFIG[m.status];
            return (
              <button key={m.id} onClick={() => onView(m)} className="w-full px-5 py-4 flex items-start gap-4 hover:bg-[#fafbfd] transition-colors cursor-pointer text-left">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm ${cat?.bg} border ${cat?.border}`}>
                  <span className={cat?.color}>{cat?.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                    <span className="font-mono text-xs font-bold text-[#182257]">{m.protocol}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${st.cls}`}>{st.label}</span>
                    {m.status === "prazo" && (
                      <span className="flex items-center gap-1 text-xs text-[#b51a1a] font-medium">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                        Urgente
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#111827] truncate mb-1">{m.descricao}</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-[#5a6480]">
                    <span>{m.unidade}</span>
                    <span className="text-[#d2d8ec]">·</span>
                    <span>{m.nome ?? "Anônimo"}</span>
                    <span className="text-[#d2d8ec]">·</span>
                    <span>{m.dataRegistro}</span>
                  </div>
                </div>
                <svg className="text-[#d2d8ec] flex-shrink-0 mt-1" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ManifestacaoDetail({ m, onBack, onSave }: { m: Manifestacao; onBack: () => void; onSave: (updated: Manifestacao, files: File[]) => void }) {
  const [status, setStatus] = useState(m.status);
  const [resposta, setResposta] = useState(m.resposta || "");
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [saved, setSaved] = useState(false);
  const cat = CATEGORIES.find((c) => c.id === m.tipo);
  const st = STATUS_CONFIG[status];

  function handleSave() {
    const updated: Manifestacao = {
      ...m, 
      status,
      resposta,
      dataResposta: new Date().toLocaleDateString("pt-BR"),
    };
    onSave(updated, arquivos);
    setArquivos([]); // Limpa após salvar
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="flex items-center gap-2 text-[#182257] hover:text-[#1e2d6e] text-sm font-medium transition-colors cursor-pointer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          Voltar
        </button>
        <div className="flex-1" />
        <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${st.cls}`}>{st.label}</span>
      </div>

      <div className="bg-white rounded-xl border border-[#d2d8ec] overflow-hidden">
        <div className="bg-[#182257] text-white px-6 py-5">
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg ${cat?.bg}`}>
              <span className={cat?.color}>{cat?.icon}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <p className="font-mono font-bold text-lg tracking-wider">{m.protocol}</p>
              </div>
              <p className="text-white/60 text-xs">{cat?.label} · Registrada em {m.dataRegistro}</p>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-5 border-b border-[#f2f4fb]">
          {[
            { label: "Manifestante", value: m.nome ?? "Anônimo" },
            { label: "WhatsApp", value: m.whatsapp ?? "—" },
            { label: "E-mail", value: m.email ?? "—" },
            { label: "Unidade / Setor", value: m.unidade },
            { label: "Data do Fato", value: m.data || "—" },
            { label: "Tentou Contato", value: m.tentouContato === "sim" ? "Sim" : m.tentouContato === "nao" ? "Não" : "Não se aplica" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs font-semibold text-[#5a6480] uppercase tracking-wider mb-1">{item.label}</p>
              <p className="text-sm text-[#111827]">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="p-6 border-b border-[#f2f4fb]">
          <p className="text-xs font-semibold text-[#5a6480] uppercase tracking-wider mb-2">Descrição da Manifestação</p>
          <p className="text-sm text-[#111827] leading-relaxed whitespace-pre-wrap">{m.descricao}</p>
        </div>

        {m.tentouContato === "sim" && m.respostaRecebida && (
          <div className="p-6 border-b border-[#f2f4fb] bg-[#fafbfd]">
            <p className="text-xs font-semibold text-[#5a6480] uppercase tracking-wider mb-2">Resposta Recebida ao Tentar Contato</p>
            <p className="text-sm text-[#111827] leading-relaxed">{m.respostaRecebida}</p>
          </div>
        )}
      </div>

      {m.anexos && m.anexos.length > 0 && (
        <div className="bg-white rounded-xl border border-[#d2d8ec] p-6">
          <h3 className="font-semibold text-[#111827] mb-5 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#5a6480]"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
            Documentos Anexos
          </h3>
          <div className="flex flex-col gap-2">
            {m.anexos.filter(a => a.origem !== 'admin').map((anexo) => (
              <a key={anexo.id} href={`/api/downloads/${anexo.id}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-[#f2f4fb] rounded-lg px-4 py-3 hover:bg-[#eef0f8] transition-colors group w-fit">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#182257"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
                <span className="text-sm text-[#182257] font-medium group-hover:underline">{anexo.nomeOriginal}</span>
                <span className="text-xs text-[#5a6480]">{(anexo.tamanho / 1024).toFixed(0)} KB</span>
                <svg className="text-[#182257] opacity-50 group-hover:opacity-100 transition-opacity ml-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-[#d2d8ec] p-6">
        <h3 className="font-semibold text-[#111827] mb-5" style={{ fontFamily: "var(--font-display)" }}>Gestão da Manifestação</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-xs font-semibold text-[#5a6480] uppercase tracking-wider mb-1.5">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as Manifestacao["status"])} className="w-full px-3.5 py-2.5 rounded-lg border border-[#d2d8ec] text-sm focus:outline-none focus:border-[#182257] focus:ring-2 focus:ring-[#182257]/10 bg-white text-[#111827] cursor-pointer">
              {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#5a6480] uppercase tracking-wider mb-1.5">Data da Resposta</label>
            <input type="text" readOnly value={m.dataResposta || "—"} className="w-full px-3.5 py-2.5 rounded-lg border border-[#d2d8ec] text-sm bg-[#f2f4fb] text-[#5a6480]" />
          </div>
        </div>
        <div className="mb-5">
          <label className="block text-xs font-semibold text-[#5a6480] uppercase tracking-wider mb-1.5">
            Resposta / Encaminhamento <span className="text-[#b55d0a] normal-case font-normal">(visível ao cidadão)</span>
          </label>
          <textarea rows={6} value={resposta} onChange={(e) => setResposta(e.target.value)} placeholder="Digite aqui a resposta que será enviada ao cidadão. Seja claro, objetivo e informe as providências tomadas ou o encaminhamento dado à manifestação..." className="w-full px-3.5 py-2.5 rounded-lg border border-[#d2d8ec] text-sm focus:outline-none focus:border-[#182257] focus:ring-2 focus:ring-[#182257]/10 transition-all resize-none leading-relaxed" />
        </div>
        <div className="mb-6">
          <label className="block text-xs font-semibold text-[#5a6480] uppercase tracking-wider mb-2">
            Anexar Arquivos na Resposta
          </label>
          <input 
            type="file" 
            multiple 
            accept=".pdf,.jpg,.jpeg,.png,.docx,.doc" 
            onChange={(e) => setArquivos(Array.from(e.target.files || []))}
            className="block w-full text-sm text-[#5a6480] file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#f2f4fb] file:text-[#182257] hover:file:bg-[#eef0f8] cursor-pointer"
          />
          {m.anexos && m.anexos.some(a => a.origem === 'admin') && (
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-xs font-semibold text-[#5a6480] uppercase tracking-wider">Arquivos já anexados por você:</p>
              {m.anexos.filter(a => a.origem === 'admin').map((anexo) => (
                <a key={anexo.id} href={`/api/downloads/${anexo.id}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#182257] hover:underline bg-[#f2f4fb] px-3 py-2 rounded-lg w-fit">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
                  {anexo.nomeOriginal}
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleSave} className="bg-[#182257] hover:bg-[#1e2d6e] text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>
            Salvar Alterações
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-[#1a7a4a] font-medium">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              Salvo com sucesso
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function LoginPage({ onLogin }: { onLogin: (token: string) => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, pass })
      });
      if (res.ok) {
        const data = await res.json();
        onLogin(data.token);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-[#111840] px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src={logoImg} alt="Prefeitura de Capanema" className="h-14 object-contain mx-auto mb-6" />
          <h1 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>Painel Administrativo</h1>
          <p className="text-white/50 text-sm">Ouvidoria em Saúde — Capanema PA</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-7 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#5a6480] uppercase tracking-wider mb-1.5">Usuário</label>
            <input type="text" value={user} onChange={(e) => { setUser(e.target.value); setError(false); }} placeholder="usuario" className="w-full px-3.5 py-2.5 rounded-lg border border-[#d2d8ec] text-sm focus:outline-none focus:border-[#182257] focus:ring-2 focus:ring-[#182257]/10 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#5a6480] uppercase tracking-wider mb-1.5">Senha</label>
            <input type="password" value={pass} onChange={(e) => { setPass(e.target.value); setError(false); }} placeholder="••••••••" className="w-full px-3.5 py-2.5 rounded-lg border border-[#d2d8ec] text-sm focus:outline-none focus:border-[#182257] focus:ring-2 focus:ring-[#182257]/10 transition-all" />
          </div>
          {error && (
            <div className="flex items-center gap-2 bg-[#fde8e8] text-[#b51a1a] text-xs rounded-lg px-3 py-2.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              Usuário ou senha incorretos.
            </div>
          )}
          <button type="submit" disabled={loading} className="w-full bg-[#182257] hover:bg-[#1e2d6e] text-white py-3 rounded-lg text-sm font-bold transition-all mt-2 cursor-pointer disabled:opacity-50" style={{ fontFamily: "var(--font-display)" }}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
          <p className="text-center text-xs text-[#5a6480]">
            Use <span className="font-mono font-bold">admin</span> / <span className="font-mono font-bold">ouvidoria2024</span>
          </p>
        </form>
      </div>
    </div>
  );
}

type Unidade = { id: string; nome: string; status: string; };
type Usuario = { id: string; login: string; nome: string; };

function Configuracoes({ token }: { token: string }) {
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [novaUnidade, setNovaUnidade] = useState("");
  const [novoUser, setNovoUser] = useState({ nome: "", login: "", senha: "" });

  useEffect(() => {
    fetch('/api/unidades').then(r => r.json()).then(setUnidades);
    fetch('/api/usuarios', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()).then(setUsuarios);
  }, [token]);

  async function handleAddUnidade(e: React.FormEvent) {
    e.preventDefault();
    if (!novaUnidade.trim()) return;
    const res = await fetch('/api/unidades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ nome: novaUnidade })
    });
    if (res.ok) {
      const created = await res.json();
      setUnidades([...unidades, created].sort((a, b) => a.nome.localeCompare(b.nome)));
      setNovaUnidade("");
    }
  }

  async function handleDeleteUnidade(id: string) {
    if (!confirm("Tem certeza que deseja excluir esta unidade?")) return;
    const res = await fetch(`/api/unidades/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) setUnidades(unidades.filter(u => u.id !== id));
  }

  async function handleAddUsuario(e: React.FormEvent) {
    e.preventDefault();
    if (!novoUser.nome || !novoUser.login || !novoUser.senha) return;
    const res = await fetch('/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(novoUser)
    });
    if (res.ok) {
      const created = await res.json();
      setUsuarios([...usuarios, created].sort((a, b) => a.nome.localeCompare(b.nome)));
      setNovoUser({ nome: "", login: "", senha: "" });
    }
  }

  async function handleDeleteUsuario(id: string) {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;
    const res = await fetch(`/api/usuarios/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) setUsuarios(usuarios.filter(u => u.id !== id));
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-[#111827] mb-1" style={{ fontFamily: "var(--font-display)" }}>Configurações</h2>
        <p className="text-sm text-[#5a6480]">Gerencie as unidades de atendimento e os usuários administradores do sistema.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Unidades */}
        <div className="bg-white rounded-xl border border-[#d2d8ec] overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-[#d2d8ec]">
            <h3 className="font-semibold text-[#111827] text-sm" style={{ fontFamily: "var(--font-display)" }}>Unidades / Setores</h3>
          </div>
          <div className="p-5 flex-1">
            <form onSubmit={handleAddUnidade} className="flex gap-2 mb-4">
              <input type="text" value={novaUnidade} onChange={e => setNovaUnidade(e.target.value)} placeholder="Nome da nova unidade" className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#d2d8ec] text-sm focus:outline-none focus:border-[#182257] bg-white" />
              <button type="submit" className="bg-[#182257] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-[#1e2d6e] transition-colors cursor-pointer">+</button>
            </form>
            <ul className="divide-y divide-[#f2f4fb]">
              {unidades.map(u => (
                <li key={u.id} className="py-2.5 flex justify-between items-center text-sm text-[#111827]">
                  {u.nome}
                  <button onClick={() => handleDeleteUnidade(u.id)} className="text-[#b51a1a] hover:underline text-xs font-semibold cursor-pointer">Excluir</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Usuarios */}
        <div className="bg-white rounded-xl border border-[#d2d8ec] overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-[#d2d8ec]">
            <h3 className="font-semibold text-[#111827] text-sm" style={{ fontFamily: "var(--font-display)" }}>Usuários (Admin)</h3>
          </div>
          <div className="p-5 flex-1">
            <form onSubmit={handleAddUsuario} className="space-y-3 mb-4">
              <input type="text" value={novoUser.nome} onChange={e => setNovoUser({...novoUser, nome: e.target.value})} placeholder="Nome completo" className="w-full px-3.5 py-2.5 rounded-lg border border-[#d2d8ec] text-sm focus:outline-none focus:border-[#182257] bg-white" />
              <div className="flex gap-2">
                <input type="text" value={novoUser.login} onChange={e => setNovoUser({...novoUser, login: e.target.value})} placeholder="Login" className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#d2d8ec] text-sm focus:outline-none focus:border-[#182257] bg-white" />
                <input type="password" value={novoUser.senha} onChange={e => setNovoUser({...novoUser, senha: e.target.value})} placeholder="Senha" className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#d2d8ec] text-sm focus:outline-none focus:border-[#182257] bg-white" />
              </div>
              <button type="submit" className="w-full bg-[#182257] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-[#1e2d6e] transition-colors cursor-pointer">Adicionar Usuário</button>
            </form>
            <ul className="divide-y divide-[#f2f4fb]">
              {usuarios.map(u => (
                <li key={u.id} className="py-2.5 flex flex-col sm:flex-row justify-between sm:items-center text-sm text-[#111827] gap-1">
                  <div>
                    <span className="font-semibold">{u.nome}</span> <span className="text-[#5a6480] text-xs">({u.login})</span>
                  </div>
                  <button onClick={() => handleDeleteUsuario(u.id)} className="text-[#b51a1a] hover:underline text-xs font-semibold cursor-pointer">Excluir</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

type AdminView = "dashboard" | "list" | "detail" | "config";

export default function AdminApp({ onPublic }: { onPublic: () => void }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("ouvidoria_token"));
  const [view, setView] = useState<AdminView>("dashboard");
  const [data, setData] = useState<Manifestacao[]>([]);
  const [selected, setSelected] = useState<Manifestacao | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (token) {
      fetch('/api/manifestacoes')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.error("Erro ao buscar dados:", err));
    }
  }, [token]);

  function handleLogin(newToken: string) {
    localStorage.setItem("ouvidoria_token", newToken);
    setToken(newToken);
  }

  function handleLogout() {
    localStorage.removeItem("ouvidoria_token");
    setToken(null);
  }

  if (!token) return <LoginPage onLogin={handleLogin} />;

  function handleView(m: Manifestacao) {
    setSelected(m);
    setView("detail");
    setSidebarOpen(false);
  }

  async function handleSave(updated: Manifestacao, files?: File[]) {
    try {
      let finalManifestacao = updated;

      // 1. Atualiza dados de texto
      const res = await fetch(`/api/manifestacoes/${updated.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updated)
      });
      
      if (!res.ok) {
        alert("Erro ao salvar manifestação no servidor.");
        return;
      }
      finalManifestacao = await res.json();

      // 2. Faz upload de arquivos (se existirem)
      if (files && files.length > 0) {
        const formData = new FormData();
        files.forEach(f => formData.append("anexos", f));

        const uploadRes = await fetch(`/api/manifestacoes/${updated.id}/anexos`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData
        });

        if (uploadRes.ok) {
          finalManifestacao = await uploadRes.json();
        } else {
          alert("A manifestação foi salva, mas ocorreu um erro no envio do(s) arquivo(s). Verifique o formato.");
        }
      }

      setData((prev) => prev.map((m) => m.id === finalManifestacao.id ? finalManifestacao : m));
      setSelected(finalManifestacao);
    } catch (err) {
      console.error(err);
      alert("Erro de conexão ao salvar manifestação.");
    }
  }

  const navItems = [
    { key: "dashboard" as AdminView, label: "Dashboard", icon: <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" /> },
    { key: "list" as AdminView, label: "Manifestações", icon: <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" /> },
    { key: "config" as AdminView, label: "Configurações", icon: <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/> }
  ];

  const novas = data.filter((d) => d.status === "nova").length;

  return (
    <div className="min-h-full flex bg-[#f2f4fb]">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-60 bg-[#111840] text-white flex flex-col transition-transform lg:translate-x-0 lg:static lg:z-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="px-4 py-5 border-b border-white/10">
          <img src={logoImg} alt="Prefeitura de Capanema" className="h-9 object-contain" />
          <p className="text-[10px] text-[#e8b820] uppercase tracking-widest font-semibold mt-2">Painel Administrativo</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <button key={item.key} onClick={() => { setView(item.key); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${view === item.key || (view === "detail" && item.key === "list") ? "bg-[#e8b820]/15 text-[#e8b820]" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">{item.icon}</svg>
              {item.label}
              {item.key === "list" && novas > 0 && <span className="ml-auto text-xs bg-[#1456a0] text-white px-1.5 py-0.5 rounded-full font-bold">{novas}</span>}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <button onClick={onPublic} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
            Portal Público
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
            Sair
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-[#d2d8ec] px-6 py-3.5 flex items-center gap-4 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[#5a6480] hover:text-[#182257] cursor-pointer">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
          </button>
          <div className="flex-1">
            <span className="text-sm font-semibold text-[#111827]" style={{ fontFamily: "var(--font-display)" }}>
              {view === "dashboard" ? "Dashboard" : view === "list" ? "Manifestações" : view === "config" ? "Configurações" : `Protocolo ${selected?.protocol}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#182257] flex items-center justify-center text-white text-xs font-bold">A</div>
            <span className="text-sm font-medium text-[#111827] hidden sm:block">Administrador</span>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {view === "dashboard" && <Dashboard data={data} onViewAll={() => setView("list")} />}
          {view === "list" && <ManifestacoesList data={data} onView={handleView} />}
          {view === "detail" && selected && <ManifestacaoDetail m={data.find((d) => d.id === selected.id) || selected} onBack={() => setView("list")} onSave={handleSave} />}
          {view === "config" && <Configuracoes token={token} />}
        </main>
      </div>
    </div>
  );
}
