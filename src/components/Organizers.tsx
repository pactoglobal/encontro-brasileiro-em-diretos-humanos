import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

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
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="w-full relative overflow-hidden rounded-[32px] p-8 sm:p-10 lg:p-12"
              style={{
                background: "#FFFFFF",
                boxShadow: "0 16px 48px rgba(12,37,64,0.08)",
                border: "1px solid #D8D4C7",
              }}
            >
              {/* Subtle background ribbon decoration */}
              <div className="absolute inset-0 opacity-[0.03] bg-cover bg-center bg-[url('/identity/kv-sem-fundo.png')] pointer-events-none" />

              {/* Responsive Layout: grid on mobile, flex on desktop for organic flow */}
              <div className="relative z-10 flex flex-col lg:flex-row items-stretch gap-8 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[#D8D4C7]/60">
                
                {/* 1. REALIZAÇÃO */}
                <div className="flex flex-col gap-3 pb-6 lg:pb-0 lg:pr-8 lg:w-[22%]">
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] text-dhe-magenta">
                    Realização
                  </span>
                  <div className="h-12 flex items-center justify-start mt-2">
                    <img
                      src="/identity/adhe-logo.png"
                      alt="ADHE"
                      className="h-10 w-auto object-contain dhe-sponsor-logo"
                    />
                  </div>
                  <p className="text-xs text-dhe-text-muted/85 leading-relaxed mt-2">
                    Aliança pelos Direitos Humanos e Empresas
                  </p>
                </div>

                {/* 2. CORREALIZAÇÃO */}
                <div className="flex flex-col gap-3 pt-6 lg:pt-0 lg:px-8 lg:w-[38%]">
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] text-dhe-green">
                    Correalização
                  </span>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-5 mt-2">
                    <img
                      src="/identity/logo-pacto-global.png"
                      alt="Pacto Global"
                      className="h-7 w-auto object-contain dhe-sponsor-logo"
                    />
                    <div className="flex items-center gap-1.5 h-7 w-auto" title="Global Gateway">
                      <img src="/identity/global-gateway-1.png" alt="Global Gateway" className="h-full w-auto object-contain dhe-sponsor-logo" />
                      <img src="/identity/global-gateway-2.png" alt="União Europeia" className="h-full w-auto object-contain dhe-sponsor-logo" />
                    </div>
                    <img
                      src="/identity/direitos-humanos-onu.png"
                      alt="Direitos Humanos ONU"
                      className="h-8 w-auto object-contain dhe-sponsor-logo"
                    />
                    <img
                      src="/identity/oit-logo-new.png"
                      alt="OIT"
                      className="h-8 w-auto object-contain dhe-sponsor-logo"
                    />
                    <img
                      src="/identity/ocde-logo-new.png"
                      alt="OCDE"
                      className="h-7 w-auto object-contain dhe-sponsor-logo"
                    />
                  </div>
                </div>

                {/* 3. PATROCÍNIO */}
                <div className="flex flex-col gap-3 pt-6 lg:pt-0 lg:px-8 lg:w-[15%]">
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] text-dhe-navy">
                    Patrocínio
                  </span>
                  <div className="h-12 flex items-center justify-start mt-2">
                    <img
                      src="/identity/petrobras-logo-new.png"
                      alt="Petrobras"
                      className="h-8 w-auto object-contain dhe-sponsor-logo"
                    />
                  </div>
                </div>

                {/* 4. APOIO */}
                <div className="flex flex-col gap-3 pt-6 lg:pt-0 lg:px-8 lg:w-[15%]">
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] text-dhe-magenta">
                    Apoio
                  </span>
                  <div className="flex flex-wrap items-center gap-5 mt-2">
                    <img
                      src="/identity/rede-mulher.png"
                      alt="Rede Mulher Empreendedora"
                      className="h-7 w-auto object-contain dhe-sponsor-logo"
                    />
                    <img
                      src="/identity/refugiados.png"
                      alt="Fórum Empresas com Refugiados"
                      className="h-7 w-auto object-contain dhe-sponsor-logo"
                    />
                  </div>
                </div>

                {/* 5. PARCEIRO */}
                <div className="flex flex-col gap-3 pt-6 lg:pt-0 lg:pl-8 lg:w-[15%]">
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] text-dhe-maroon">
                    Parceiro
                  </span>
                  <div className="h-12 flex items-center justify-start mt-2">
                    <img
                      src="/identity/parceiro-cinemateca.png"
                      alt="Cinemateca Brasileira"
                      className="h-11 w-auto object-contain dhe-sponsor-logo"
                    />
                  </div>
                  <div className="mt-1 leading-tight">
                    <p className="text-xs font-bold text-dhe-navy">Cinemateca Brasileira</p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
