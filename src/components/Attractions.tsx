import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "../hooks/useInView";

type Attraction = {
  name: string;
  role: string;
  org: string;
  theme: string;
  themeColor: string;
  themeBg: string;
  bgImage: string;
  initials: string;
  highlight?: string;
};

const ATTRACTIONS: Attraction[] = [
  {
    name: "Fernanda Hopenhaym",
    role: "Keynote Speaker",
    org: "UN Working Group on Business & Human Rights",
    theme: "Agenda Global ONU",
    themeColor: "#E8187A",
    themeBg: "rgba(232,24,122,0.12)",
    bgImage: "/identity/bg-carousel-1.jpg",
    initials: "FH",
    highlight: "Convidada Especial",
  },
  {
    name: "Vinicius Pinheiro",
    role: "Diretor OIT no Brasil",
    org: "Organização Internacional do Trabalho",
    theme: "Trabalho Decente",
    themeColor: "#4A8C3F",
    themeBg: "rgba(74,140,63,0.12)",
    bgImage: "/identity/bg-carousel-2.jpg",
    initials: "VP",
  },
  {
    name: "Luiz Henrique Ramos",
    role: "Secretário de Inspeção do Trabalho",
    org: "Ministério do Trabalho e Emprego",
    theme: "Política Pública",
    themeColor: "#0C2540",
    themeBg: "rgba(12,37,64,0.12)",
    bgImage: "/identity/bg-carousel-3.jpg",
    initials: "LR",
  },
  {
    name: "Flávia Scabin",
    role: "Professora e Pesquisadora",
    org: "FGV — Fundação Getúlio Vargas",
    theme: "Pesquisa & Academia",
    themeColor: "#7B2D1E",
    themeBg: "rgba(123,45,30,0.12)",
    bgImage: "/identity/bg-carousel-1.jpg",
    initials: "FS",
  },
  {
    name: "Josefa Oliveira",
    role: "Representante",
    org: "Conselho Ribeirinho",
    theme: "Territórios & CLPI",
    themeColor: "#4A8C3F",
    themeBg: "rgba(74,140,63,0.12)",
    bgImage: "/identity/bg-carousel-2.jpg",
    initials: "JO",
  },
  {
    name: "Andrea Bolzon",
    role: "Especialista",
    org: "PNUD — Programa das Nações Unidas",
    theme: "Desenvolvimento",
    themeColor: "#E05A3A",
    themeBg: "rgba(224,90,58,0.12)",
    bgImage: "/identity/bg-carousel-3.jpg",
    initials: "AB",
  },
  {
    name: "Miguel Castro-Riberos",
    role: "Especialista",
    org: "OCDE",
    theme: "Diretrizes Internacionais",
    themeColor: "#E8187A",
    themeBg: "rgba(232,24,122,0.12)",
    bgImage: "/identity/bg-carousel-1.jpg",
    initials: "MC",
  },
  {
    name: "Adriana Marcolino",
    role: "Especialista",
    org: "DIEESE",
    theme: "Relações de Trabalho",
    themeColor: "#CC2222",
    themeBg: "rgba(204,34,34,0.12)",
    bgImage: "/identity/bg-carousel-2.jpg",
    initials: "AM",
  },
];

