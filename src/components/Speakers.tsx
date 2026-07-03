import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

type Speaker = {
  name: string;
  role: string;
  org: string;
  accent: string;
};

const SPEAKERS: Speaker[] = [
  { name: "Fernanda Hopenhaym", role: "Membro", org: "UN Working Group on Business and Human Rights", accent: "#E8187A" },
  { name: "Vinicius Pinheiro", role: "Diretor", org: "OIT no Brasil", accent: "#4A8C3F" },
  { name: "Adriana Marcolino", role: "Especialista", org: "DIEESE", accent: "#7B2D1E" },
  { name: "Camila Zelezoglo", role: "Representante", org: "ABIT", accent: "#CC2222" },
  { name: "Jandyra Uehara", role: "Representante", org: "CUT", accent: "#E8187A" },
  { name: "Juliana Neiva", role: "Especialista", org: "Conectas", accent: "#4A8C3F" },
  { name: "Andrea Bolzon", role: "Especialista", org: "PNUD", accent: "#7B2D1E" },
  { name: "Luiz Henrique Ramos", role: "Secretário de Inspeção do Trabalho", org: "Ministério do Trabalho", accent: "#CC2222" },
  { name: "Gabriela Almeida", role: "Gerente", org: "Pacto Global – Rede Brasil", accent: "#E8187A" },
  { name: "Josefa Oliveira", role: "Representante", org: "Conselho Ribeirinho", accent: "#4A8C3F" },
  { name: "Gilson Camboim", role: "Presidente", org: "Coogavepe", accent: "#7B2D1E" },
  { name: "Larissa Rodrigues", role: "Especialista", org: "Instituto Escolhas", accent: "#CC2222" },
  { name: "Miguel Castro-Riberos", role: "Especialista", org: "OCDE", accent: "#E8187A" },
  { name: "Hernan Coronado", role: "Especialista de normas da AL", org: "OIT", accent: "#4A8C3F" },
  { name: "Thalita V. Gonçalves", role: "Defensora Pública", org: "Estado de São Paulo", accent: "#7B2D1E" },
  { name: "Flávia Scabin", role: "Professora e Pesquisadora", org: "FGV", accent: "#CC2222" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 90, damping: 15 },
  },
};

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  const initials = speaker.name.split(" ").map((n) => n[0]).slice(0, 2).join("");

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -6,
        scale: 1.02,
        boxShadow: "0 12px 30px rgba(12, 37, 64, 0.1)",
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="dhe-card-editorial p-5 flex flex-col gap-3 select-none"
    >
      {/* Avatar circular terroso */}
      <motion.div
        whileHover={{ rotate: 15, scale: 1.1 }}
        className="w-12 h-12 rounded-full flex items-center justify-center font-display font-black text-base text-white shrink-0"
        style={{
          background: `linear-gradient(135deg, ${speaker.accent}, ${speaker.accent}dd)`,
          border: `2px solid #F1EFEA`,
          boxShadow: `0 4px 10px ${speaker.accent}25`,
        }}
      >
        {initials}
      </motion.div>
      <div>
        <p className="text-sm font-bold text-dhe-navy leading-snug">{speaker.name}</p>
        <p className="text-xs font-bold mt-0.5" style={{ color: speaker.accent }}>
          {speaker.role}
        </p>
        <p className="text-[11px] mt-1 text-dhe-text-muted">
          {speaker.org}
        </p>
      </div>
    </motion.div>
  );
}

export function Speakers() {
  const [ref, inView] = useInView();

  return (
    <section id="palestrantes" className="dhe-section-alt relative overflow-hidden">
      {/* Padrão de Fitas do KV de fundo */}
      <div className="absolute inset-y-0 right-0 w-1/4 opacity-[0.03] pointer-events-none hidden lg:block" style={{ backgroundImage: 'url("/identity/kv-sem-fundo.png")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center' }} />

      <div className="dhe-container">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          className="mb-10"
        >
          <p className="dhe-section-label">Palestrantes Confirmados</p>
          <div className="dhe-stripe-divider">
            <span />
            <span />
            <span />
            <span />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-dhe-navy mb-3">
            Vozes que fazem a agenda
          </h2>
          <p className="text-base text-dhe-text-muted">
            Lideranças do setor privado, organismos internacionais, sociedade civil e academia
          </p>
        </motion.div>

        {inView && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {SPEAKERS.map((s) => (
              <SpeakerCard key={s.name} speaker={s} />
            ))}
          </motion.div>
        )}

        <p className="mt-8 text-xs text-center text-dhe-text-muted/60">
          * Lista parcial. TBC = a confirmar.
        </p>
      </div>
    </section>
  );
}
