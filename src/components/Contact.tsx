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
      className="dhe-section-light relative overflow-hidden bg-[#F1EFEA] py-20 lg:py-24"
    >
      {/* Elementos decorativos do KV de forma sutil */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] overflow-hidden">
        <div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-dhe-magenta rounded-full blur-3xl"
        />
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-dhe-green rounded-full blur-3xl"
        />
      </div>

      <div className="dhe-container relative z-10" ref={ref as React.RefObject<HTMLDivElement>}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Rótulo da Seção */}
          <p className="dhe-section-label text-center">Inscrições</p>
          
          {/* Divisória do KV */}
          <div className="dhe-stripe-divider mx-auto justify-center">
            <span style={{ backgroundColor: "#E8187A" }} />
            <span style={{ backgroundColor: "#7B2D1E" }} />
            <span style={{ backgroundColor: "#4A8C3F" }} />
            <span style={{ backgroundColor: "#E05A3A" }} />
          </div>

          {/* Título Principal da Seção */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-dhe-navy mb-4">
            Participe do Encontro
          </h2>

          {/* Descrição */}
          <p className="text-base sm:text-lg text-dhe-text-muted leading-relaxed mb-10 max-w-2xl mx-auto">
            O I Encontro Brasileiro de Direitos Humanos e Empresas é{" "}
            <strong className="text-dhe-navy font-black">gratuito e credenciado</strong> para
            empresas, movimentos sociais, poder público e academia.
          </p>

          {/* Pills de Informação */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {[
              { Icon: CalendarDays, text: "04 de agosto de 2026" },
              { Icon: MapPin,       text: "Cinemateca Brasileira — São Paulo" },
              { Icon: Users,        text: "Entrada gratuita e credenciada" },
              { Icon: Sparkles,     text: "30+ painelistas confirmados" },
            ].map(({ Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-dhe-navy border border-dhe-border bg-white shadow-sm"
              >
                <Icon className="w-3.5 h-3.5 text-dhe-magenta" />
                {text}
              </span>
            ))}
          </div>

          {/* Botão de Ação */}
          <motion.a
            href={LP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-display font-black text-base uppercase tracking-wide cursor-pointer transition-all duration-300 shadow-md"
            style={{
              background: "#E8187A",
              color: "white",
              boxShadow: "0 6px 20px rgba(232,24,122,0.3)",
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 12px 36px rgba(232,24,122,0.45)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Tenho Interesse
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>

          {/* Rodapé e Contato */}
          <p className="text-xs text-dhe-text-muted mt-8 leading-relaxed">
            As inscrições são realizadas em plataforma própria externa.
            Dúvidas:{" "}
            <a
              href="mailto:rsvp@pactoglobal.org.br"
              className="text-dhe-magenta font-bold hover:underline transition-colors underline-offset-2"
            >
              rsvp@pactoglobal.org.br
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
