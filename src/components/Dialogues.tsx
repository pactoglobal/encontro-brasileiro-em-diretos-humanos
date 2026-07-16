import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { MapPin, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "../hooks/useInView";

// Nacional
import nac1 from "../assets/dialogos/nacional/foto-1.jpg";
import nac2 from "../assets/dialogos/nacional/foto-2.jpg";
import nac3 from "../assets/dialogos/nacional/foto-3.jpg";
import nac4 from "../assets/dialogos/nacional/foto-4.jpg";
import nac5 from "../assets/dialogos/nacional/foto-5.jpg";
// Sudeste
import se1 from "../assets/dialogos/sudeste/foto-1.jpg";
import se2 from "../assets/dialogos/sudeste/foto-2.jpg";
import se3 from "../assets/dialogos/sudeste/foto-3.jpg";
// Centro-Oeste
import co1 from "../assets/dialogos/centro-oeste/foto-1.jpg";
import co2 from "../assets/dialogos/centro-oeste/foto-2.jpg";
import co3 from "../assets/dialogos/centro-oeste/foto-3.jpg";
// Sul
import sul1 from "../assets/dialogos/sul/foto-1.jpg";
import sul2 from "../assets/dialogos/sul/foto-2.jpg";
import sul3 from "../assets/dialogos/sul/foto-3.jpg";
// Norte
import nor1 from "../assets/dialogos/norte/foto-1.jpg";
import nor2 from "../assets/dialogos/norte/foto-2.jpg";
import nor3 from "../assets/dialogos/norte/foto-3.jpg";
// Nordeste
import ne1 from "../assets/dialogos/nordeste/foto-1.jpg";
import ne2 from "../assets/dialogos/nordeste/foto-2.jpg";
import ne3 from "../assets/dialogos/nordeste/foto-3.jpg";

type Region = {
  key: string;
  label: string;
  city: string;
  tag: string;
  note: string;
  photos: string[];
};

const REGIONS: Region[] = [
  {
    key: "nacional",
    label: "Encontro Nacional",
    city: "São Paulo",
    tag: "Síntese nacional",
    note: "A rodada que reuniu as contribuições das cinco regiões em um só palco.",
    photos: [nac1, nac2, nac3, nac4, nac5],
  },
  {
    key: "sudeste",
    label: "Sudeste",
    city: "São Paulo",
    tag: "Etapa regional",
    note: "Profissionais de DH e DEI em mesas de trabalho no formato world café.",
    photos: [se1, se2, se3],
  },
  {
    key: "centro-oeste",
    label: "Centro-Oeste",
    city: "Brasília",
    tag: "Etapa regional",
    note: "Empresas, poder público e sociedade civil construindo estratégias juntos.",
    photos: [co1, co2, co3],
  },
  {
    key: "sul",
    label: "Sul",
    city: "Curitiba",
    tag: "Etapa regional",
    note: "Discussões temáticas conectando a agenda de DH & DEI aos ODS.",
    photos: [sul1, sul2, sul3],
  },
  {
    key: "norte",
    label: "Norte",
    city: "Manaus",
    tag: "Etapa regional",
    note: "Diálogo sobre justiça climática e bioeconomia no coração da Amazônia.",
    photos: [nor1, nor2, nor3],
  },
  {
    key: "nordeste",
    label: "Nordeste",
    city: "Recife",
    tag: "Etapa regional",
    note: "O encontro que fechou o ciclo das cinco regiões.",
    photos: [ne1, ne2, ne3],
  },
];

const STATS = [
  { value: "6", label: "encontros" },
  { value: "5", label: "regiões" },
  { value: "World café", label: "formato" },
  { value: "2030", label: "horizonte" },
];

function Lightbox({
  region,
  index,
  onClose,
  onNav,
}: {
  region: Region;
  index: number;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onNav]);

  const multiple = region.photos.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050f1a]/95 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Foto do Diálogo ${region.label}`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
        aria-label="Fechar"
      >
        <X className="w-5 h-5" />
      </button>

      {multiple && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onNav(-1); }}
            className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onNav(1); }}
            className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
        <motion.img
          key={region.photos[index]}
          src={region.photos[index]}
          alt={`${region.label} — ${region.city}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
        />
        <div className="flex items-center justify-between mt-4 text-white/80">
          <span className="text-sm font-bold">
            {region.label} · {region.city}
          </span>
          {multiple && (
            <span className="text-xs font-black tracking-widest tabular-nums">
              {index + 1} / {region.photos.length}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Dialogues() {
  const [ref, inView] = useInView();
  const [activeKey, setActiveKey] = useState(REGIONS[0].key);
  const [featured, setFeatured] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const active = REGIONS.find((r) => r.key === activeKey) ?? REGIONS[0];

  const selectRegion = useCallback((key: string) => {
    setActiveKey(key);
    setFeatured(0);
  }, []);

  const navLightbox = useCallback(
    (dir: 1 | -1) => {
      setLightbox((prev) => {
        if (prev === null) return prev;
        const n = active.photos.length;
        return (prev + dir + n) % n;
      });
    },
    [active.photos.length]
  );

  return (
    <section id="dialogos" className="relative overflow-hidden py-20 lg:py-28" style={{ backgroundColor: "#0C2540" }}>
      {/* Atmosfera */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] bg-dhe-magenta/10 rounded-full blur-3xl" />
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] bg-dhe-green/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'url("/identity/kv-sem-fundo.png")', backgroundSize: "460px", backgroundRepeat: "no-repeat", backgroundPosition: "right -80px top -40px" }}
        />
      </div>

      <div className="dhe-container relative z-10" ref={ref as React.RefObject<HTMLDivElement>}>
        {/* ── Cabeçalho editorial ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: "#E8187A" }}>
            Nossa Trajetória
          </p>
          <div className="dhe-stripe-divider">
            <span /><span /><span /><span />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black leading-[1.05] max-w-3xl" style={{ color: "#FFFFFF" }}>
            Antes do Encontro:<br className="hidden sm:block" /> os Diálogos de DH e DEI
          </h2>

          {/* Texto quebrado estrategicamente: narrativa + objetivo destacado */}
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 mt-8 items-start">
            <div className="space-y-4 max-w-2xl">
              <p className="text-base sm:text-lg text-white/85 leading-relaxed">
                Com início na <strong className="text-white font-bold">69ª CSW da ONU</strong>, em Nova York, a Rede
                Brasil do Pacto Global percorreu o país para explorar, construir e aprofundar estratégias concretas
                de Direitos Humanos sob a lupa da Diversidade, Equidade e Inclusão.
              </p>
              <p className="text-base text-white/70 leading-relaxed">
                Foram <strong className="text-white/90 font-bold">cinco encontros regionais</strong> em formato{" "}
                <em>world café</em> — reunindo profissionais de DH e DEI, empresas, consultorias e organizações da
                sociedade civil — mais um <strong className="text-white/90 font-bold">encontro nacional</strong> em
                São Paulo.
              </p>
            </div>

            {/* Callout do objetivo */}
            <div className="rounded-2xl p-6 border border-white/10 bg-white/[0.04] backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-dhe-magenta" />
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-dhe-magenta mb-3">O objetivo</p>
              <p className="text-sm text-white/85 leading-relaxed">
                Debater estratégias resilientes, sustentáveis e conectadas aos ODS — e reunir direcionamentos para o{" "}
                <strong className="text-white font-bold">Guia Orientador de Estratégias de DH &amp; DEI</strong> para
                empresas, tendo <strong className="text-white font-bold">2030</strong> como horizonte.
              </p>
            </div>
          </div>

          {/* Métricas */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 mt-8 pt-6 border-t border-white/10">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="text-2xl font-display font-black text-white">{s.value}</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/50">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Seletor de rota (Nacional primeiro) ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.1 }}
          className="mt-12 -mx-5 px-5 overflow-x-auto dhe-scroll-snap"
          role="tablist"
          aria-label="Etapas dos Diálogos"
        >
          <div className="flex gap-2.5 min-w-max pb-1">
            {REGIONS.map((r) => {
              const isActive = r.key === activeKey;
              return (
                <button
                  key={r.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectRegion(r.key)}
                  className={`group flex flex-col items-start text-left rounded-2xl px-5 py-3 border transition-all duration-300 ${
                    isActive
                      ? "bg-dhe-magenta border-dhe-magenta shadow-[0_10px_30px_rgba(232,24,122,0.35)]"
                      : "bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-white/20"
                  }`}
                >
                  <span className={`text-[8px] font-black uppercase tracking-[0.18em] ${isActive ? "text-white/80" : "text-white/40"}`}>
                    {r.tag}
                  </span>
                  <span className={`text-sm font-display font-black leading-tight ${isActive ? "text-white" : "text-white/85"}`}>
                    {r.label}
                  </span>
                  <span className={`flex items-center gap-1 text-[10px] font-bold mt-0.5 ${isActive ? "text-white/85" : "text-white/45"}`}>
                    <MapPin className="w-2.5 h-2.5" />
                    {r.city}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Galeria da etapa ativa ──────────────────────────── */}
        {/* Keyed remount (sem AnimatePresence mode=wait) para evitar deadlock
            de exit com o AnimatePresence aninhado da foto em destaque. */}
        <div className="mt-6">
          <motion.div
            key={active.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 items-start"
          >
            {/* Meta da etapa */}
            <div className="lg:pt-2">
              <h3 className="text-2xl font-display font-black leading-tight" style={{ color: "#FFFFFF" }}>{active.label}</h3>
              <div className="flex items-center gap-1.5 text-dhe-magenta mt-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs font-black uppercase tracking-widest">{active.city}</span>
              </div>
              <p className="text-sm text-white/65 leading-relaxed mt-4 max-w-xs">{active.note}</p>
            </div>

            {/* Fotos — quadro horizontal, sem cortes */}
            <div>
              {/* Foto em destaque */}
              <button
                type="button"
                onClick={() => setLightbox(featured)}
                className="group relative w-full block rounded-[20px] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                aria-label="Ampliar foto"
              >
                <div className="aspect-[3/2] bg-black/40">
                  <motion.img
                    key={active.photos[featured]}
                    src={active.photos[featured]}
                    alt={`Diálogo ${active.label} — ${active.city}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#07182a]/70 via-transparent to-transparent pointer-events-none" />
                <span className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/15 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </button>

              {/* Miniaturas — mostra todas as fotos da etapa em quadro cheio */}
              {active.photos.length > 1 && (
                <div className="flex gap-3 mt-3 overflow-x-auto pb-1 dhe-scroll-snap">
                  {active.photos.map((p, i) => {
                    const isSel = i === featured;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setFeatured(i)}
                        className={`relative shrink-0 w-28 sm:w-32 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                          isSel ? "border-dhe-magenta" : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                        aria-label={`Ver foto ${i + 1} de ${active.label}`}
                        aria-pressed={isSel}
                      >
                        <div className="aspect-[3/2]">
                          <img src={p} alt="" className="w-full h-full object-cover" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox
          region={active}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onNav={navLightbox}
        />
      )}
    </section>
  );
}
