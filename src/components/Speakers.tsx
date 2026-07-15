import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

type Speaker = {
  name: string;
  role: string;
  org: string;
  accent: string;
  bg: string;
};

const SPEAKERS: Speaker[] = [
  { name: "Fernanda Hopenhaym", role: "Membro", org: "UN Working Group on Business and Human Rights", accent: "#E8187A", bg: "rgba(232,24,122,0.06)" },
  { name: "Vinicius Pinheiro", role: "Diretor", org: "OIT no Brasil", accent: "#4A8C3F", bg: "rgba(74,140,63,0.06)" },
  { name: "Adriana Marcolino", role: "Especialista", org: "DIEESE", accent: "#7B2D1E", bg: "rgba(123,45,30,0.06)" },
  { name: "Camila Zelezoglo", role: "Representante", org: "ABIT", accent: "#CC2222", bg: "rgba(204,34,34,0.06)" },
  { name: "Jandyra Uehara", role: "Representante", org: "CUT", accent: "#E8187A", bg: "rgba(232,24,122,0.06)" },
  { name: "Juliana Neiva", role: "Especialista", org: "Conectas", accent: "#4A8C3F", bg: "rgba(74,140,63,0.06)" },
  { name: "Andrea Bolzon", role: "Especialista", org: "PNUD", accent: "#7B2D1E", bg: "rgba(123,45,30,0.06)" },
  { name: "Luiz Henrique Ramos", role: "Secretário de Inspeção do Trabalho", org: "Ministério do Trabalho", accent: "#CC2222", bg: "rgba(204,34,34,0.06)" },
  { name: "Gabriela Almeida", role: "Gerente", org: "Pacto Global – Rede Brasil", accent: "#E8187A", bg: "rgba(232,24,122,0.06)" },
  { name: "Josefa Oliveira", role: "Representante", org: "Conselho Ribeirinho", accent: "#4A8C3F", bg: "rgba(74,140,63,0.06)" },
  { name: "Gilson Camboim", role: "Presidente", org: "Coogavepe", accent: "#7B2D1E", bg: "rgba(123,45,30,0.06)" },
  { name: "Larissa Rodrigues", role: "Especialista", org: "Instituto Escolhas", accent: "#CC2222", bg: "rgba(204,34,34,0.06)" },
  { name: "Miguel Castro-Riberos", role: "Especialista", org: "OCDE", accent: "#E8187A", bg: "rgba(232,24,122,0.06)" },
  { name: "Hernan Coronado", role: "Especialista de normas da AL", org: "OIT", accent: "#4A8C3F", bg: "rgba(74,140,63,0.06)" },
  { name: "Thalita V. Gonçalves", role: "Defensora Pública", org: "Estado de São Paulo", accent: "#7B2D1E", bg: "rgba(123,45,30,0.06)" },
  { name: "Flávia Scabin", role: "Professora e Pesquisadora", org: "FGV", accent: "#CC2222", bg: "rgba(204,34,34,0.06)" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 90, damping: 16 },
  },
};

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  const initials = speaker.name.split(" ").map((n) => n[0]).slice(0, 2).join("");

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 18 } }}
      className="dhe-card-editorial p-5 flex flex-col gap-3 select-none"
    >
      <motion.div
        whileHover={{ scale: 1.08, rotate: 8 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-11 h-11 rounded-full flex items-center justify-center font-display font-black text-sm text-white shrink-0"
        style={{
          background: `linear-gradient(135deg, ${speaker.accent}, ${speaker.accent}cc)`,
        }}
      >
        {initials}
      </motion.div>
      <div>
        <p className="text-sm font-bold text-dhe-navy leading-snug">{speaker.name}</p>
        <p className="text-sm font-bold mt-0.5" style={{ color: speaker.accent }}>
          {speaker.role}
        </p>
        <p className="text-xs mt-1 text-dhe-text-muted">{speaker.org}</p>
      </div>
    </motion.div>
  );
}

