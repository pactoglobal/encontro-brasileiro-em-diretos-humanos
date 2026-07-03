import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

const ABOUT_ADHE = `A Aliança pelos Direitos Humanos e Empresas (ADHE) é uma plataforma multiator dedicada a fortalecer a implementação da agenda de Empresas e Direitos Humanos no Brasil, conectando empresas, organizações da sociedade civil, poder público e academia em torno de práticas responsáveis e do cumprimento de padrões internacionais.`;

const ABOUT_PACTO = `O Pacto Global – Rede Brasil foi criado em 2003 e é a segunda maior rede local do mundo, com mais de 2.000 participantes. Convocação especial do Secretário-Geral da ONU para que empresas de todo o mundo alinhem suas operações a dez princípios universais nas áreas de direitos humanos, trabalho, meio ambiente e anticorrupção.`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 90, damping: 16 },
  },
};

export function Organizers() {
  const [ref, inView] = useInView();

  return (
    <section id="organizadores" className="dhe-section-alt relative overflow-hidden">
      {/* Decorative blurry shape */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-dhe-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="dhe-container">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        >
          <p className="dhe-section-label">Realizadores</p>
          <div className="dhe-stripe-divider">
            <span />
            <span />
            <span />
            <span />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-dhe-navy mb-10">
            Organizadores e Parceiros
          </h2>

          {/* Bento Grid Principal */}
          {inView && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-5 grid-flow-row-dense"
            >
              {/* CARD 1: Realização ADHE — 2 colunas, 2 linhas (Destaque Máximo) */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 18 } }}
                className="lg:col-span-2 lg:row-span-2 relative overflow-hidden bg-dhe-navy border-2 border-dhe-navy rounded-2xl p-8 flex flex-col justify-between dhe-shadow-brutal group cursor-default select-none min-h-[280px]"
              >
                {/* KV pattern overlay */}
                <div className="absolute inset-0 opacity-[0.08] bg-cover bg-center bg-[url('/identity/kv-sem-fundo.png')]" />
                {/* Glow no hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-dhe-magenta/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <span className="inline-block text-[9px] font-black text-white/60 uppercase tracking-[0.28em] border border-white/20 px-3 py-1 rounded-md mb-6">
                    Realização
                  </span>
                  <img
                    src="/identity/adhe-logo.png"
                    alt="ADHE — Aliança pelos Direitos Humanos e Empresas"
                    className="h-16 w-auto object-contain mb-6 brightness-0 invert"
                  />
                  <p className="text-[#FAF9F6]/75 text-sm leading-relaxed max-w-sm">
                    {ABOUT_ADHE}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 relative z-10 flex items-center justify-between mt-6">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40">ADHE</span>
                  <div className="w-2 h-2 rounded-full bg-dhe-magenta animate-pulse" />
                </div>
              </motion.div>

              {/* CARD 2: Pacto Global — 2 colunas */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 18 } }}
                className="lg:col-span-2 relative overflow-hidden bg-white border-2 border-dhe-navy rounded-2xl p-6 flex flex-col justify-between dhe-shadow-brutal group cursor-default select-none min-h-[160px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-dhe-green/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <span className="inline-block text-[9px] font-black uppercase tracking-[0.28em] mb-4 text-dhe-green border border-dhe-green/30 px-3 py-1 rounded-md">
                    Co-realização Principal
                  </span>
                  <img
                    src="/identity/co-realizacao.png"
                    alt="Pacto Global Rede Brasil"
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <p className="text-[11px] text-dhe-text-muted leading-relaxed mt-4 relative z-10">
                  {ABOUT_PACTO.slice(0, 120)}…
                </p>
              </motion.div>

              {/* CARD 3: Co-realização logos — 2 colunas */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 18 } }}
                className="lg:col-span-2 relative overflow-hidden bg-[#F1EFEA] border-2 border-dhe-navy rounded-2xl p-6 flex flex-col justify-between dhe-shadow-brutal group cursor-default select-none min-h-[140px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-dhe-coral/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <span className="inline-block text-[9px] font-black uppercase tracking-[0.28em] mb-4 text-dhe-coral border border-dhe-coral/30 px-3 py-1 rounded-md">
                    Apoio Institucional Internacional
                  </span>
                  <img
                    src="/identity/co-realizacao-1.png"
                    alt="CERALC, Global Gateway, OIT, OCDE, ACNUDH"
                    className="h-10 w-auto max-w-full object-contain"
                  />
                </div>
              </motion.div>

              {/* CARD 4: Stamp Tipográfico — 1 coluna */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -6, rotate: -1, scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 18 } }}
                className="lg:col-span-1 relative overflow-hidden bg-dhe-magenta border-2 border-dhe-navy rounded-2xl p-6 flex flex-col justify-between dhe-shadow-brutal group cursor-default select-none min-h-[180px]"
              >
                <div className="absolute inset-0 opacity-[0.08] bg-cover bg-center bg-[url('/identity/kv-sem-fundo.png')]" />
                <div className="relative z-10">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60">Patrocínio</p>
                  <p className="text-2xl font-display font-black text-white leading-none uppercase mt-3 mb-4">Sustentabilidade em ação</p>
                  <img
                    src="/identity/petrobras-patrocinio.png"
                    alt="Petrobras"
                    className="h-10 w-auto object-contain brightness-0 invert"
                  />
                </div>
              </motion.div>

              {/* CARD 5: Parceiro Cinemateca — 1 coluna */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -6, rotate: 1, scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 18 } }}
                className="lg:col-span-1 relative overflow-hidden bg-dhe-maroon border-2 border-dhe-navy rounded-2xl p-6 flex flex-col justify-between dhe-shadow-brutal group cursor-default select-none min-h-[180px]"
              >
                <div className="absolute inset-0 opacity-[0.08] bg-cover bg-center bg-[url('/identity/kv-sem-fundo.png')]" />
                <div className="relative z-10">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60">Parceiro</p>
                  <p className="text-2xl font-display font-black text-white leading-none uppercase mt-3 mb-4">Local do Encontro</p>
                  <img
                    src="/identity/parceiro-cinemateca.png"
                    alt="Cinemateca Brasileira"
                    className="h-10 w-auto object-contain brightness-0 invert"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
