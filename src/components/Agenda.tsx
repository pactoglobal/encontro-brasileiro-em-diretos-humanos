import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";
import {
  Sun,
  Mic2,
  Leaf,
  Film,
  Users,
  Music,
  Coffee,
  MessageCircle,
  Megaphone,
  Globe,
  Clapperboard,
  ChevronDown,
  ChevronUp,
  MapPin,
} from "lucide-react";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type ItemType =
  | "abertura"
  | "painel"
  | "roda"
  | "artistica"
  | "intervalo"
  | "encerramento"
  | "filme"
  | "batepapo";

type Speaker = { name: string; role: string };

type AgendaItem = {
  time: string;
  title: string;
  description?: string;
  speakers?: Speaker[];
  mediator?: Speaker;
  type: ItemType;
};

// ─── Icon helper type ─────────────────────────────────────────────────────────
type IconComponent = React.FC<{ className?: string; style?: React.CSSProperties }>;

// ─── Dados da Concept Note ────────────────────────────────────────────────────

const MANHA_GRANDE_OTELO: AgendaItem[] = [
  {
    time: "9h",
    title: "Atração Artística",
    description: "Banda dos Curumins",
    type: "artistica",
  },
  {
    time: "9h15",
    title: "Abertura Institucional e Boas-vindas",
    type: "abertura",
    speakers: [
      { name: "Guilherme Xavier", role: "Diretor Executivo — Pacto Global Rede Brasil" },
      { name: "Vinicius Pinheiro", role: "Diretor da OIT no Brasil" },
      { name: "Ângela Pires", role: "ACNUDH" },
      { name: "Miguel Castro-Riberos", role: "OCDE" },
      { name: "Igor Garafulic", role: "Coordenador Residente da ONU no Brasil (vídeo)" },
    ],
  },
  {
    time: "10h15",
    title: "Empresas e Direitos Humanos em um mundo em profunda transformação",
    type: "painel",
    speakers: [
      { name: "Fernanda Hopenhaym", role: "Membro do UN Working Group on Business and Human Rights (Vídeo)" },
      { name: "Flavia Scabin", role: "Diretora do FGV CeDHE" },
      { name: "Adriana Marcolino", role: "DIEESE" },
      { name: "Camila Zelezoglo", role: "Gerente de Sustentabilidade e Inovação — ABIT" },
    ],
    mediator: { name: "Edilene Lopes", role: "Jornalista CNN (TBC)" },
  },
  {
    time: "11h15",
    title: "O que a agenda significa hoje, para quem faz sentido e como vem sendo implementada",
    type: "painel",
    speakers: [
      { name: "Victoriana Leonora", role: "(TBC)" },
      { name: "Sue Wolter", role: "Petrobras" },
      { name: "Jandyra Uehara", role: "Secretária de Políticas Sociais e Direitos Humanos — CUT Nacional" },
      { name: "Julia Neiva", role: "Conectas" },
      { name: "Leticia Pantoja", role: "MDH (TBC)" },
    ],
    mediator: { name: "Vinicius Pinheiro", role: "Diretor da OIT no Brasil" },
  },
  {
    time: "12h30 – 14h",
    title: "Almoço",
    type: "intervalo",
  },
];

const MANHA_FOYER: AgendaItem[] = [
  {
    time: "10h – 10h50",
    title: "Diversidade, Equidade e Inclusão (DEI)",
    description:
      "O futuro da agenda de DEI no Brasil: desaceleração ou transformação em um novo contexto geopolítico?",
    type: "roda",
  },
  {
    time: "11h10 – 12h",
    title: "Justiça Climática para Povos Indígenas e Comunidades Tradicionais",
    description:
      "O que as experiências e perspectivas de povos indígenas e comunidades tradicionais nos ensinam sobre resiliência e ações de enfrentamento à crise climática de forma justa e equitativa?",
    type: "roda",
  },
];

