import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

// Slides com imagem + caption temático
const SLIDES = [
  {
    src: "/identity/bg-carousel-1.jpg",
    caption: "Diálogo Multiator",
    sub: "Empresas, sociedade civil e academia em torno de uma agenda comum",
  },
  {
    src: "/identity/bg-carousel-2.jpg",
    caption: "Sustentabilidade em Ação",
    sub: "Práticas responsáveis que transformam negócios e comunidades",
  },
  {
    src: "/identity/bg-carousel-3.jpg",
    caption: "Pluralidade que Constrói",
    sub: "Espaço de escuta, debate e construção coletiva de soluções",
  },
];

const TARGET_DATE = new Date("2026-08-04T09:00:00-03:00");

// Ken Burns: cada slide tem sua própria animação de câmera
const SLIDE_ANIMATIONS = [
  { initial: { scale: 1.12, x: "2%" },  animate: { scale: 1.0, x: "0%" } },
  { initial: { scale: 1.08, x: "-2%" }, animate: { scale: 1.0, x: "0%" } },
  { initial: { scale: 1.10, y: "2%" },  animate: { scale: 1.0, y: "0%" } },
];

// Logos de todas as organizações -ODS palette glassmorphism bento
const ORGANIZACOES = [
  // Realização
  { name: "ADHE", logo: "/identity/adhe-logo.png", tipo: "realizacao", alt: "Aliança pelos Direitos Humanos e Empresas" },
  // Co-realização
  { name: "Pacto Global ONU", logo: "/identity/logo-pacto-global.png", tipo: "corealizacao", alt: "Pacto Global Rede Brasil" },
  { name: "CERALC", logo: "/identity/co-realizacao-1.png", tipo: "corealizacao", alt: "Conduta Empresarial Responsável na AL e Caribe", lightBg: true },
  { name: "Direitos Humanos ONU", logo: "/identity/direitos-humanos-onu.png", tipo: "corealizacao", alt: "Nações Unidas Direitos Humanos" },
  // Parceiros Internacionais
  { name: "OIT", logo: "/identity/oit-logo-new.png", tipo: "parceiro-int", alt: "Organização Internacional do Trabalho" },
  { name: "PNUD", logo: null, tipo: "parceiro-int", alt: "Programa das Nações Unidas para o Desenvolvimento" },
  { name: "OCDE", logo: "/identity/ocde-logo-new.png", tipo: "parceiro-int", alt: "Organização para Cooperação e Desenvolvimento Econômico" },
  { name: "Global Gateway 1", logo: "/identity/global-gateway-1.png", tipo: "parceiro-int", alt: "Global Gateway" },
  { name: "Global Gateway 2", logo: "/identity/global-gateway-2.png", tipo: "parceiro-int", alt: "Global Gateway" },
  { name: "ACNUR Refugiados", logo: "/identity/refugiados.png", tipo: "parceiro-int", alt: "ACNUR Refugiados" },
  { name: "Rede Mulher", logo: "/identity/rede-mulher.png", tipo: "parceiro-int", alt: "Rede Mulher" },
  // Patrocinador
  { name: "Petrobras", logo: "/identity/petrobras-logo-new.png", tipo: "patrocinador", alt: "Petrobras" },
  // Parceiro Local
  { name: "Cinemateca", logo: "/identity/parceiro-cinemateca.png", tipo: "parceiro-local", alt: "Cinemateca Brasileira", lightBg: true },
];