function AttractionCard({ attraction, index }: { attraction: Attraction; index: number }) {
  const isFeatured = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 16, delay: index * 0.06 }}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 18 } }}
      className={`relative overflow-hidden rounded-[24px] flex-shrink-0 select-none cursor-default group dhe-glow-hover
        ${isFeatured ? "w-[340px] sm:w-[400px]" : "w-[280px] sm:w-[320px]"}
      `}
      style={{ minHeight: isFeatured ? "480px" : "380px" }}
    >
      {/* Foto de fundo com overlay escuro */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${attraction.bgImage})` }}
      />
      {/* Overlay gradiente de baixo para cima */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, rgba(12,37,64,0.92) 0%, rgba(12,37,64,0.55) 50%, rgba(12,37,64,0.2) 100%)`,
        }}
      />
      {/* Tint colorido no topo */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${attraction.themeColor}40 0%, transparent 40%)`,
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6">
        {/* Topo */}
        <div className="flex items-start justify-between">
          <span
            className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full dhe-glass"
            style={{ color: attraction.themeColor, backgroundColor: `${attraction.themeColor}20`, border: `1px solid ${attraction.themeColor}40` }}
          >
            {attraction.theme}
          </span>
          {attraction.highlight && (
            <span className="text-[9px] font-black uppercase tracking-widest text-white/95">
              {attraction.highlight}
            </span>
          )}
        </div>

        {/* Base */}
        <div>
          {/* Avatar tipográfico */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-lg text-white mb-4 dhe-glass"
            style={{ backgroundColor: `${attraction.themeColor}80`, border: `1px solid ${attraction.themeColor}60` }}
          >
            {attraction.initials}
          </div>

          <h3 className={`font-display font-black text-white leading-tight mb-1 ${isFeatured ? "text-2xl" : "text-xl"}`}>
            {attraction.name}
          </h3>
          <p className="text-sm font-bold mb-1" style={{ color: attraction.themeColor }}>
            {attraction.role}
          </p>
          <p className="text-xs text-white/95 leading-snug">{attraction.org}</p>

          {/* Linha divisória */}
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-[9px] font-black uppercase tracking-widest text-white/90">
              04 AGO 2026
            </span>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: attraction.themeColor }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Attractions() {
  const [ref, inView] = useInView();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 360;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  }, []);

  return (
    <section id="atracoes" className="dhe-section-light relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-dhe-magenta/5 rounded-full blur-3xl" />
        <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-dhe-green/5 rounded-full blur-3xl" />
      </div>

      <div className="dhe-container" ref={ref as React.RefObject<HTMLDivElement>}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-6"
        >
          <div>
            <p className="dhe-section-label">Atrações Confirmadas</p>
            <div className="dhe-stripe-divider">
              <span /><span /><span /><span />
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-dhe-navy">
              Quem vai estar lá
            </h2>
            <p className="text-base text-dhe-text-muted mt-2 max-w-lg">
              Especialistas internacionais, lideranças nacionais e representantes da sociedade civil
            </p>
          </div>

          {/* Controles de navegação */}
          <div className="flex gap-3 shrink-0">
            <motion.button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              whileHover={canScrollLeft ? { scale: 1.08 } : {}}
              whileTap={canScrollLeft ? { scale: 0.95 } : {}}
              className="w-11 h-11 rounded-full flex items-center justify-center border border-dhe-border bg-white shadow-sm transition-all duration-200 disabled:opacity-30"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 text-dhe-navy" strokeWidth={2} />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              whileHover={canScrollRight ? { scale: 1.08 } : {}}
              whileTap={canScrollRight ? { scale: 0.95 } : {}}
              className="w-11 h-11 rounded-full flex items-center justify-center bg-dhe-navy text-white shadow-sm transition-all duration-200 disabled:opacity-30"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Carrossel com scroll horizontal drag */}
      <AnimatePresence>
        {inView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Fade esquerda */}
            <div
              className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none transition-opacity duration-300"
              style={{
                background: "linear-gradient(to right, #F1EFEA, transparent)",
                opacity: canScrollLeft ? 1 : 0,
              }}
            />
            {/* Fade direita */}
            <div
              className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, #F1EFEA, transparent)" }}
            />

            <div
              ref={scrollRef}
              onScroll={updateScrollState}
              className="flex gap-5 overflow-x-auto pb-6 dhe-scroll-snap"
              style={{ paddingLeft: "calc(max(1.25rem, (100vw - 80rem) / 2 + 1.25rem))", paddingRight: "calc(max(1.25rem, (100vw - 80rem) / 2 + 1.25rem))" }}
            >
              {ATTRACTIONS.map((a, i) => (
                <AttractionCard key={a.name} attraction={a} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ticker de rodapé */}
      <div className="dhe-container mt-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-xs text-center text-dhe-text-muted"
        >
          * Lista parcial. Confirmações em andamento. TBC = a confirmar.
        </motion.p>
      </div>
    </section>
  );
}
