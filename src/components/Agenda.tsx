import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";

type AgendaItem = {
  time: string;
  title: string;
  speakers?: string[];
  mediator?: string;
  type?: "abertura" | "painel" | "keynote" | "intervalo" | "encerramento" | "filme";
};

const MANHA: AgendaItem[] = [
  {
    time: "9h15",
    title: "Abertura Institucional e Boas-vindas",
    speakers: [
      "Guilherme Xavier — Diretor Executivo, Pacto Global Rede Brasil",
      "Vinicius Pinheiro — Diretor da OIT no Brasil",
      "Representante ACNUDH",
      "Representante OCDE",
      "Representante União Europeia",
      "Igor Garafulic — Coordenador Residente da ONU no Brasil (TBC)",
    ],
    type: "abertura",
  },
  {
    time: "10h",
    title: "Empresas e Direitos Humanos em um mundo em profunda transformação",
    speakers: [
      "Fernanda Hopenhaym — UN Working Group on Business and Human Rights (TBC)",
      "Adriana Marcolino — DIEESE",
      "Camila Zelezoglo — ABIT",
    ],
    mediator: "Flávia Oliveira, Jornalista (TBC)",
    type: "painel",
  },
  {
    time: "11h15",
    title: "O que a agenda significa hoje, para quem faz sentido e como vem sendo implementada",
    speakers: [
      "Victoriana Leonora (TBC)",
      "Sue Wolter — Petrobras (TBC)",
      "Jandyra Uehara — CUT",
      "Juliana Neiva — Conectas (TBC)",
    ],
    mediator: "Gabriel Vetorazzo, OIT",
    type: "painel",
  },
  {
    time: "12h30 – 14h",
    title: "Almoço",
    type: "intervalo",
  },
];

const TARDE_GRANDE_OTELO: AgendaItem[] = [
  {
    time: "14h",
    title: "Keynote Speaker",
    type: "keynote",
  },
  {
    time: "14h15",
    title: "Com quais instrumentos a agenda responde (ou não) ao contexto atual?",
    speakers: [
      "Andrea Bolzon — PNUD",
      "Luiz Henrique Ramos — Secretário de Inspeção do Trabalho, MTE",
      "Gabriela Almeida — Pacto Global da ONU – Rede Brasil / BHR Gap Analysis",
      "TBD Empresa",
    ],
    mediator: "Flávia Scabin, FGV (TBC)",
    type: "painel",
  },
  {
    time: "15h30",
    title: "Mineração para a transição energética: terras raras, minerais críticos e responsabilidade",
    speakers: [
      "Josefa Oliveira — Conselho Ribeirinho",
      "João Marcos Pires Camargo — Ministério de Minas e Energia",
      "Gilson Camboim — Presidente da Coogavepe",
      "Larissa Rodrigues — Instituto Escolhas",
      "Miguel Castro-Riberos — OCDE",
      "Christianne Canavero — Head Global de Sustentabilidade da CBMN (TBC)",
    ],
    mediator: "Simone Rocha, ERM",
    type: "painel",
  },
];

const TARDE_OSCARITO: AgendaItem[] = [
  {
    time: "14h15",
    title: "Consentimento Livre, Prévio e Informado (CLPI) na prática",
    speakers: [
      "Hernan Coronado — Especialista de normas da América Latina, OIT (TBC)",
      "Uine — liderança quilombola de Ilha de Maré",
      "Pedro Vilela — Axia Energia",
      "Representante Movimento Impactados por Barragens",
      "Thalita Verônica Gonçalves — Defensora Pública do Estado de São Paulo",
    ],
    mediator: "Ângela Pires, ACNUDH",
    type: "painel",
  },
  {
    time: "15h30",
    title: "Agroindústria, direitos humanos e cadeias de valor: responsabilidade e desafios",
    speakers: [
      "Malu Pinto — Suzano (TBC)",
      "Gabriel Bezerra — CONTAR (TBC)",
      "Irina Bacci — PADF",
      "Representante Cecaf (TBD)",
      "Danielle Pamplona (TBC)",
    ],
    mediator: "Fernanda Hopenhaym — UN Working Group (TBC)",
    type: "painel",
  },
];

const ENCERRAMENTO: AgendaItem[] = [
  {
    time: "17h",
    title: "Encerramento das palestras",
    type: "encerramento",
  },
  {
    time: "17h20 – 19h20",
    title: "Exibição do Filme: «A Melhor Mãe do Mundo»",
    type: "filme",
  },
  {
    time: "19h20 – 19h30",
    title: "Bate Papo sobre o filme",
    speakers: ["Shirley Cruz (TBC)", "Seu Jorge (TBC)"],
    type: "encerramento",
  },
];

type TabKey = "manha" | "grande-otelo" | "oscarito" | "encerramento";

