import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";
import {
  Sun,
  Mic2,
  Leaf,
  Film,
  Music,
  Coffee,
  MessageCircle,
  Megaphone,
  Globe,
  Clapperboard,
  ChevronDown,
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

type Speaker = { name: string; role: string; avatar?: string };

type AgendaItem = {
  time: string;
  title: string;
  description?: string;
  speakers?: Speaker[];
  mediator?: Speaker;
  avatar?: string;
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
    avatar: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=120&h=120",
    type: "artistica",
  },
  {
    time: "9h15",
    title: "Abertura Institucional e Boas-vindas",
    type: "abertura",
    speakers: [
      { name: "Guilherme Xavier", role: "Diretor Executivo — Pacto Global Rede Brasil", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120&h=120" },
      { name: "Vinicius Pinheiro", role: "Diretor da OIT no Brasil", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120" },
      { name: "Ângela Pires", role: "ACNUDH", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120" },
      { name: "Miguel Castro-Riberos", role: "OCDE", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120" },
      { name: "Igor Garafulic", role: "Coordenador Residente da ONU no Brasil (vídeo)", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120" },
    ],
  },
  {
    time: "10h15",
    title: "Empresas e Direitos Humanos em um mundo em profunda transformação",
    type: "painel",
    speakers: [
      { name: "Fernanda Hopenhaym", role: "Membro do UN Working Group on Business and Human Rights (Vídeo)", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120&h=120" },
      { name: "Flavia Scabin", role: "Diretora do FGV CeDHE", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120" },
      { name: "Adriana Marcolino", role: "DIEESE", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120" },
      { name: "Camila Zelezoglo", role: "Gerente de Sustentabilidade e Inovação — ABIT", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120" },
    ],
  },
  {
    time: "11h15",
    title: "O que a agenda significa hoje, para quem faz sentido e como vem sendo implementada",
    type: "painel",
    speakers: [
      { name: "Sue Wolter", role: "Petrobras", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120" },
      { name: "Jandyra Uehara", role: "Secretária de Políticas Sociais e Direitos Humanos — CUT Nacional", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120" },
      { name: "Julia Neiva", role: "Conectas", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120&h=120" },
    ],
    mediator: { name: "Vinicius Pinheiro", role: "Diretor da OIT no Brasil", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120" },
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
    description: "Intervenção Artística Especial",
    avatar: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=120&h=120",
    type: "artistica",
  },
  {
    time: "14h15",
    title: "Consentimento Livre, Prévio e Informado (CLPI) na prática",
    type: "painel",
    speakers: [
      { name: "Hernan Coronado", role: "Especialista Regional Pueblos Indígenas — OIT", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120" },
      { name: "Uine Lopes", role: "Pescador e Professor — Movimento dos Pescadores Artesanais", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120" },
      { name: "Pedro Villela", role: "Gerente Executivo de Impacto Social — Axia Energia", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120&h=120" },
      { name: "Thalita Silva", role: "Defensora Pública do Estado de São Paulo", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120" },
      { name: "Josefa Camara", role: "Educadora Popular Beiradeira — Conselho Ribeirinho", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120" },
    ],
    mediator: { name: "Ângela Pires", role: "ACNUDH", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120&h=120" },
  },
  {
    time: "15h30",
    title: "Mineração para a transição energética: terras raras, minerais críticos e responsabilidade",
    type: "painel",
    speakers: [
      { name: "Maryellen Crisóstomo", role: "CONAQ — Set Setting (10 min)", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120" },
      { name: "João Marcos Pires Camargo", role: "Diretor de Política e Planejamento Mineral — MME", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120" },
      { name: "Gilson Camboim", role: "Presidente da Coogavepe", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120" },
      { name: "Miguel Castro-Riberos", role: "OCDE", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120" },
    ],
    mediator: { name: "Simone Rocha", role: "Sócia da ERM América Latina — Direitos Humanos e Impacto Social", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120&h=120" },
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
      { name: "Andrea Bolzon", role: "PNUD", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120" },
      { name: "Luiz Henrique Ramos", role: "Secretário de Inspeção do Trabalho — MTE", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120" },
      { name: "Gabriela Almeida", role: "Pacto Global da ONU – Rede Brasil / BHR Gap Analysis", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120" },
    ],
    mediator: { name: "Flávia Scabin", role: "FGV", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120&h=120" },
  },
  {
    time: "15h30",
    title: "Agroindústria, direitos humanos e cadeias de valor: responsabilidade e desafios",
    type: "painel",
    speakers: [
      { name: "Gabriel Bezerra", role: "Presidente da CONTAR", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120" },
      { name: "Irina Bacci", role: "PADF", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120" },
      { name: "Marcos Antônio Matos", role: "Diretor Cecafe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120&h=120" },
    ],
    mediator: { name: "Juliana Ramalho", role: "Mattos Filho — Coordenadora da Plataforma de Ação pelos DH do Pacto Global", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120&h=120" },
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
    title: "Exibição do Filme",
    description: '"A Melhor Mãe do Mundo"',
    avatar: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=120&h=120",
    type: "filme",
  },
  {
    time: "19h20 – 20h",
    title: "Bate Papo: Economia Circular, Direitos Humanos e Autonomia das Mulheres",
    description: "Construindo cadeias produtivas livres de violência e exclusão",
    type: "batepapo",
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
  textAccent: string;
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
    textAccent: "#FF5DAB",
    items: MANHA_GRANDE_OTELO,
  },
  {
    key: "manha-foyer",
    label: "Foyer Grande Otelo",
    sala: "Rodas de Conversa",
    period: "Manhã",
    time: "10h – 12h",
    accent: "#7B2D1E",
    textAccent: "#FF8A71",
    items: MANHA_FOYER,
  },
  {
    key: "tarde-grande",
    label: "Sala Grande Otelo",
    sala: "Painéis Simultâneos",
    period: "Tarde",
    time: "14h – 17h",
    accent: "#4A8C3F",
    textAccent: "#84E079",
    items: TARDE_GRANDE_OTELO,
  },
  {
    key: "tarde-oscarito",
    label: "Sala Oscarito",
    sala: "Painéis Simultâneos",
    period: "Tarde",
    time: "14h15 – 17h",
    accent: "#0C2540",
    textAccent: "#38BDF8",
    items: TARDE_OSCARITO,
  },
  {
    key: "tarde-foyer",
    label: "Foyer Grande Otelo",
    sala: "Rodas de Conversa",
    period: "Tarde",
    time: "13h – 16h20",
    accent: "#E05A3A",
    textAccent: "#FF9E85",
    items: TARDE_FOYER,
  },
  {
    key: "encerramento",
    label: "Encerramento",
    sala: "Filme e Debate",
    period: "Encerramento",
    time: "17h20 – 20h",
    accent: "#596168",
    textAccent: "#CBD5E1",
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

// ─── Grupos de tabs por período ───────────────────────────────────────────────

const PERIODS = [
  { label: "Manhã", keys: ["manha-grande", "manha-foyer"] as TabKey[], Icon: Sun },
  { label: "Tarde", keys: ["tarde-grande", "tarde-oscarito", "tarde-foyer"] as TabKey[], Icon: Leaf },
  { label: "Encerramento", keys: ["encerramento"] as TabKey[], Icon: Film },
];

// ─── Speaker Avatar Helper ───────────────────────────────────────────────────

function SpeakerAvatar({ name, avatar, accent }: { name: string; avatar?: string; accent: string }) {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        className="w-11 h-11 rounded-full object-cover shrink-0 border-2"
        style={{ borderColor: "rgba(255,255,255,0.12)" }}
      />
    );
  }
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className="w-11 h-11 rounded-full flex items-center justify-center font-display font-black text-xs text-white shrink-0 border-2"
      style={{
        background: `linear-gradient(135deg, ${accent}dd, ${accent}77)`,
        borderColor: "rgba(255,255,255,0.12)",
      }}
    >
      {initials}
    </div>
  );
}

// ─── Timeline Item ────────────────────────────────────────────────────────────

function TimelineItem({
  item,
  index,
  accent,
  isLast,
}: {
  item: AgendaItem;
  index: number;
  accent: string;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);
  const meta = TYPE_META[item.type];
  const hasSpeakers = item.speakers && item.speakers.length > 0;
  const isBreak = item.type === "intervalo";
  const isClosing = item.type === "encerramento";

  // ── Evento especial (intervalo / encerramento) — linha discreta
  if (isBreak || isClosing) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="flex items-center gap-4 py-3"
      >
        {/* Dot na linha do tempo */}
        <div className="relative flex-shrink-0 w-5 flex flex-col items-center">
          <div
            className="w-2 h-2 rounded-full border border-white/20"
            style={{ background: "rgba(255,255,255,0.12)" }}
          />
          {!isLast && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-px h-10 bg-white/8" />
          )}
        </div>
        <div className="flex items-center gap-3 flex-1 py-2 px-4 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
          <meta.Icon className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
          <span className="text-[10px] font-black tabular-nums" style={{ color: accent }}>{item.time}</span>
          <span className="text-xs text-white font-black">{item.title}</span>
          {item.description && (
            <span className="text-[10px] text-white/60 italic font-medium">{item.description}</span>
          )}
        </div>
      </motion.div>
    );
  }

  // ── Card principal ──
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 70, damping: 16, delay: index * 0.07 }}
      className="flex gap-4 group"
    >
      {/* Coluna da timeline */}
      <div className="relative flex-shrink-0 w-5 flex flex-col items-center pt-5">
        <motion.div
          className="w-2.5 h-2.5 rounded-full shrink-0 z-10"
          style={{
            background: accent,
            outline: `2px solid ${accent}`,
            outlineOffset: "2px",
          }}
          whileHover={{ scale: 1.4 }}
        />
        {!isLast && (
          <div
            className="absolute top-8 left-1/2 -translate-x-1/2 w-px flex-1 bottom-0"
            style={{ background: `linear-gradient(to bottom, ${accent}40, transparent)` }}
          />
        )}
      </div>

      {/* Card */}
      <div
        className="flex-1 mb-6 rounded-2xl overflow-hidden border border-white/8 transition-all duration-300 group-hover:border-white/15"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
        }}
      >
        {/* Header do card */}
        <div className="p-5 pb-4">
          {/* Badge + hora */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <span
              className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border"
              style={{
                background: `${accent}18`,
                color: accent,
                borderColor: `${accent}30`,
              }}
            >
              <meta.Icon className="w-2.5 h-2.5" />
              {meta.label}
            </span>
            <span className="text-[11px] font-black tabular-nums" style={{ color: accent }}>
              {item.time}
            </span>
          </div>

          {/* Título */}
          <h3 className="text-sm font-display font-black leading-snug mb-2" style={{ color: "#ffffff" }}>
            {item.title}
          </h3>

          {/* Descrição */}
          {item.description && item.type !== "artistica" && item.type !== "filme" && (
            <p className="text-xs leading-relaxed text-white/85">{item.description}</p>
          )}

          {/* Foto/Perfil da atração artística diretamente no corpo do card */}
          {(item.type === "artistica" || item.type === "filme") && item.avatar && (
            <div className="flex items-center gap-3.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] mt-3.5 max-w-xs hover:bg-white/[0.04] transition-all duration-200">
              <SpeakerAvatar name={item.description || item.title} avatar={item.avatar} accent={accent} />
              <div className="min-w-0">
                <span className="text-xs font-bold text-white block leading-snug truncate">
                  {item.description || "Atração Convidada"}
                </span>
                <span className="text-[10px] text-white/60 font-medium leading-normal block mt-0.5">
                  {item.type === "filme" ? "Exibição Cinematográfica" : "Apresentação Cultural"}
                </span>
              </div>
            </div>
          )}

          {/* Palestrantes — expandível */}
          <AnimatePresence>
            {open && hasSpeakers && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } }
                  }}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/8"
                >
                  {item.speakers!.map((s, si) => (
                    <motion.div
                      key={si}
                      variants={{
                        hidden: { opacity: 0, y: 8 },
                        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                      }}
                      className="flex items-center gap-3.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all duration-200"
                    >
                      <SpeakerAvatar name={s.name} avatar={s.avatar} accent={accent} />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-white block leading-snug truncate">{s.name}</span>
                        <span className="text-[10px] text-white/60 font-medium leading-normal block mt-0.5 line-clamp-2">{s.role}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Mediação */}
                {item.mediator && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: item.speakers!.length * 0.05 + 0.1 }}
                    className="mt-4 pt-4 border-t border-white/8"
                  >
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/60 block mb-2">Mediação</span>
                    <div className="flex items-center gap-3.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] max-w-sm hover:bg-white/[0.04] transition-all duration-200">
                      <SpeakerAvatar name={item.mediator.name} avatar={item.mediator.avatar} accent={accent} />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-white block leading-snug truncate">{item.mediator.name}</span>
                        <span className="text-[10px] text-white/60 font-medium leading-normal block mt-0.5 line-clamp-2">{item.mediator.role}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer — expand button */}
        {hasSpeakers && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-full flex items-center justify-between px-5 py-3 cursor-pointer transition-all duration-300 group/btn hover:bg-white/[0.02]"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              background: open ? "rgba(255,255,255,0.03)" : "transparent",
            }}
          >
            <div className="flex items-center gap-2">
              {/* Stack de Avatares preview */}
              <div className="flex -space-x-1.5 mr-1.5">
                {item.speakers!.slice(0, 3).map((s, idx) => (
                  <div
                    key={idx}
                    className="w-5.5 h-5.5 rounded-full border overflow-hidden shrink-0"
                    style={{ borderColor: "#071828" }}
                  >
                    {s.avatar ? (
                      <img src={s.avatar} alt={s.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[6px] font-black text-white" style={{ background: accent }}>
                        {s.name.split(" ").map(n => n[0]).slice(0,2).join("").toUpperCase()}
                      </div>
                    )}
                  </div>
                ))}
                {item.speakers!.length > 3 && (
                  <div
                    className="w-5.5 h-5.5 rounded-full border flex items-center justify-center text-[7px] font-black text-white bg-white/10 shrink-0"
                    style={{ borderColor: "#071828" }}
                  >
                    +{item.speakers!.length - 3}
                  </div>
                )}
              </div>

              <span className="text-[9px] font-black uppercase tracking-[0.15em] text-white/70 group-hover/btn:text-white transition-colors duration-200">
                {open ? "Ocultar painelistas" : `Ver ${item.speakers!.length} painelistas`}
              </span>
            </div>

            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="p-1 rounded-full bg-white/5 border border-white/10 group-hover/btn:border-white/20 group-hover/btn:bg-white/10 transition-all duration-200"
            >
              <ChevronDown className="w-3 h-3 text-white/70" />
            </motion.div>
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function Agenda() {
  const [active, setActive] = useState<TabKey>("manha-grande");
  const [ref, inView] = useInView();

  const activeTab = TABS.find((t) => t.key === active)!;

  return (
    <section
      id="programacao"
      className="relative overflow-hidden py-20 lg:py-28"
      style={{ background: "#071828" }}
    >
      {/* Gradientes de fundo */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{ background: "radial-gradient(circle, #E8187A 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
          style={{ background: "radial-gradient(circle, #4A8C3F 0%, transparent 70%)" }}
        />
        {/* Grade sutil */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="dhe-container relative z-10">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        >
          {/* ── Header ── */}
          <div className="mb-12">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-3">
              Programação
            </p>
            <div className="flex items-end justify-between flex-wrap gap-6">
              <div>
                <h2 className="text-4xl sm:text-5xl font-display font-black leading-none mb-4" style={{ color: "#ffffff" }}>
                  Agenda<br />
                  <span style={{ color: "#E8187A" }}>do Evento</span>
                </h2>
                <div className="flex flex-wrap items-center gap-5">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-white/30" />
                    <span className="text-sm text-white/50">04 de agosto de 2026 · 9h às 20h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-white/30" />
                    <span className="text-sm text-white/50">Cinemateca Brasileira, São Paulo</span>
                  </div>
                </div>
              </div>
              {/* Pill de data em destaque */}
              <div
                className="hidden lg:flex flex-col items-center justify-center px-8 py-4 rounded-2xl border border-white/10"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <span className="text-3xl font-display font-black text-white leading-none">04</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">AGO 2026</span>
              </div>
            </div>
          </div>

          {/* ── Layout em duas colunas: nav esquerda + timeline direita ── */}
          <div className="flex flex-col lg:flex-row gap-10">

            {/* ── Sidebar de Navegação ── */}
            <aside className="lg:w-56 xl:w-64 flex-shrink-0">
              <div className="lg:sticky lg:top-24 space-y-6">
                {PERIODS.map(({ label, keys, Icon: PIcon }) => {
                  const periodTabs = TABS.filter((t) => keys.includes(t.key));
                  const isPeriodActive = keys.includes(active);
                  return (
                    <div key={label}>
                      {/* Cabeçalho do período */}
                      <div className="flex items-center gap-2 mb-3">
                        <PIcon
                          className="w-3.5 h-3.5"
                          style={{ color: isPeriodActive ? "#E8187A" : "rgba(255,255,255,0.45)" }}
                        />
                        <span
                          className="text-[9px] font-black uppercase tracking-[0.25em]"
                          style={{ color: isPeriodActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)" }}
                        >
                          {label}
                        </span>
                      </div>

                      {/* Botões de sala */}
                      <div className="space-y-1.5 pl-5">
                        {periodTabs.map((tab) => {
                          const isActive = active === tab.key;
                          return (
                            <button
                              key={tab.key}
                              type="button"
                              onClick={() => setActive(tab.key)}
                              className="w-full text-left px-3.5 py-3 rounded-xl transition-all duration-200 cursor-pointer border"
                              style={{
                                background: isActive ? `${tab.accent}18` : "transparent",
                                borderColor: isActive ? `${tab.accent}40` : "transparent",
                              }}
                            >
                              <div
                                className="text-xs font-bold leading-tight block mb-0.5"
                                style={{ color: isActive ? "white" : "rgba(255,255,255,0.65)" }}
                              >
                                {tab.label}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span
                                  className="text-[9px] font-medium"
                                  style={{ color: isActive ? tab.textAccent : "rgba(255,255,255,0.45)" }}
                                >
                                  {tab.sala}
                                </span>
                                <span className="text-[8px] text-white/30">·</span>
                                <span className="text-[9px] text-white/50">{tab.time}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>

            {/* ── Timeline de Itens ── */}
            <div className="flex-1 min-w-0">
              {/* Cabeçalho da aba ativa */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Indicador de contexto */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-6 h-px" style={{ background: activeTab.textAccent }} />
                    <span
                      className="text-[9px] font-black uppercase tracking-[0.25em]"
                      style={{ color: activeTab.textAccent }}
                    >
                      {activeTab.period}
                    </span>
                    <span className="text-[9px] text-white/70 font-black uppercase tracking-widest">
                      {activeTab.label}
                    </span>
                    <span className="text-[9px] text-white/30">·</span>
                    <span className="text-[9px] text-white/60">{activeTab.time}</span>
                  </div>

                  {/* Lista de itens em timeline */}
                  <div>
                    {activeTab.items.map((item, i) => (
                      <TimelineItem
                        key={i}
                        item={item}
                        index={i}
                        accent={activeTab.textAccent}
                        isLast={i === activeTab.items.length - 1}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
