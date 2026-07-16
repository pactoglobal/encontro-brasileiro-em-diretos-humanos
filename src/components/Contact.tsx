import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { ArrowUpRight, CalendarDays, MapPin, Users, Sparkles } from "lucide-react";

// ── URL da Landing Page de Inscrição ──────────────────────────────────────────
const LP_URL = "https://go.pactoglobal.org.br/interesse-encontrobrasileiro-dhempresas2026";

export function Contact() {
  const [ref, inView] = useInView();

  return (
    <section
      id="contato"
      className="relative overflow-hidden py-20 lg:py-28"
      style={{ background: "#0C2540" }}
    >
      {/* Gradientes atmosféricos */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full blur-[140px] opacity-25"
          style={{ background: "radial-gradient(circle, #E8187A 0%, transparent 65%)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15"
          style={{ background: "radial-gradient(circle, #4A8C3F 0%, transparent 65%)" }}
        />
        {/* Grade sutil */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="dhe-container relative z-10">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 55, damping: 15 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Overline */}
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-6">
            Inscrições
          </p>

          {/* Título principal */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white leading-[1.05] mb-6">
            Participe do<br />
            <span style={{ color: "#E8187A" }}>Encontro</span>
          </h2>

          {/* Descrição */}
          <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
            O I Encontro Brasileiro de Direitos Humanos e Empresas é{" "}
            <strong className="text-white font-bold">gratuito e credenciado</strong> para
            empresas, movimentos sociais, poder público e academia.
          </p>

          {/* Pills de info */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {[
              { Icon: CalendarDays, text: "04 de agosto de 2026" },
              { Icon: MapPin,       text: "Cinemateca Brasileira — São Paulo" },
              { Icon: Users,        text: "Entrada gratuita e credenciada" },
              { Icon: Sparkles,     text: "30+ painelistas confirmados" },
            ].map(({ Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium text-white/60 border border-white/10"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <Icon className="w-3.5 h-3.5 text-white/30" />
                {text}
              </span>
            ))}
          </div>

          {/* CTA principal */}
          <motion.a
            href={LP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-display font-black text-base uppercase tracking-wide cursor-pointer transition-all duration-300"
            style={{
              background: "#E8187A",
              color: "white",
              boxShadow: "0 8px 32px rgba(232,24,122,0.35)",
            }}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 16px 48px rgba(232,24,122,0.5)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Quero me inscrever
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>

          {/* Nota secundária */}
          <p className="text-xs text-white/25 mt-6 leading-relaxed">
            As inscrições são realizadas em plataforma própria.
            Dúvidas:{" "}
            <a
              href="mailto:ana.urquiza@pactoglobal.org.br"
              className="text-white/40 hover:text-white/70 transition-colors underline underline-offset-2"
            >
              ana.urquiza@pactoglobal.org.br
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
