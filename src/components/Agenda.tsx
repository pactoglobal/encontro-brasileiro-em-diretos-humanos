import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { Clock } from "lucide-react";

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
      "Fernanda Hopenhaym — Membro do UN Working Group on Business and Human Rights (TBC)",
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

const TABS: { key: TabKey; label: string; sub?: string }[] = [
  { key: "manha", label: "Manhã", sub: "9h – 12h30" },
  { key: "grande-otelo", label: "Sala Grande Otelo", sub: "14h – 17h" },
  { key: "oscarito", label: "Sala Oscarito", sub: "14h15 – 17h" },
  { key: "encerramento", label: "Encerramento", sub: "17h – 19h30" },
];

const TYPE_COLORS: Record<string, { border: string; bg: string; label: string; color: string }> = {
  abertura: { border: "rgba(232,24,122,0.25)", bg: "rgba(232,24,122,0.03)", label: "Abertura", color: "#E8187A" },
  painel: { border: "rgba(123,45,30,0.25)", bg: "rgba(123,45,30,0.03)", label: "Painel", color: "#7B2D1E" },
  keynote: { border: "rgba(74,140,63,0.25)", bg: "rgba(74,140,63,0.03)", label: "Keynote", color: "#4A8C3F" },
  intervalo: { border: "rgba(86,94,100,0.2)", bg: "rgba(86,94,100,0.03)", label: "Intervalo", color: "#565E64" },
  encerramento: { border: "rgba(204,34,34,0.25)", bg: "rgba(204,34,34,0.03)", label: "Encerramento", color: "#CC2222" },
  filme: { border: "rgba(139,30,90,0.25)", bg: "rgba(139,30,90,0.03)", label: "Exibição", color: "#8B1E5A" },
};

function AgendaCard({ item, index }: { item: AgendaItem; index: number }) {
  const tc = TYPE_COLORS[item.type ?? "painel"];
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ type: "spring", stiffness: 100, damping: 18, delay: index * 0.05 }}
      whileHover={{ y: -2, transition: { duration: 0.1 } }}
      className="rounded-xl p-5 flex gap-4 border bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-200"
      style={{ borderColor: tc.border }}
    >
      {/* Hora */}
      <div className="shrink-0 flex flex-col items-center gap-1.5 pt-0.5">
        <Clock className="w-3.5 h-3.5 opacity-70" style={{ color: tc.color }} />
        <p className="text-[11px] font-black tabular-nums" style={{ color: tc.color }}>
          {item.time}
        </p>
      </div>

      <div className="flex-1 min-w-0">
        {item.type && (
          <span
            className="inline-block mb-2 text-[9px] font-black uppercase tracking-[0.22em] px-2.5 py-0.5 rounded-full"
            style={{ background: "rgba(0,0,0,0.03)", color: tc.color, border: `1px solid ${tc.border}` }}
          >
            {tc.label}
          </span>
        )}
        <h3 className="text-base font-bold text-dhe-navy leading-snug mb-2">{item.title}</h3>
        {item.speakers && item.speakers.length > 0 && (
          <ul className="space-y-1">
            {item.speakers.map((s, i) => (
              <li key={i} className="text-xs leading-relaxed text-dhe-text-muted">
                · {s}
              </li>
            ))}
          </ul>
        )}
        {item.mediator && (
          <p className="mt-2 text-xs italic text-dhe-text-muted/80">
            Mediação: {item.mediator}
          </p>
        )}
      </div>
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

  return (
    <section id="programacao" className="dhe-section-light relative overflow-hidden">
      <div className="dhe-container px-5 sm:px-8">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        >
          <p className="dhe-section-label">Programação</p>
          <div className="dhe-stripe-divider">
            <span />
            <span />
            <span />
            <span />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-dhe-navy mb-3">
            Agenda do Evento
          </h2>
          <p className="text-base text-dhe-text-muted mb-8">
            04 de agosto de 2026 · Cinemateca Brasileira, São Paulo
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {TABS.map((tab) => {
              const isActive = active === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActive(tab.key)}
                  className="relative flex flex-col items-start rounded-xl px-4 py-3 text-left transition-all duration-200 cursor-pointer overflow-hidden border border-[#D8D4C7] bg-[#FAF9F6] text-dhe-text-main"
                >
                  {/* Fundo animado das abas (KIKK style layout transitions) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-gradient-to-tr from-[#E8187A] to-[#E05A3A] z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className={`text-xs font-bold relative z-10 ${isActive ? "text-white" : "text-dhe-navy"}`}>
                    {tab.label}
                  </span>
                  {tab.sub && (
                    <span className={`text-[10px] opacity-75 mt-0.5 relative z-10 ${isActive ? "text-white/80" : "text-dhe-text-muted"}`}>
                      {tab.sub}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Items com AnimatePresence para transições super fluidas */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-3"
              >
                {AGENDA_MAP[active].map((item, i) => (
                  <AgendaCard key={`${active}-${i}`} item={item} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