const TARDE_GRANDE_OTELO: AgendaItem[] = [
  {
    time: "14h",
    title: "Intervenção Artística",
    description: "Heloísa Perissé, atriz (TBC)",
    type: "artistica",
  },
  {
    time: "14h15",
    title: "Consentimento Livre, Prévio e Informado (CLPI) na prática",
    type: "painel",
    speakers: [
      { name: "Hernan Coronado", role: "Especialista Regional Pueblos Indígenas — OIT" },
      { name: "Uine Lopes", role: "Pescador e Professor — Movimento dos Pescadores Artesanais" },
      { name: "Pedro Villela", role: "Gerente Executivo de Impacto Social — Axia Energia" },
      { name: "Thalita Silva", role: "Defensora Pública do Estado de São Paulo" },
      { name: "Josefa Camara", role: "Educadora Popular Beiradeira — Conselho Ribeirinho" },
    ],
    mediator: { name: "Ângela Pires", role: "ACNUDH" },
  },
  {
    time: "15h30",
    title: "Mineração para a transição energética: terras raras, minerais críticos e responsabilidade",
    type: "painel",
    speakers: [
      { name: "Maryellen Crisóstomo", role: "CONAQ — Set Setting (10 min)" },
      { name: "João Marcos Pires Camargo", role: "Diretor de Política e Planejamento Mineral — MME" },
      { name: "Gilson Camboim", role: "Presidente da Coogavepe" },
      { name: "Natalia Souza", role: "CEERT (TBC)" },
      { name: "Miguel Castro-Riberos", role: "OCDE" },
      { name: "Christianne Canavero", role: "Head Global de Sustentabilidade — CBMN (TBC)" },
    ],
    mediator: { name: "Simone Rocha", role: "Sócia da ERM América Latina — Direitos Humanos e Impacto Social" },
  },
  {
    time: "17h",
    title: "Encerramento das palestras",
    type: "encerramento",
  },
];

const TARDE_OSCARITO: AgendaItem[] = [
  {
    time: "14h15",
    title: "Com quais instrumentos a agenda responde (ou não) ao contexto atual?",
    type: "painel",
    speakers: [
      { name: "Andrea Bolzon", role: "PNUD" },
      { name: "Luiz Henrique Ramos", role: "Secretário de Inspeção do Trabalho — MTE" },
      { name: "Gabriela Almeida", role: "Pacto Global da ONU – Rede Brasil / BHR Gap Analysis" },
      { name: "Representante Globo", role: "(TBC)" },
    ],
    mediator: { name: "Flávia Scabin", role: "FGV" },
  },
  {
    time: "15h30",
    title: "Agroindústria, direitos humanos e cadeias de valor: responsabilidade e desafios",
    type: "painel",
    speakers: [
      { name: "Gabriel Bezerra", role: "Presidente da CONTAR" },
      { name: "Irina Bacci", role: "PADF" },
      { name: "Marcos Antônio Matos", role: "Diretor Cecafe" },
      { name: "Danielle Pamplona", role: "(TBC)" },
    ],
    mediator: { name: "Juliana Ramalho", role: "Mattos Filho — Coordenadora da Plataforma de Ação pelos DH do Pacto Global" },
  },
  {
    time: "17h",
    title: "Encerramento das palestras",
    type: "encerramento",
  },
];

const TARDE_FOYER: AgendaItem[] = [
  {
    time: "13h – 13h50",
    title: "Para além do Discurso: Como evitar o Washing?",
    type: "roda",
  },
  {
    time: "14h30 – 15h10",
    title: "Empresas, Primeira Infância e Juventudes",
    description:
      "Como as empresas podem contribuir para o desenvolvimento integral de crianças, adolescentes e jovens, gerando impactos positivos para as famílias, comunidades e para o futuro do trabalho?",
    type: "roda",
  },
  {
    time: "15h30 – 16h20",
    title: "IA e Direitos Humanos",
    description:
      "Como garantir que a inovação em inteligência artificial seja compatível com a proteção e promoção dos direitos humanos?",
    type: "roda",
  },
];

const ENCERRAMENTO: AgendaItem[] = [
  {
    time: "17h20 – 19h20",
    title: 'Exibição do Filme: "A Melhor Mãe do Mundo"',
    type: "filme",
  },
  {
    time: "19h20 – 20h",
    title: "Bate Papo: Economia Circular, Direitos Humanos e Autonomia das Mulheres",
    description: "Construindo cadeias produtivas livres de violência e exclusão",
    type: "batepapo",
    speakers: [
      { name: "Tarciana Medeiros", role: "Presidenta do Banco do Brasil (TBC)" },
      { name: "Seu Jorge", role: "Cantor, ator e produtor cultural (TBC)" },
      { name: "Dona Carmen Silva", role: "Liderança do MSTC, da Ocupação 9 de Julho e da Casa Verbo (TBC)" },
      { name: "Shirley Cruz", role: "Artista e liderança (TBC)" },
    ],
    mediator: { name: "Paulo Vieira", role: "(TBC)" },
  },
];

// ─── Configuração das Tabs ────────────────────────────────────────────────────

type TabKey =
  | "manha-grande"
  | "manha-foyer"
  | "tarde-grande"
  | "tarde-oscarito"
  | "tarde-foyer"
  | "encerramento";

