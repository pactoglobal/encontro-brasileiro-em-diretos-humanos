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
      className="dhe-card-editorial p-5 flex flex-col gap-3 select-none border-2 border-dhe-navy dhe-shadow-brutal bg-white"
    >
      {/* Avatar circular terroso */}
      <motion.div
        whileHover={{ rotate: 15, scale: 1.1 }}
        className="w-12 h-12 rounded-full flex items-center justify-center font-display font-black text-base text-white shrink-0 border-2 border-dhe-navy"
        style={{
          background: `linear-gradient(135deg, ${speaker.accent}, ${speaker.accent}dd)`,
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
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 grid-flow-row-dense"
          >
            {/* Keynote Card 1: Fernanda Hopenhaym */}
            <motion.div
              variants={cardVariants}
              className="md:col-span-2 md:row-span-2 dhe-card-editorial p-8 bg-dhe-navy text-[#FAF9F6] border-2 border-dhe-navy flex flex-col justify-between select-none relative overflow-hidden group shadow-[6px_6px_0px_rgba(12,37,64,0.3)] hover:shadow-[12px_12px_0px_rgba(12,37,64,0.4)] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Pattern lines in background */}
              <div className="absolute inset-0 opacity-[0.05] bg-cover bg-center bg-[url('/identity/kv-sem-fundo.png')]" />
              <div className="flex justify-between items-start relative z-10">
                <span className="bg-dhe-magenta text-[9px] font-black text-white px-3 py-1 rounded-md uppercase tracking-[0.15em] shadow-sm">
                  Destaque ONU
                </span>
                <span className="text-[10px] font-black uppercase text-dhe-magenta tracking-widest">Keynote</span>
              </div>
              <div className="my-8 relative z-10">
                <p className="text-sm font-bold text-[#FAF9F6]/60 uppercase tracking-widest mb-1.5 font-display">Convidada Especial</p>
                <h3 className="text-3xl font-display font-black text-white leading-[1.05] mb-3">Fernanda Hopenhaym</h3>
                <p className="text-dhe-magenta font-black text-sm uppercase tracking-wider mb-2">Membro</p>
                <p className="text-xs text-[#FAF9F6]/80 leading-relaxed max-w-sm">
                  Grupo de Trabalho da ONU sobre Empresas e Direitos Humanos. Liderança internacional na formulação de diretrizes para cadeias globais de valor.
                </p>
              </div>
              <div className="border-t border-[#FAF9F6]/10 pt-4 relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-black tracking-widest text-[#FAF9F6]/50 uppercase">ONU</span>
                <div className="h-10 w-10 rounded-full bg-dhe-magenta/20 border border-dhe-magenta/40 flex items-center justify-center font-display font-black text-white text-xs">
                  FH
                </div>
              </div>
            </motion.div>

            {/* Render rest of speakers */}
            {SPEAKERS.map((s, index) => {
              if (index === 0) return null; // Skip Fernanda since she is Keynote card above
              
              const elements = [];

              // Inject stamp after Vinicius
              if (index === 2) {
                elements.push(
                  <motion.div
                    key="stamp-agenda"
                    variants={cardVariants}
                    className="dhe-card-editorial p-6 bg-dhe-magenta text-white border-2 border-dhe-navy flex flex-col justify-between select-none relative overflow-hidden dhe-shadow-brutal md:col-span-1 min-h-[180px]"
                  >
                    <div className="absolute inset-0 opacity-[0.08] bg-cover bg-center bg-[url('/identity/kv-sem-fundo.png')]" />
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80">Debate Nacional</p>
                    <p className="text-xl font-display font-black uppercase leading-none tracking-tight my-4">Empresas & Direitos Humanos</p>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-80">ADHE & Pacto Global</p>
                  </motion.div>
                );
              }

              // Inject stamp after Andrea Bolzon
              if (index === 7) {
                elements.push(
                  <motion.div
                    key="stamp-local"
                    variants={cardVariants}
                    className="dhe-card-editorial p-6 bg-dhe-green text-white border-2 border-dhe-navy flex flex-col justify-between select-none relative overflow-hidden dhe-shadow-brutal md:col-span-1 min-h-[180px]"
                  >
                    <div className="absolute inset-0 opacity-[0.08] bg-cover bg-center bg-[url('/identity/kv-sem-fundo.png')]" />
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80">Local do Evento</p>
                    <p className="text-xl font-display font-black uppercase leading-none tracking-tight my-4">Cinemateca Brasileira, SP</p>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-80">04 de Agosto, 2026</p>
                  </motion.div>
                );
              }

              elements.push(<SpeakerCard key={s.name} speaker={s} />);
              return elements;
            })}
          </motion.div>
        )}

        <p className="mt-8 text-xs text-center text-dhe-text-muted/60">
          * Lista parcial. TBC = a confirmar.
        </p>
      </div>
    </section>
  );
}
