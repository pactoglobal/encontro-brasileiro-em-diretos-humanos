import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

const ABOUT_ADHE = `A Aliança pelos Direitos Humanos e Empresas (ADHE) é uma plataforma multiator dedicada a fortalecer a implementação da agenda de Empresas e Direitos Humanos no Brasil, conectando empresas, organizações da sociedade civil, poder público e academia em torno de práticas responsáveis.`;


const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 90, damping: 16 } },
};

export function Organizers() {
  const [ref, inView] = useInView();

  return (
    <section id="organizadores" className="dhe-section-alt relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-dhe-green/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-dhe-magenta/4 rounded-full blur-3xl pointer-events-none" />

      <div className="dhe-container">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        >
          <p className="dhe-section-label">Realizadores</p>
          <div className="dhe-stripe-divider">
            <span /><span /><span /><span />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-dhe-navy mb-3">
            Organizadores e Parceiros
          </h2>
          <p className="text-base text-dhe-text-muted mb-10">
            Instituições que tornam este encontro possível
          </p>

          {inView && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {/* ─── CARD 1: ADHE — Realização (destaque escuro, col-span 1 full height) ─── */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="md:row-span-2 relative overflow-hidden rounded-[24px] p-8 flex flex-col justify-between cursor-default select-none group"
                style={{
                  background: "linear-gradient(145deg, #0C2540 0%, #0E2E50 100%)",
                  boxShadow: "0 20px 60px rgba(12,37,64,0.22)",
                  minHeight: "480px",
                }}
              >
                {/* Fita KV sutil no fundo */}
                <div className="absolute inset-0 opacity-[0.08] bg-cover bg-center bg-[url('/identity/kv-sem-fundo.png')]" />
                {/* Glow magenta no hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: "radial-gradient(ellipse at bottom center, rgba(232,24,122,0.18) 0%, transparent 70%)" }} />

                {/* Topo */}
                <div className="relative z-10">
                  <span className="inline-block text-[9px] font-black text-white/50 uppercase tracking-[0.28em] border border-white/12 px-3 py-1.5 rounded-full mb-8">
                    Realização
                  </span>

                  {/* Logo ADHE em destaque */}
                  <div className="mb-6">
                    <img
                      src="/identity/adhe-logo.png"
                      alt="ADHE — Aliança pelos Direitos Humanos e Empresas"
                      width={269}
                      height={95}
                      className="h-20 w-auto object-contain brightness-0 invert"
                    />
                  </div>

                  <p className="text-[#FAF9F6]/60 text-sm leading-relaxed">
                    {ABOUT_ADHE}
                  </p>
                </div>

                {/* Rodapé */}
                <div className="relative z-10 border-t border-white/10 pt-5 flex items-center justify-between mt-6">
                  <div className="flex gap-1.5">
                    {["#E8187A", "#4A8C3F", "#7B2D1E", "#E05A3A"].map((c) => (
                      <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
                    ))}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/50">adhe.org.br</span>
                </div>
              </motion.div>

              {/* ─── CARD 2: Co-realização — AMBOS os logos juntos ─── */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="relative overflow-hidden rounded-[24px] p-8 flex flex-col gap-6 cursor-default select-none group"
                style={{
                  background: "#FFFFFF",
                  boxShadow: "0 4px 24px rgba(12,37,64,0.07)",
                  border: "1px solid #D8D4C7",
                  minHeight: "220px",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-dhe-green/4 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <span className="inline-block text-[9px] font-black uppercase tracking-[0.24em] mb-6 text-dhe-green border border-dhe-green/20 px-3 py-1.5 rounded-full bg-dhe-green/5">
                    Co-realização
                  </span>

                  {/* Grid de parceiros individuais */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 items-center justify-items-center mt-2">
                    {[
                      { src: "/identity/logo-pacto-global.png", alt: "Pacto Global" },
                      { src: "/identity/co-realizacao-1.png", alt: "CERALC" },
                      { src: "/identity/direitos-humanos-onu.png", alt: "Nações Unidas Direitos Humanos" },
                      { src: "/identity/oit-logo-new.png", alt: "OIT" },
                      { src: "/identity/ocde-logo-new.png", alt: "OCDE" },
                      { src: "/identity/refugiados.png", alt: "ACNUR Refugiados" },
                      { src: "/identity/global-gateway-1.png", alt: "Global Gateway EU" },
                      { src: "/identity/global-gateway-2.png", alt: "Global Gateway" },
                      { src: "/identity/rede-mulher.png", alt: "Rede Mulher" },
                    ].map((logo, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-[#FAF9F6] border border-[#D8D4C7]/60 rounded-xl flex items-center justify-center shadow-sm w-full h-14 hover:bg-white hover:border-[#D8D4C7] transition-all duration-200"
                        title={logo.alt}
                      >
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className="h-full w-auto max-w-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* ─── CARD 3: Patrocínio Petrobras ─── */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="relative overflow-hidden rounded-[24px] p-8 flex flex-col justify-between cursor-default select-none group"
                style={{
                  background: "linear-gradient(135deg, #F1EFEA 0%, #E8E4DC 100%)",
                  border: "1px solid #D8D4C7",
                  boxShadow: "0 4px 24px rgba(12,37,64,0.06)",
                  minHeight: "220px",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#009A44]/5 via-transparent to-[#FFD100]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <span className="inline-block text-[9px] font-black uppercase tracking-[0.24em] text-dhe-maroon border border-dhe-maroon/20 px-3 py-1.5 rounded-full bg-dhe-maroon/5">
                      Patrocínio
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[#009A44]" />
                  </div>

                  {/* Logo Petrobras em destaque real */}
                  <img
                    src="/identity/petrobras-logo-new.png"
                    alt="Petrobras"
                    width={214}
                    height={64}
                    className="h-14 w-auto object-contain"
                  />
                </div>

                <div className="relative z-10 mt-4">
                  <p className="text-xs text-dhe-text-muted/70 leading-relaxed">
                    Apoio estratégico para um encontro nacional sobre sustentabilidade empresarial e direitos humanos.
                  </p>
                </div>
              </motion.div>

            </motion.div>
          )}

          {/* ─── Faixa de parceiro: Cinemateca ─── */}
          {inView && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.35 }}
              className="mt-5 relative overflow-hidden rounded-[24px] p-6 flex flex-col sm:flex-row items-center gap-6 cursor-default select-none group"
              style={{
                background: "linear-gradient(135deg, #7B2D1E 0%, #5C2016 100%)",
                boxShadow: "0 8px 32px rgba(123,45,30,0.2)",
              }}
            >
              <div className="absolute inset-0 opacity-[0.07] bg-cover bg-center bg-[url('/identity/kv-sem-fundo.png')]" />

              {/* Label */}
              <div className="relative z-10 shrink-0">
                <span className="inline-block text-[9px] font-black uppercase tracking-[0.24em] text-white/50 border border-white/15 px-3 py-1.5 rounded-full">
                  Parceiro — Local do Evento
                </span>
              </div>

              {/* Divisor vertical */}
              <div className="hidden sm:block h-10 w-px bg-white/15 shrink-0" />

              {/* Logo Cinemateca — fundo escuro então precisa invert */}
              <div className="relative z-10 flex items-center gap-4">
                <img
                  src="/identity/parceiro-cinemateca.png"
                  alt="Cinemateca Brasileira"
                  width={109}
                  height={68}
                  className="h-10 w-auto object-contain brightness-0 invert opacity-90"
                />
              </div>

              {/* Divisor vertical */}
              <div className="hidden sm:block h-10 w-px bg-white/15 shrink-0" />

              {/* Info de local */}
              <div className="relative z-10 flex-1">
                <p className="text-white font-black text-base font-display leading-none">Cinemateca Brasileira</p>
                <p className="text-white/50 text-xs mt-1">Largo Sen. Raul Cardoso, 207 — Vila Clementino · São Paulo, SP</p>
              </div>

              {/* Data badge */}
              <div className="relative z-10 shrink-0 text-right">
                <p className="text-white/60 text-[9px] font-black uppercase tracking-widest">Data</p>
                <p className="text-white font-display font-black text-sm">04 AGO 2026</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