type Tab = {
  key: TabKey;
  label: string;
  sala: string;
  period: "Manhã" | "Tarde" | "Encerramento";
  time: string;
  accent: string;
  items: AgendaItem[];
};

const TABS: Tab[] = [
  {
    key: "manha-grande",
    label: "Sala Grande Otelo",
    sala: "Plenária",
    period: "Manhã",
    time: "9h – 12h30",
    accent: "#E8187A",
    items: MANHA_GRANDE_OTELO,
  },
  {
    key: "manha-foyer",
    label: "Foyer Grande Otelo",
    sala: "Rodas de Conversa",
    period: "Manhã",
    time: "10h – 12h",
    accent: "#7B2D1E",
    items: MANHA_FOYER,
  },
  {
    key: "tarde-grande",
    label: "Sala Grande Otelo",
    sala: "Painéis Simultâneos",
    period: "Tarde",
    time: "14h – 17h",
    accent: "#4A8C3F",
    items: TARDE_GRANDE_OTELO,
  },
  {
    key: "tarde-oscarito",
    label: "Sala Oscarito",
    sala: "Painéis Simultâneos",
    period: "Tarde",
    time: "14h15 – 17h",
    accent: "#0C2540",
    items: TARDE_OSCARITO,
  },
  {
    key: "tarde-foyer",
    label: "Foyer Grande Otelo",
    sala: "Rodas de Conversa",
    period: "Tarde",
    time: "13h – 16h20",
    accent: "#E05A3A",
    items: TARDE_FOYER,
  },
  {
    key: "encerramento",
    label: "Encerramento",
    sala: "Filme e Debate",
    period: "Encerramento",
    time: "17h20 – 20h",
    accent: "#596168",
    items: ENCERRAMENTO,
  },
];

// ─── Mapa de ícones e metadados por tipo ─────────────────────────────────────

const TYPE_META: Record<
  ItemType,
  { label: string; color: string; bg: string; Icon: IconComponent }
> = {
  abertura:     { label: "Abertura",        color: "#E8187A", bg: "rgba(232,24,122,0.10)", Icon: Megaphone },
  painel:       { label: "Painel",          color: "#0C2540", bg: "rgba(12,37,64,0.07)",   Icon: Mic2 },
  roda:         { label: "Roda de Conversa",color: "#7B2D1E", bg: "rgba(123,45,30,0.09)", Icon: MessageCircle },
  artistica:    { label: "Atração Artística",color:"#4A8C3F", bg: "rgba(74,140,63,0.09)", Icon: Music },
  intervalo:    { label: "Intervalo",       color: "#596168", bg: "rgba(89,97,104,0.07)", Icon: Coffee },
  encerramento: { label: "Encerramento",    color: "#7B2D1E", bg: "rgba(123,45,30,0.09)", Icon: Globe },
  filme:        { label: "Exibição de Filme",color:"#E05A3A", bg: "rgba(224,90,58,0.09)", Icon: Clapperboard },
  batepapo:     { label: "Bate Papo",       color: "#E8187A", bg: "rgba(232,24,122,0.10)", Icon: MessageCircle },
};

// ─── Card de Item da Agenda ───────────────────────────────────────────────────

