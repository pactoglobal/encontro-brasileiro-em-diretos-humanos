import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Globe2 } from "lucide-react";
import { useInView } from "../hooks/useInView";

import sudesteImg from "../assets/dialogos/sudeste/foto-2.jpg";
import centroOesteImg from "../assets/dialogos/centro-oeste/foto-3.jpg";
import sulImg from "../assets/dialogos/sul/foto-1.jpg";
import norteImg from "../assets/dialogos/norte/foto-1.jpg";
import nacionalImg from "../assets/dialogos/nacional/foto-1.jpg";

type Stop = {
  region: string;
  city: string;
  image?: string;
  note: string;
};

const STOPS: Stop[] = [
  { region: "Sudeste", city: "São Paulo", image: sudesteImg, note: "Diálogo regional em formato world café" },
  { region: "Centro-Oeste", city: "Brasília", image: centroOesteImg, note: "Sessão de trabalho entre empresas e sociedade civil" },
  { region: "Sul", city: "Curitiba", image: sulImg, note: "Discussão em mesas temáticas de DH e DEI" },
  { region: "Norte", city: "Manaus", image: norteImg, note: "Diálogo regional durante a Bioeconomy Amazon Summit" },
  { region: "Nordeste", city: "Recife", note: "Próxima etapa da rota — em preparação" },
  { region: "Encontro Nacional", city: "São Paulo", image: nacionalImg, note: "Síntese das cinco rodadas regionais" },
];

function StopCard({ stop, index }: { stop: Stop; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 16, delay: index * 0.06 }}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 18 } }}
      className="relative overflow-hidden rounded-[24px] flex-shrink-0 select-none w-[280px] sm:w-[320px] shadow-[0_16px_36px_rgba(0,0,0,0.35)] border border-white/5"
      style={{ minHeight: "380px" }}
    >
      {stop.image ? (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url(${stop.image})` }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0C2540]" style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 12px)" }}>
          <Globe2 className="w-12 h-12 text-white/15" strokeWidth={1.5} />
        </div>
      )}
      <div
        className="absolute inset-0"
        style={{
          background: stop.image
            ? "linear-gradient(to top, rgba(7,24,40,0.95) 0%, rgba(7,24,40,0.55) 40%, rgba(7,24,40,0.1) 70%, transparent 100%)"
            : "linear-gradient(to top, rgba(7,24,40,0.4) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 h-full flex flex-col justify-between p-6">
        <div className="flex items-start justify-between">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full dhe-glass text-dhe-magenta"
            style={{ backgroundColor: "rgba(232,24,122,0.15)", border: "1px solid rgba(232,24,122,0.35)" }}>
            {stop.region}
          </span>
          {!stop.image && (
            <span className="text-[9px] font-black uppercase tracking-widest text-white/70">Em breve</span>
          )}
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-white/80 mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-widest">{stop.city}</span>
          </div>
          <p className="text-sm text-white leading-snug font-medium">{stop.note}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Dialogues() {
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
    el.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" });
  }, []);

  return (
    <section id="dialogos" className="relative overflow-hidden py-20 lg:py-24" style={{ backgroundColor: "#0C2540" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-dhe-magenta/10 rounded-full blur-3xl" />
        <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-dhe-green/10 rounded-full blur-3xl" />
      </div>

      <div className="dhe-container relative z-10" ref={ref as React.RefObject<HTMLDivElement>}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-6"
        >
          <div className="max-w-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: "#E8187A" }}>
              Nossa Trajetória
            </p>
            <div className="dhe-stripe-divider">
              <span /><span /><span /><span />
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-3">
              Antes do Encontro: os Diálogos de DH e DEI
            </h2>
            <p className="text-base text-white/70 leading-relaxed">
              Desde o pontapé inicial na 69ª CSW, em Nova York, a Rede Brasil do Pacto Global vem
              percorrendo o país com os Diálogos de Direitos Humanos e Diversidade, Equidade e Inclusão:
              cinco encontros regionais em formato <em>world café</em> — Sudeste, Centro-Oeste, Sul, Norte
              e Nordeste — mais um Encontro Nacional em São Paulo. O objetivo é debater estratégias
              resilientes e conectadas aos ODS, e reunir direcionamentos para o Guia Orientador de
              Estratégias de DH &amp; DEI para empresas, com 2030 como horizonte.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <motion.button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              whileHover={canScrollLeft ? { scale: 1.08 } : {}}
              whileTap={canScrollLeft ? { scale: 0.95 } : {}}
              className="w-11 h-11 rounded-full flex items-center justify-center border border-white/15 bg-white/5 shadow-sm transition-all duration-200 disabled:opacity-30"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2} />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              whileHover={canScrollRight ? { scale: 1.08 } : {}}
              whileTap={canScrollRight ? { scale: 0.95 } : {}}
              className="w-11 h-11 rounded-full flex items-center justify-center bg-dhe-magenta text-white shadow-sm transition-all duration-200 disabled:opacity-30"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {inView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none transition-opacity duration-300"
              style={{ background: "linear-gradient(to right, #0C2540, transparent)", opacity: canScrollLeft ? 1 : 0 }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, #0C2540, transparent)" }}
            />

            <div
              ref={scrollRef}
              onScroll={updateScrollState}
              className="flex gap-5 overflow-x-auto pb-6 dhe-scroll-snap"
              style={{ paddingLeft: "calc(max(1.25rem, (100vw - 80rem) / 2 + 1.25rem))", paddingRight: "calc(max(1.25rem, (100vw - 80rem) / 2 + 1.25rem))" }}
            >
              {STOPS.map((s, i) => (
                <StopCard key={`${s.region}-${s.city}`} stop={s} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