export function Speakers() {
  const [ref, inView] = useInView();

  return (
    <section id="palestrantes" className="dhe-section-alt relative overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-1/4 opacity-[0.035] pointer-events-none hidden lg:block"
        style={{ backgroundImage: 'url("/identity/kv-sem-fundo.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "right center" }} />

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
            <span /><span /><span /><span />
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
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 grid-flow-row-dense"
          >
            {/* Keynote Card — Fernanda Hopenhaym */}
            <motion.div
              variants={cardVariants}
              className="md:col-span-2 md:row-span-2 p-8 rounded-[20px] bg-dhe-navy text-[#FAF9F6] flex flex-col justify-between select-none relative overflow-hidden group shadow-[0_24px_64px_rgba(12,37,64,0.2)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 opacity-[0.06] bg-cover bg-center bg-[url('/identity/kv-sem-fundo.png')]" />
              <div className="flex justify-between items-start relative z-10">
                <span className="bg-dhe-magenta text-[9px] font-black text-white px-3 py-1 rounded-full uppercase tracking-[0.15em]">
                  Destaque ONU
                </span>
                <span className="text-[10px] font-black uppercase text-dhe-magenta tracking-widest">Keynote</span>
              </div>
              <div className="my-8 relative z-10">
                <p className="text-sm font-bold text-[#FAF9F6]/50 uppercase tracking-widest mb-1.5 font-display">Convidada Especial</p>
                <h3 className="text-3xl font-display font-black text-white leading-[1.05] mb-3">Fernanda Hopenhaym</h3>
                <p className="text-dhe-magenta font-black text-sm uppercase tracking-wider mb-2">Membro</p>
                <p className="text-xs text-[#FAF9F6]/70 leading-relaxed max-w-sm">
                  Grupo de Trabalho da ONU sobre Empresas e Direitos Humanos. Liderança internacional na formulação de diretrizes para cadeias globais de valor.
                </p>
              </div>
              <div className="border-t border-[#FAF9F6]/10 pt-4 relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-black tracking-widest text-[#FAF9F6]/60 uppercase">ONU</span>
                <div className="h-10 w-10 rounded-full bg-dhe-magenta/20 border border-dhe-magenta/40 flex items-center justify-center font-display font-black text-white text-xs">
                  FH
                </div>
              </div>
            </motion.div>

            {/* Render rest */}
            {SPEAKERS.map((s, index) => {
              if (index === 0) return null;
              const elements = [];

              if (index === 2) {
                elements.push(
                  <motion.div
                    key="stamp-agenda"
                    variants={cardVariants}
                    className="p-6 rounded-[20px] bg-dhe-magenta text-white flex flex-col justify-between select-none relative overflow-hidden md:col-span-1 min-h-[180px] shadow-[0_12px_40px_rgba(232,24,122,0.25)]"
                  >
                    <div className="absolute inset-0 opacity-[0.08] bg-cover bg-center bg-[url('/identity/kv-sem-fundo.png')]" />
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-70">Debate Nacional</p>
                    <p className="text-xl font-display font-black uppercase leading-none tracking-tight my-4">Empresas & Direitos Humanos</p>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-70">ADHE & Pacto Global</p>
                  </motion.div>
                );
              }

              if (index === 7) {
                elements.push(
                  <motion.div
                    key="stamp-local"
                    variants={cardVariants}
                    className="p-6 rounded-[20px] bg-dhe-green text-white flex flex-col justify-between select-none relative overflow-hidden md:col-span-1 min-h-[180px] shadow-[0_12px_40px_rgba(74,140,63,0.25)]"
                  >
                    <div className="absolute inset-0 opacity-[0.08] bg-cover bg-center bg-[url('/identity/kv-sem-fundo.png')]" />
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-70">Local do Evento</p>
                    <p className="text-xl font-display font-black uppercase leading-none tracking-tight my-4">Cinemateca Brasileira, SP</p>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-70">04 de Agosto, 2026</p>
                  </motion.div>
                );
              }

              elements.push(<SpeakerCard key={s.name} speaker={s} />);
              return elements;
            })}
          </motion.div>
        )}

        <p className="mt-8 text-xs text-center text-dhe-text-muted/50">
          * Lista parcial. TBC = a confirmar.
        </p>
      </div>
    </section>
  );
}
