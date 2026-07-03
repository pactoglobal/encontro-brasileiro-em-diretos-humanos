import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";

const EVENT_DETAILS = [
  { icon: Calendar, label: "Data", value: "04 de Agosto de 2026", support: "Terça-feira" },
  { icon: Clock, label: "Horário", value: "9h às 19h30", support: "Dia completo" },
  { icon: MapPin, label: "Local", value: "Cinemateca Brasileira", support: "São Paulo, SP" },
];

// Target: 04 de agosto de 2026 às 09h00 (Horário de Brasília)
const TARGET_DATE = new Date("2026-08-04T09:00:00-03:00");

export function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const difference = TARGET_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, expired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  // Framer Motion Spring settings
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#F1EFEA] flex items-center pt-24 pb-16 lg:pt-32 lg:pb-24"
    >
      {/* Padrão de Fitas do KV nas laterais */}
      <div className="absolute inset-y-0 left-0 w-1/3 opacity-[0.07] pointer-events-none hidden lg:block" style={{ backgroundImage: 'url("/identity/kv-sem-fundo.png")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'left center' }} />
      <div className="absolute inset-y-0 right-0 w-1/3 opacity-[0.07] pointer-events-none hidden lg:block" style={{ backgroundImage: 'url("/identity/kv-sem-fundo.png")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center' }} />

      {/* Círculo gradiente suave ao fundo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#E8187A]/5 via-[#E05A3A]/5 to-[#4A8C3F]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Conteúdo Principal */}
      <div className="relative z-10 dhe-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* Coluna de Texto (Esquerda) */}
          <div className="lg:col-span-7 text-left">
            {/* Badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5 mb-6">
              <span className="dhe-badge-magenta text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-dhe-magenta" />
                I Fórum Brasileiro
              </span>
              <span className="dhe-badge-green text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-dhe-green" />
                Evento Gratuito
              </span>
            </motion.div>

            {/* Logo do Evento */}
            <motion.div variants={itemVariants} className="mb-6">
              <img
                src="/identity/logo-evento.png"
                alt="I Encontro DH&E Brasil 2026 — Pluralidade que Constrói"
                className="h-auto w-full max-w-[280px] sm:max-w-[340px] object-contain"
              />
            </motion.div>

            {/* Tagline Principal */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-dhe-navy uppercase leading-[0.95] tracking-tight mb-6"
            >
              Pluralidade <br />
              <span className="text-dhe-magenta">que Constrói</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-dhe-text-muted leading-relaxed mb-8 max-w-2xl"
            >
              O espaço nacional que conecta lideranças empresariais, sociedade civil,
              poder público e academia para debater Empresas e Direitos Humanos orientados à ação.
            </motion.p>

            {/* Countdown Interativo (SP Climate Week style) */}
            {!timeLeft.expired && (
              <motion.div
                variants={itemVariants}
                className="mb-8 flex items-center gap-3 select-none"
              >
                <div className="flex flex-col items-center justify-center bg-white border border-[#D8D4C7] p-3 min-w-[70px] sm:min-w-[85px] rounded-2xl shadow-sm">
                  <span className="text-2xl sm:text-4xl font-extrabold font-mono text-dhe-navy leading-none">
                    {timeLeft.days}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-dhe-text-muted mt-1.5 font-bold">dias</span>
                </div>
                <div className="text-2xl font-bold text-dhe-navy/40">:</div>
                <div className="flex flex-col items-center justify-center bg-white border border-[#D8D4C7] p-3 min-w-[70px] sm:min-w-[85px] rounded-2xl shadow-sm">
                  <span className="text-2xl sm:text-4xl font-extrabold font-mono text-dhe-navy leading-none">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-dhe-text-muted mt-1.5 font-bold">horas</span>
                </div>
                <div className="text-2xl font-bold text-dhe-navy/40">:</div>
                <div className="flex flex-col items-center justify-center bg-white border border-[#D8D4C7] p-3 min-w-[70px] sm:min-w-[85px] rounded-2xl shadow-sm">
                  <span className="text-2xl sm:text-4xl font-extrabold font-mono text-dhe-navy leading-none">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-dhe-text-muted mt-1.5 font-bold">minutos</span>
                </div>
                <div className="text-2xl font-bold text-dhe-navy/40">:</div>
                <div className="flex flex-col items-center justify-center bg-white border border-[#D8D4C7] p-3 min-w-[70px] sm:min-w-[85px] rounded-2xl shadow-sm">
                  <span className="text-2xl sm:text-4xl font-extrabold font-mono text-dhe-magenta leading-none">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-dhe-magenta mt-1.5 font-bold">segundos</span>
                </div>
              </motion.div>
            )}

            {/* Detalhes do Evento (Grid) */}
            <motion.div
              variants={itemVariants}
              className="grid sm:grid-cols-3 gap-4 mb-8 bg-white border border-[#D8D4C7] p-5 rounded-2xl shadow-sm"
            >
              {EVENT_DETAILS.map(({ icon: Icon, label, value, support }, i) => (
                <div
                  key={label}
                  className={`flex gap-3 items-start ${i < 2 ? "sm:border-r border-[#D8D4C7]/50 pr-4" : ""}`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F1EFEA] border border-[#D8D4C7]/40 text-dhe-magenta">
                    <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-wider text-dhe-text-muted">
                      {label}
                    </p>
                    <p className="mt-0.5 text-xs font-bold text-dhe-navy leading-snug">{value}</p>
                    <p className="text-[11px] text-dhe-text-muted">{support}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Botões de Ação */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => scrollTo("programacao")}
                className="dhe-btn-primary"
              >
                Ver Programação
              </button>
              <button
                type="button"
                onClick={() => scrollTo("contato")}
                className="dhe-btn-outline"
              >
                Inscreva-se
              </button>
            </motion.div>
          </div>

          {/* Coluna da Imagem KV (Direita) */}
          <div className="lg:col-span-5 flex justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.93, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.2 }}
              className="relative w-full max-w-[320px] sm:max-w-[420px] aspect-square rounded-[36px] bg-white border-2 border-[#D8D4C7] shadow-xl overflow-hidden p-6 flex items-center justify-center"
            >
              {/* Moldura de Fitas Coloridas Cruzadas */}
              <div className="absolute inset-0 bg-cover bg-center opacity-[0.25] bg-[url('/identity/kv-sem-fundo.png')]" />
              <img
                src="/identity/kv-sem-fundo.png"
                alt="Identidade Visual DH&E"
                className="w-full h-auto object-contain relative z-10 select-none pointer-events-none"
              />
            </motion.div>

            {/* Detalhe Flutuante */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.35 }}
              className="absolute -bottom-4 -left-4 bg-white border border-[#D8D4C7] px-5 py-3 rounded-2xl shadow-md hidden sm:block"
            >
              <p className="text-[9px] font-black uppercase tracking-widest text-dhe-magenta">Local do Encontro</p>
              <p className="text-sm font-bold text-dhe-navy">Cinemateca Brasileira</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