function AgendaCard({
  item,
  index,
  accent,
  featured,
}: {
  item: AgendaItem;
  index: number;
  accent: string;
  featured?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const meta = TYPE_META[item.type];
  const hasSpeakers = item.speakers && item.speakers.length > 0;
  const isBreak = item.type === "intervalo";
  const isArtistic = item.type === "artistica";

  // Break / Artistic — linha horizontal discreta
  if (isBreak || isArtistic) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04 }}
        className="flex items-center gap-4 py-3 px-5 rounded-2xl"
        style={{ background: meta.bg }}
      >
        <meta.Icon className="w-4 h-4 shrink-0" style={{ color: meta.color }} />
        <span className="text-xs font-black tabular-nums" style={{ color: meta.color }}>
          {item.time}
        </span>
        <div className="flex-1 h-px opacity-30" style={{ background: meta.color }} />
        <div className="text-right">
          <span className="text-xs font-bold" style={{ color: meta.color }}>
            {item.title}
          </span>
          {item.description && (
            <p className="text-[10px] opacity-70 mt-0.5" style={{ color: meta.color }}>
              {item.description}
            </p>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 16, delay: index * 0.06 }}
      className={`rounded-[20px] overflow-hidden border transition-all duration-200 ${featured ? "md:col-span-2" : ""}`}
      style={{
        background: featured ? accent : "white",
        borderColor: featured ? "transparent" : "#D8D4C7",
        boxShadow: featured
          ? `0 16px 48px ${accent}30`
          : "0 2px 10px rgba(12,37,64,0.05)",
      }}
    >
      {/* Header do card */}
      <div className="p-5 pb-4">
        {/* Badge + hora */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
            style={
              featured
                ? { background: "rgba(255,255,255,0.18)", color: "white" }
                : { background: meta.bg, color: meta.color }
            }
          >
            <meta.Icon className="w-3 h-3" />
            {meta.label}
          </span>
          <span
            className="text-[10px] font-black tabular-nums shrink-0"
            style={{ color: featured ? "rgba(255,255,255,0.7)" : meta.color }}
          >
            {item.time}
          </span>
        </div>

        {/* Título */}
        <h3
          className={`font-display font-black leading-snug ${featured ? "text-lg text-white" : "text-sm"}`}
          style={featured ? {} : { color: "#0C2540" }}
        >
          {item.title}
        </h3>

        {/* Descrição */}
        {item.description && (
          <p
            className="text-xs leading-relaxed mt-2"
            style={{ color: featured ? "rgba(255,255,255,0.75)" : "#596168" }}
          >
            {item.description}
          </p>
        )}

        {/* Palestrantes — featured mostra sempre, outros accordion */}
        {hasSpeakers && (featured ? true : open) && (
          <motion.ul
            initial={featured ? {} : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2"
          >
            {item.speakers!.map((s, si) => (
              <li key={si} className="flex items-start gap-2">
                <Users
                  className="w-3 h-3 mt-[3px] shrink-0"
                  style={{ color: featured ? "rgba(255,255,255,0.5)" : meta.color }}
                />
                <div>
                  <span
                    className="text-xs font-bold leading-tight block"
                    style={{ color: featured ? "white" : "#0C2540" }}
                  >
                    {s.name}
                  </span>
                  <span
                    className="text-[10px] leading-tight"
                    style={{ color: featured ? "rgba(255,255,255,0.6)" : "#596168" }}
                  >
                    {s.role}
                  </span>
                </div>
              </li>
            ))}
          </motion.ul>
        )}

        {/* Mediação */}
        {item.mediator && (featured ? true : open) && (
          <div
            className="mt-3 flex items-start gap-2 pt-3"
            style={{ borderTop: featured ? "1px solid rgba(255,255,255,0.15)" : "1px solid #E5E2DA" }}
          >
            <Mic2
              className="w-3 h-3 mt-[3px] shrink-0"
              style={{ color: featured ? "rgba(255,255,255,0.5)" : meta.color }}
            />
            <div>
              <span
                className="text-[9px] font-black uppercase tracking-widest block mb-0.5"
                style={{ color: featured ? "rgba(255,255,255,0.5)" : "#596168" }}
              >
                Mediação
              </span>
              <span
                className="text-xs font-bold"
                style={{ color: featured ? "rgba(255,255,255,0.85)" : "#0C2540" }}
              >
                {item.mediator.name}
              </span>
              <span
                className="text-[10px] block"
                style={{ color: featured ? "rgba(255,255,255,0.6)" : "#596168" }}
              >
                {item.mediator.role}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Botão expandir — só nos não-featured com palestrantes */}
      {!featured && hasSpeakers && (
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-3 text-[9px] font-black uppercase tracking-widest cursor-pointer transition-colors"
          style={{
            background: open ? "rgba(12,37,64,0.03)" : "transparent",
            color: meta.color,
            borderTop: "1px solid #E5E2DA",
          }}
        >
          <span>{open ? "Ocultar palestrantes" : `Ver ${item.speakers!.length} palestrantes`}</span>
          {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      )}
    </motion.div>
  );
}

// ─── Grupos de tabs por período ───────────────────────────────────────────────

const PERIODS = [
  { label: "Manhã", keys: ["manha-grande", "manha-foyer"] as TabKey[], Icon: Sun },
  { label: "Tarde", keys: ["tarde-grande", "tarde-oscarito", "tarde-foyer"] as TabKey[], Icon: Leaf },
  { label: "Encerramento", keys: ["encerramento"] as TabKey[], Icon: Film },
];

// ─── Componente principal ─────────────────────────────────────────────────────

export function Agenda() {
  const [active, setActive] = useState<TabKey>("manha-grande");
  const [ref, inView] = useInView();

  const activeTab = TABS.find((t) => t.key === active)!;

  return (
    <section id="programacao" className="dhe-section-light relative overflow-hidden">
      {/* Orbs decorativos */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-dhe-magenta/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-dhe-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="dhe-container">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        >
          {/* Header da seção */}
          <p className="dhe-section-label">Programação</p>
          <div className="dhe-stripe-divider">
            <span /><span /><span /><span />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-dhe-navy mb-2">
            Agenda do Evento
          </h2>
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <div className="flex items-center gap-1.5 text-sm text-dhe-text-muted">
              <Sun className="w-4 h-4 text-dhe-magenta" />
              <span>04 de agosto de 2026 · 9h às 20h</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-dhe-text-muted">
              <MapPin className="w-4 h-4 text-dhe-magenta" />
              <span>Cinemateca Brasileira, São Paulo</span>
            </div>
          </div>

          {/* Ticker */}
          <div className="w-full overflow-hidden mb-10 -mx-5 sm:mx-0 rounded-2xl">
            <div
              className="dhe-ticker-container rounded-2xl"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.1)",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="dhe-ticker-content text-white font-display font-black text-[10px] sm:text-xs uppercase tracking-[0.2em]">
                {[
                  "DIREITOS HUMANOS E EMPRESAS",
                  "PLURALIDADE QUE CONSTRÓI",
                  "04 DE AGOSTO DE 2026",
                  "CINEMATECA BRASILEIRA · SÃO PAULO",
                  "PAINEL PLENÁRIO",
                  "RODAS DE CONVERSA",
                  "EXIBIÇÃO DE FILME",
                ]
                  .flatMap((t, i) => [
                    <span key={`t${i}`}>{t}</span>,
                    <span key={`x${i}`} className="text-dhe-magenta">×</span>,
                  ])}
              </div>
            </div>
          </div>

          {/* ── Navegação por Período e Sala ── */}
          <div className="space-y-3 mb-8">
            {PERIODS.map(({ label, keys, Icon: PIcon }) => {
              const periodTabs = TABS.filter((t) => keys.includes(t.key));
              return (
                <div key={label}>
                  {/* Label do período */}
                  <div className="flex items-center gap-2 mb-2">
                    <PIcon className="w-3.5 h-3.5 text-dhe-text-muted" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-dhe-text-muted">
                      {label}
                    </span>
                    <div className="flex-1 h-px bg-dhe-text-muted/10" />
                  </div>
                  {/* Pills da sala */}
                  <div className="flex flex-wrap gap-2 pl-5">
                    {periodTabs.map((tab) => {
                      const isActive = active === tab.key;
                      return (
                        <button
                          key={tab.key}
                          type="button"
                          onClick={() => setActive(tab.key)}
                          className="flex flex-col gap-0.5 rounded-2xl px-4 py-2.5 text-left transition-all duration-200 cursor-pointer border"
                          style={{
                            background: isActive ? tab.accent : "white",
                            borderColor: isActive ? tab.accent : "#D8D4C7",
                            boxShadow: isActive
                              ? `0 4px 18px ${tab.accent}28`
                              : "0 1px 4px rgba(12,37,64,0.05)",
                          }}
                        >
                          <div className="flex items-center gap-1.5">
                            <MapPin
                              className="w-3 h-3"
                              style={{ color: isActive ? "rgba(255,255,255,0.7)" : tab.accent }}
                            />
                            <span
                              className="text-[10px] font-bold whitespace-nowrap"
                              style={{ color: isActive ? "white" : "#1C2329" }}
                            >
                              {tab.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 pl-4">
                            <span
                              className="text-[8px] font-medium whitespace-nowrap"
                              style={{ color: isActive ? "rgba(255,255,255,0.6)" : "#596168" }}
                            >
                              {tab.sala}
                            </span>
                            <span
                              className="text-[8px] font-medium whitespace-nowrap"
                              style={{ color: isActive ? "rgba(255,255,255,0.5)" : "#9CA3AF" }}
                            >
                              {tab.time}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Grid da Agenda ── */}
          <div className="min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/* Indicador de sala ativa */}
                <div className="md:col-span-2 flex items-center gap-3 mb-1">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: activeTab.accent }}
                  />
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color: activeTab.accent }}>
                    {activeTab.period} · {activeTab.label}
                  </span>
                  <span className="text-[10px] text-dhe-text-muted">— {activeTab.time}</span>
                </div>

                {activeTab.items.map((item, i) => {
                  // Abertura e primeiro painel são featured (full width)
                  const featured =
                    i === 0 && (item.type === "abertura" || item.type === "filme");
                  return (
                    <AgendaCard
                      key={i}
                      item={item}
                      index={i}
                      accent={activeTab.accent}
                      featured={featured}
                    />
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