const TABS: {
  key: TabKey;
  label: string;
  sub?: string;
  accent: string;
  accentBg: string;
  icon: string;
}[] = [
  { key: "manha", label: "Manhã", sub: "9h – 12h30", accent: "#E8187A", accentBg: "rgba(232,24,122,0.08)", icon: "☀️" },
  { key: "grande-otelo", label: "Sala Grande Otelo", sub: "14h – 17h", accent: "#7B2D1E", accentBg: "rgba(123,45,30,0.08)", icon: "🎭" },
  { key: "oscarito", label: "Sala Oscarito", sub: "14h15 – 17h", accent: "#4A8C3F", accentBg: "rgba(74,140,63,0.08)", icon: "🌿" },
  { key: "encerramento", label: "Encerramento & Filme", sub: "17h – 19h30", accent: "#E05A3A", accentBg: "rgba(224,90,58,0.08)", icon: "🎬" },
];

const TYPE_META: Record<string, { label: string; color: string; bg: string }> = {
  abertura:     { label: "Abertura",   color: "#E8187A", bg: "rgba(232,24,122,0.08)" },
  painel:       { label: "Painel",     color: "#7B2D1E", bg: "rgba(123,45,30,0.08)" },
  keynote:      { label: "Keynote",    color: "#4A8C3F", bg: "rgba(74,140,63,0.08)"  },
  intervalo:    { label: "Intervalo",  color: "#596168", bg: "rgba(89,97,104,0.08)"  },
  encerramento: { label: "Encerramento", color: "#CC2222", bg: "rgba(204,34,34,0.08)" },
  filme:        { label: "Exibição",   color: "#E05A3A", bg: "rgba(224,90,58,0.08)"  },
};