// Mapeamento de cores por tipo (ODS palette)
const TIPO_COLORS: Record<string, { border: string; badge: string; badgeText: string }> = {
  realizacao:    { border: "#E8187A", badge: "rgba(232,24,122,0.15)", badgeText: "#E8187A" },
  corealizacao:  { border: "#0C2540", badge: "rgba(12,37,64,0.15)",  badgeText: "#0C2540" },
  "parceiro-int":  { border: "#2979FF", badge: "rgba(41,121,255,0.15)", badgeText: "#2979FF" },
  patrocinador:  { border: "#4A8C3F", badge: "rgba(74,140,63,0.15)",  badgeText: "#4A8C3F" },
  "parceiro-local":{ border: "#7B2D1E", badge: "rgba(123,45,30,0.15)",  badgeText: "#7B2D1E" },
  apoio:           { border: "#E8187A", badge: "rgba(232,24,122,0.15)", badgeText: "#E8187A" },
};

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  // Auto-advance a cada 6s
  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((p) => (p + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  // Countdown
  useEffect(() => {
    const calc = () => {
      const diff = TARGET_DATE.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        expired: false,
      });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, []);

  const goTo = useCallback((idx: number, _dir: number) => {
    setCurrent(idx);
  }, []);

  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length, -1), [current, goTo]);
  const next = useCallback(() => goTo((current + 1) % SLIDES.length, 1), [current, goTo]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  }, []);

  const slideAnim = SLIDE_ANIMATIONS[current];

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden flex flex-col">

      {/* ═══════════════════════════════════════════════════════
          BACKGROUND SLIDESHOW — fullscreen cinematográfico
      ═══════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            {/* Ken Burns na imagem */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${SLIDES[current].src})` }}
              initial={slideAnim.initial}
              animate={slideAnim.animate}
              transition={{ duration: 7.5, ease: "linear" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay em camadas: preserva cor do KV embaixo + escurecimento dramático */}
        {/* Camada 1: escurecimento geral */}
        <div className="absolute inset-0 bg-[#0C2540]/65" />
        {/* Camada 2: gradiente de baixo (onde fica o conteúdo principal) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C2540]/90 via-[#0C2540]/40 to-transparent" />
        {/* Camada 3: gradiente lateral esquerdo para texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C2540]/70 via-transparent to-transparent" />
        {/* Camada 4: tint de cor do KV — magenta sutil no topo direito */}
        <div className="absolute inset-0 bg-gradient-to-bl from-[#E8187A]/12 via-transparent to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════════════════
          FITAS DO KV — overlay sutil nas bordas
      ═══════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-y-0 left-0 w-1/4 opacity-[0.07] pointer-events-none hidden xl:block z-[1]"
        style={{ backgroundImage: 'url("/identity/kv-sem-fundo.png")', backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "left center" }}
      />

      {/* ═══════════════════════════════════════════════════════
          CONTROLES DO SLIDESHOW
      ═══════════════════════════════════════════════════════ */}
      {/*
        Controles manuais só no desktop (lg+): abaixo de 1024px o conteúdo
        empilhado ocupa quase toda a primeira tela, então qualquer ancoragem
        absoluta (mesmo em vh) sobrepõe texto/CTA real. No mobile/tablet o
        autoplay (6s) já conduz o slideshow — sem controles flutuando por cima
        do conteúdo. No desktop a section tem ~1 viewport de altura, então
        vh continua correto e mais robusto que top-1/2 caso o conteúdo cresça.
      */}
      <div className="hidden lg:flex absolute top-[46vh] -translate-y-1/2 right-2 sm:right-6 z-20 flex-col items-center gap-1 pointer-events-none">
        {/* Dots — alvo de toque de 44px mesmo com indicador visual fino */}
        <div className="flex flex-col">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className="pointer-events-auto flex items-center justify-center w-11 h-11 focus:outline-none"
              aria-label={`Slide ${i + 1}`}
            >
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width: "3px",
                  height: i === current ? "28px" : "8px",
                  background: i === current ? "#E8187A" : "rgba(255,255,255,0.35)",
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Setas prev/next — só desktop; 44px (mínimo recomendado de área de toque) */}
      <button
        type="button"
        onClick={prev}
        className="hidden lg:flex absolute left-4 sm:left-6 top-[46vh] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 items-center justify-center text-white transition-all duration-200 focus:outline-none"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={next}
        className="hidden lg:flex absolute right-14 sm:right-16 top-[46vh] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 items-center justify-center text-white transition-all duration-200 focus:outline-none"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* ═══════════════════════════════════════════════════════
          CONTEÚDO PRINCIPAL
      ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex-1 flex flex-col dhe-container pt-28 pb-20 lg:pt-36 lg:pb-28">

        <div className="flex-1 grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">

          {/* ── Coluna Esquerda: texto + CTA ── */}
          <div className="lg:col-span-7 flex flex-col gap-0">

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 80 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
                <span className="w-2 h-2 rounded-full bg-dhe-magenta animate-pulse" />
                I Fórum Brasileiro
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
                <span className="w-2 h-2 rounded-full bg-dhe-green" />
                Evento Gratuito
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 80 }}
              className="font-display font-black uppercase leading-[0.92] tracking-tight mb-5"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", color: "#FFFFFF" }}
            >
              Pluralidade<br />
              <span style={{ color: "#E8187A" }}>que Constrói</span>
            </motion.h1>

            {/* Subtítulo - TYPOGRAPHY: Increased for readability */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, type: "spring", stiffness: 80 }}
              className="text-base sm:text-lg text-white/75 leading-relaxed mb-6 max-w-xl"
            >
              O espaço nacional que conecta lideranças empresariais, sociedade civil,
              poder público e academia para debater Empresas e Direitos Humanos orientados à ação.
            </motion.p>

            {/* Event info pill row - TYPOGRAPHY: Increased text size */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, type: "spring", stiffness: 80 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {[
                { icon: Calendar, text: "04 de Agosto de 2026" },
                { icon: Clock, text: "9h às 19h30" },
                { icon: MapPin, text: "Cinemateca Brasileira · SP" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-full">
                  <Icon className="w-4 h-4 text-dhe-magenta shrink-0" strokeWidth={2} />
                  {text}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.40, type: "spring", stiffness: 80 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <button
                type="button"
                onClick={() => scrollTo("programacao")}
                className="dhe-btn-primary cursor-pointer"
              >
                Ver Programação
              </button>
              <button
                type="button"
                onClick={() => scrollTo("contato")}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white text-sm font-bold uppercase tracking-[0.08em] transition-all duration-200 cursor-pointer"
              >
                Tenho interesse
              </button>
            </motion.div>

            {/* Stats - TYPOGRAPHY: Increased sizes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 sm:gap-10 pt-6 border-t border-white/10"
            >
              {[
                { value: "30+", label: "Painelistas", color: "#E8187A" },
                { value: "10h+", label: "De Conteúdo", color: "#4A8C3F" },
                { value: "100%", label: "Gratuito", color: "#E05A3A" },
              ].map(({ value, label, color }) => (
                <div key={label} className="min-w-0">
                  <p className="text-3xl sm:text-4xl font-display font-black leading-none" style={{ color }}>{value}</p>
                  <p className="text-xs font-bold text-white/50 uppercase tracking-wider mt-2">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Coluna Direita: Countdown + Caption + Logos ── */}
          <div className="lg:col-span-5 flex flex-col gap-5 items-start lg:items-end">

            {/* Countdown - TYPOGRAPHY: Increased numbers */}
            {!timeLeft.expired && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, type: "spring", stiffness: 70 }}
                className="w-full"
              >
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/65 mb-3 lg:text-right">
                  Faltam para o evento
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { val: timeLeft.days, unit: "dias" },
                    { val: timeLeft.hours, unit: "horas" },
                    { val: timeLeft.minutes, unit: "min" },
                    { val: timeLeft.seconds, unit: "seg" },
                  ].map(({ val, unit }, i) => (
                    <div
                      key={unit}
                      className="flex flex-col items-center justify-center rounded-2xl py-4 px-2"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={`${unit}-${val}`}
                          initial={{ y: -12, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 12, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="text-2xl sm:text-3xl font-extrabold leading-none"
                          style={{ color: i === 3 ? "#E8187A" : "white" }}
                        >
                          {String(val).padStart(2, "0")}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/65 mt-2">{unit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Caption dinâmico do slide atual - GLASSMORPHISM */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, type: "spring", stiffness: 70 }}
              className="w-full rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-px bg-dhe-magenta" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-dhe-magenta">
                      {SLIDES[current].caption}
                    </span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {SLIDES[current].sub}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Progress bar */}
              <div className="mt-4 h-0.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  key={current}
                  className="h-full rounded-full bg-dhe-magenta"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                />
              </div>
            </motion.div>

            {/* ── BENTO GRID: Todos os Logos GLASSMORPHISM ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, type: "spring", stiffness: 70 }}
              className="w-full rounded-2xl p-4"
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/65 mb-3 lg:text-right">
                Realização · Co-realização · Parceiros
              </p>

              {/* Bento Grid responsivo - 3 colunas em desktop, 2 em mobile */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {ORGANIZACOES.map((org) => {
                  const colors = TIPO_COLORS[org.tipo] || TIPO_COLORS["parceiro-int"];
                  return (
                    <div
                      key={org.name}
                      className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl transition-all duration-200"
                      style={{
                        background: colors.badge,
                        borderBottom: `2px solid ${colors.border}`,
                      }}
                      title={org.alt}
                    >
                      {org.logo ? (
                        org.lightBg ? (
                          <div className="bg-white rounded-md px-2 py-1.5 mb-1 flex items-center justify-center">
                            <img
                              src={org.logo}
                              alt={org.alt}
                              width={96}
                              height={32}
                              className="h-5 sm:h-6 w-auto object-contain"
                              onError={(e) => {
                                e.currentTarget.parentElement!.style.display = "none";
                                e.currentTarget.closest("div.flex.flex-col")?.querySelector(".org-fallback")?.classList.remove("hidden");
                              }}
                            />
                          </div>
                        ) : (
                          <img
                            src={org.logo}
                            alt={org.alt}
                            width={96}
                            height={32}
                            className="h-6 sm:h-8 w-auto object-contain mb-1"
                            style={{ filter: "brightness(0) invert(1)" }}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              e.currentTarget.nextElementSibling?.classList.remove("hidden");
                            }}
                          />
                        )
                      ) : null}
                      {/* Badge textual: usado quando não há logo (org.logo === null) ou se a imagem falhar ao carregar */}
                      <span className={`org-fallback ${org.logo ? "hidden" : ""} text-[9px] font-bold text-white/70 text-center leading-tight`}>
                        {org.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Labels de categoria */}
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/10">
                <span className="text-[8px] font-bold uppercase tracking-wider px-2 py-1 rounded-full" style={{ background: "rgba(232,24,122,0.2)", color: "#E8187A" }}>Realização</span>
                <span className="text-[8px] font-bold uppercase tracking-wider px-2 py-1 rounded-full" style={{ background: "rgba(12,37,64,0.3)", color: "#FAF9F6" }}>Co-realização</span>
                <span className="text-[8px] font-bold uppercase tracking-wider px-2 py-1 rounded-full" style={{ background: "rgba(41,121,255,0.2)", color: "#2979FF" }}>Parceiros Int.</span>
                <span className="text-[8px] font-bold uppercase tracking-wider px-2 py-1 rounded-full" style={{ background: "rgba(74,140,63,0.2)", color: "#4A8C3F" }}>Patrocínio</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          BARRA INFERIOR — slide indicator + número
      ═══════════════════════════════════════════════════════ */}
      {/* Só desktop, mesmo motivo dos controles acima — no mobile o conteúdo
          real ocupa essa faixa de altura da tela. */}
      <div className="hidden lg:flex absolute top-[92vh] inset-x-0 z-10 dhe-container pb-6 items-center justify-between">
        {/* Número do slide */}
        <div className="flex items-baseline gap-1.5">
          <AnimatePresence mode="wait">
            <motion.span
              key={current}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="text-2xl font-display font-black text-white/50 tabular-nums leading-none"
            >
              {String(current + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
          <span className="text-xs text-white/40 font-bold">/ {String(SLIDES.length).padStart(2, "0")}</span>
        </div>

        {/* Barra de progresso horizontal */}
        <div className="flex-1 mx-6 sm:mx-8 flex gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className="flex-1 h-0.5 rounded-full overflow-hidden focus:outline-none"
              style={{ background: "rgba(255,255,255,0.15)" }}
              aria-label={`Ir para slide ${i + 1}`}
            >
              {i === current && (
                <motion.div
                  key={current}
                  className="h-full rounded-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                />
              )}
              {i < current && <div className="h-full w-full bg-white/60 rounded-full" />}
            </button>
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="hidden sm:flex flex-col items-center gap-1.5"
        >
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/30 rounded-full" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/45 rotate-90 origin-center translate-y-2">scroll</span>
        </motion.div>
      </div>
    </section>
  );
}