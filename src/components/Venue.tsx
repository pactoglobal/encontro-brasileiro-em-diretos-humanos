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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 },
    },
  };

  return (
    <section id="local" className="dhe-section-light relative overflow-hidden">
      <div className="dhe-container">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
          >
            <p className="dhe-section-label">Local do Evento</p>
            <div className="dhe-stripe-divider">
              <span />
              <span />
              <span />
              <span />
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-black text-dhe-navy mb-2">
              Cinemateca Brasileira
            </h2>
            <p className="text-base text-dhe-text-muted mb-2">
              Largo Sen. Raul Cardoso, 207 — Vila Clementino
            </p>
            <p className="text-base text-dhe-text-muted mb-8">
              São Paulo – SP · CEP 04021-070
            </p>

            {/* Parceiro logo */}
            <div className="dhe-card-editorial p-5 mb-8 inline-flex flex-col gap-2 border-l-4 border-l-dhe-maroon bg-[#FBF9F6] shadow-sm select-none">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-dhe-maroon">Parceiro</p>
              <img
                src="/identity/parceiro-cinemateca.png"
                alt="Cinemateca Brasileira"
                className="h-10 w-auto object-contain"
                style={{ filter: "brightness(0.1)" }}
              />
            </div>

            {/* Como chegar */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-3"
            >
              {HOW_TO_GET.map(({ icon: Icon, label, desc }) => (
                <motion.div
                  key={label}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  className="dhe-card-editorial p-4 flex gap-4 items-start bg-white/50 backdrop-blur-sm"
                >
                  <div
                    className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-[#FAF9F6] border border-[#D8D4C7]/60 text-dhe-maroon"
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-dhe-navy">{label}</p>
                    <p className="text-xs mt-0.5 text-dhe-text-muted">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Mapa embed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.2 }}
            className="dhe-card-editorial overflow-hidden aspect-[4/3] border-2 shadow-lg"
          >
            <iframe
              title="Mapa Cinemateca Brasileira"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.2!2d-46.6370!3d-23.5968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59e1d79ec9b3%3A0x64b0bcb20e9e2b8!2sCinemateca%20Brasileira!5e0!3m2!1spt-BR!2sbr!4v1688000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