function BentoAgendaGrid({ items, tab }: { items: AgendaItem[]; tab: typeof TABS[0] }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <motion.div
      key={tab.key}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto"
    >
      {items.map((item, i) => {
        const meta = TYPE_META[item.type ?? "painel"];
        const isFeatured = i === 0;
        const isExpanded = expanded === i;
        const isBreak = item.type === "intervalo";

        if (isBreak) {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="md:col-span-2 lg:col-span-3 flex items-center gap-4 py-4 px-6 rounded-2xl"
              style={{ background: meta.bg }}
            >
              <div className="flex-1 h-px" style={{ background: meta.color, opacity: 0.3 }} />
              <div className="flex items-center gap-3">
                <span className="text-sm font-black" style={{ color: meta.color }}>{item.time}</span>
                <span className="text-sm text-dhe-text-muted font-medium">{item.title}</span>
              </div>
              <div className="flex-1 h-px" style={{ background: meta.color, opacity: 0.3 }} />
            </motion.div>
          );
        }

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 80, damping: 16, delay: i * 0.06 }}
            onClick={() => setExpanded(isExpanded ? null : i)}
            className={`
              relative overflow-hidden rounded-[20px] p-5 cursor-pointer group transition-all duration-300
              ${isFeatured ? "md:col-span-2 lg:col-span-2 md:row-span-2" : ""}
              ${item.type === "keynote" ? "lg:col-span-1" : ""}
            `}
            style={{
              background: isFeatured ? tab.accent : "white",
              boxShadow: isFeatured
                ? `0 16px 48px ${tab.accent}30`
                : "0 2px 12px rgba(12,37,64,0.05)",
              border: isFeatured ? "none" : "1px solid #D8D4C7",
            }}
            whileHover={{ y: -3, boxShadow: isFeatured ? `0 24px 64px ${tab.accent}40` : "0 8px 32px rgba(12,37,64,0.09)" }}
          >
            {/* Fita KV nos cards destaque */}
            {isFeatured && (
              <div className="absolute inset-0 opacity-[0.08] bg-cover bg-center bg-[url('/identity/kv-sem-fundo.png')]" />
            )}

            {/* Conteúdo */}
            <div className="relative z-10 h-full flex flex-col gap-3">
              {/* Topo: badge + hora */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span
                  className="text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
                  style={
                    isFeatured
                      ? { background: "rgba(255,255,255,0.2)", color: "white" }
                      : { background: meta.bg, color: meta.color }
                  }
                >
                  {meta.label}
                </span>
                <span
                  className="text-[10px] font-black tabular-nums"
                  style={{ color: isFeatured ? "rgba(255,255,255,0.7)" : meta.color }}
                >
                  {item.time}
                </span>
              </div>

              {/* Título */}
              <h3
                className={`font-display font-black leading-snug ${isFeatured ? "text-xl text-white" : "text-sm text-dhe-navy"}`}
              >
                {item.title}
              </h3>

              {/* Palestrantes — mostrar se destaque ou expandido */}
              <AnimatePresence>
                {(isFeatured || isExpanded) && item.speakers && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-1.5 overflow-hidden"
                  >
                    {item.speakers.map((s, si) => (
                      <li
                        key={si}
                        className="text-xs leading-relaxed flex items-start gap-2"
                        style={{ color: isFeatured ? "rgba(255,255,255,0.75)" : "#596168" }}
                      >
                        <span
                          className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                          style={{ background: isFeatured ? "rgba(255,255,255,0.5)" : meta.color }}
                        />
                        {s}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              {/* Mediação */}
              <AnimatePresence>
                {(isFeatured || isExpanded) && item.mediator && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs italic"
                    style={{ color: isFeatured ? "rgba(255,255,255,0.55)" : "#596168" }}
                  >
                    Mediação: {item.mediator}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Expand hint em cards não-featured */}
              {!isFeatured && item.speakers && (
                <div className="mt-auto pt-2 flex items-center gap-1.5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-dhe-text-muted/50 group-hover:text-dhe-text-muted/80 transition-colors">
                    {isExpanded ? "▲ Ocultar" : `▾ ${item.speakers.length} palestrantes`}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

const AGENDA_MAP: Record<TabKey, AgendaItem[]> = {
  manha: MANHA,
  "grande-otelo": TARDE_GRANDE_OTELO,
  oscarito: TARDE_OSCARITO,
  encerramento: ENCERRAMENTO,
};

export function Agenda() {
  const [active, setActive] = useState<TabKey>("manha");
  const [ref, inView] = useInView();
  const activeTab = TABS.find((t) => t.key === active)!;

  return (
    <section id="programacao" className="dhe-section-light relative overflow-hidden">
      {/* Orb decorativo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-dhe-magenta/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-dhe-green/4 rounded-full blur-3xl pointer-events-none" />

      <div className="dhe-container">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        >
          <p className="dhe-section-label">Programação</p>
          <div className="dhe-stripe-divider">
            <span /><span /><span /><span />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-dhe-navy mb-2">
            Agenda do Evento
          </h2>
          <p className="text-base text-dhe-text-muted mb-10">
            04 de agosto de 2026 · Cinemateca Brasileira, São Paulo
          </p>

          {/* Ticker */}
          <div className="w-full overflow-hidden mb-10 -mx-5 sm:mx-0 rounded-2xl">
            <div className="dhe-ticker-container rounded-2xl" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="dhe-ticker-content text-white font-display font-black text-[10px] sm:text-xs uppercase tracking-[0.2em]">
                <span>DIREITOS HUMANOS E EMPRESAS</span>
                <span className="text-dhe-magenta">×</span>
                <span>PLURALIDADE QUE CONSTRÓI</span>
                <span className="text-dhe-green">×</span>
                <span>04 DE AGOSTO DE 2026</span>
                <span className="text-dhe-coral">×</span>
                <span>CINEMATECA BRASILEIRA · SÃO PAULO</span>
                <span className="text-dhe-magenta">×</span>
                <span>DIREITOS HUMANOS E EMPRESAS</span>
                <span className="text-dhe-magenta">×</span>
                <span>PLURALIDADE QUE CONSTRÓI</span>
                <span className="text-dhe-green">×</span>
                <span>04 DE AGOSTO DE 2026</span>
                <span className="text-dhe-coral">×</span>
                <span>CINEMATECA BRASILEIRA · SÃO PAULO</span>
                <span className="text-dhe-magenta">×</span>
              </div>
            </div>
          </div>

          {/* Tabs — Pills premium */}
          <div className="flex overflow-x-auto gap-2.5 pb-3 mb-8 -mx-5 px-5 sm:mx-0 sm:px-0" style={{ scrollbarWidth: "none" }}>
            {TABS.map((tab) => {
              const isActive = active === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActive(tab.key)}
                  className="relative flex items-center gap-2 rounded-full px-5 py-2.5 text-left transition-all duration-200 cursor-pointer whitespace-nowrap border"
                  style={{
                    background: isActive ? tab.accent : "white",
                    borderColor: isActive ? tab.accent : "#D8D4C7",
                    boxShadow: isActive ? `0 4px 20px ${tab.accent}30` : "0 1px 4px rgba(12,37,64,0.05)",
                  }}
                >
                  <span className="text-base" aria-hidden="true">{tab.icon}</span>
                  <div className="flex flex-col">
                    <span
                      className="text-[11px] font-bold leading-tight"
                      style={{ color: isActive ? "white" : "#1C2329" }}
                    >
                      {tab.label}
                    </span>
                    {tab.sub && (
                      <span
                        className="text-[9px] font-medium leading-tight mt-0.5"
                        style={{ color: isActive ? "rgba(255,255,255,0.7)" : "#596168" }}
                      >
                        {tab.sub}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bento Grid da Agenda */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <BentoAgendaGrid key={active} items={AGENDA_MAP[active]} tab={activeTab} />
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
