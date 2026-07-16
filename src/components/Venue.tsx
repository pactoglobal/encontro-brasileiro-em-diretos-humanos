import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { MapPin, Train, Car, Navigation } from "lucide-react";

const HOW_TO_GET: { icon: typeof MapPin; label: string; desc: string }[] = [
  { icon: Train, label: "Metrô", desc: "Estação Vila Clementino (Linha 5-Lilás) · 8 min a pé" },
  { icon: Car, label: "Carro / App", desc: "Largo Sen. Raul Cardoso, 207 — Vila Clementino" },
  { icon: Navigation, label: "Ônibus", desc: "Diversas linhas passam pela Av. Domingos de Moraes e Av. 23 de Maio" },
];

export function Venue() {
  const [ref, inView] = useInView();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 },
    },
  };

  return (
    <section id="local" className="relative overflow-hidden py-20 lg:py-28" style={{ background: "#071828" }}>
      {/* Background gradients for premium mood */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[130px] opacity-15"
          style={{ background: "radial-gradient(circle, #E8187A 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-[130px] opacity-10"
          style={{ background: "radial-gradient(circle, #4A8C3F 0%, transparent 70%)" }}
        />
      </div>

      <div className="dhe-container relative z-10">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column: Info & Directions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="lg:col-span-6 flex flex-col"
          >
            <p className="dhe-section-label">Local do Evento</p>
            <div className="dhe-stripe-divider">
              <span />
              <span />
              <span />
              <span />
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-black mb-3" style={{ color: "#ffffff" }}>
              Cinemateca Brasileira
            </h2>
            <p className="text-sm sm:text-base text-white/80 font-medium">
              Largo Sen. Raul Cardoso, 207 — Vila Clementino
            </p>
            <p className="text-xs sm:text-sm text-white/60 mb-8">
              São Paulo – SP · CEP 04021-070
            </p>

            {/* Como chegar */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-4"
            >
              {HOW_TO_GET.map(({ icon: Icon, label, desc }) => (
                <motion.div
                  key={label}
                  variants={itemVariants}
                  className="rounded-2xl p-4.5 flex gap-4 items-start dhe-glass-dark dhe-glow-hover transition-all duration-300"
                >
                  <div
                    className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-dhe-magenta"
                  >
                    <Icon className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white leading-snug">{label}</p>
                    <p className="text-xs mt-1 text-white/70 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Premium Map with Inverted Filter & Space Partner logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            {/* Map wrapper with premium glass frame */}
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-[0_24px_50px_rgba(0,0,0,0.3)] aspect-[4/3] w-full relative">
              <iframe
                title="Mapa Cinemateca Brasileira"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.2!2d-46.6370!3d-23.5968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59e1d79ec9b3%3A0x64b0bcb20e9e2b8!2sCinemateca%20Brasileira!5e0!3m2!1spt-BR!2sbr!4v1688000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(100%) invert(90%) contrast(92%) brightness(95%)",
                  WebkitFilter: "grayscale(100%) invert(90%) contrast(92%) brightness(95%)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Space Partner Info Row */}
            <div className="flex items-center justify-between p-4.5 rounded-2xl border border-white/8 bg-white/[0.02] backdrop-blur-md">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#E8187A]">Parceiro de Espaço</p>
                <p className="text-xs font-bold mt-1" style={{ color: "#ffffff" }}>Cinemateca Brasileira</p>
              </div>
              <div className="px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                <img
                  src="/identity/parceiro-cinemateca.png"
                  alt="Cinemateca Brasileira"
                  className="h-16 w-auto object-contain brightness-0 invert opacity-95"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
