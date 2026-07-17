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
import nac6 from "../assets/dialogos/nacional/foto-6.jpg";
import nac7 from "../assets/dialogos/nacional/foto-7.jpg";
import nac8 from "../assets/dialogos/nacional/foto-8.jpg";
import nac9 from "../assets/dialogos/nacional/foto-9.jpg";
import nac10 from "../assets/dialogos/nacional/foto-10.jpg";
// Sudeste
import se1 from "../assets/dialogos/sudeste/foto-1.jpg";
import se2 from "../assets/dialogos/sudeste/foto-2.jpg";
import se3 from "../assets/dialogos/sudeste/foto-3.jpg";
import se4 from "../assets/dialogos/sudeste/foto-4.jpg";
import se5 from "../assets/dialogos/sudeste/foto-5.jpg";
import se6 from "../assets/dialogos/sudeste/foto-6.jpg";
import se7 from "../assets/dialogos/sudeste/foto-7.jpg";
import se8 from "../assets/dialogos/sudeste/foto-8.jpg";
import se9 from "../assets/dialogos/sudeste/foto-9.jpg";
import se10 from "../assets/dialogos/sudeste/foto-10.jpg";
// Centro-Oeste
import co1 from "../assets/dialogos/centro-oeste/foto-1.jpg";
import co2 from "../assets/dialogos/centro-oeste/foto-2.jpg";
import co3 from "../assets/dialogos/centro-oeste/foto-3.jpg";
import co4 from "../assets/dialogos/centro-oeste/foto-4.jpg";
import co5 from "../assets/dialogos/centro-oeste/foto-5.jpg";
import co6 from "../assets/dialogos/centro-oeste/foto-6.jpg";
import co7 from "../assets/dialogos/centro-oeste/foto-7.jpg";
import co8 from "../assets/dialogos/centro-oeste/foto-8.jpg";
import co9 from "../assets/dialogos/centro-oeste/foto-9.jpg";
import co10 from "../assets/dialogos/centro-oeste/foto-10.jpg";
// Sul
import sul1 from "../assets/dialogos/sul/foto-1.jpg";
import sul2 from "../assets/dialogos/sul/foto-2.jpg";
import sul3 from "../assets/dialogos/sul/foto-3.jpg";
import sul4 from "../assets/dialogos/sul/foto-4.jpg";
import sul5 from "../assets/dialogos/sul/foto-5.jpg";
import sul6 from "../assets/dialogos/sul/foto-6.jpg";
import sul7 from "../assets/dialogos/sul/foto-7.jpg";
import sul8 from "../assets/dialogos/sul/foto-8.jpg";
import sul9 from "../assets/dialogos/sul/foto-9.jpg";
import sul10 from "../assets/dialogos/sul/foto-10.jpg";
// Norte
import nor1 from "../assets/dialogos/norte/foto-1.jpg";
import nor2 from "../assets/dialogos/norte/foto-2.jpg";
import nor3 from "../assets/dialogos/norte/foto-3.jpg";
import nor4 from "../assets/dialogos/norte/foto-4.jpg";
import nor5 from "../assets/dialogos/norte/foto-5.jpg";
import nor6 from "../assets/dialogos/norte/foto-6.jpg";
import nor7 from "../assets/dialogos/norte/foto-7.jpg";
import nor8 from "../assets/dialogos/norte/foto-8.jpg";
import nor9 from "../assets/dialogos/norte/foto-9.jpg";
import nor10 from "../assets/dialogos/norte/foto-10.jpg";
// Nordeste
import ne1 from "../assets/dialogos/nordeste/foto-1.jpg";
import ne2 from "../assets/dialogos/nordeste/foto-2.jpg";
import ne3 from "../assets/dialogos/nordeste/foto-3.jpg";
import ne4 from "../assets/dialogos/nordeste/foto-4.jpg";
import ne5 from "../assets/dialogos/nordeste/foto-5.jpg";
import ne6 from "../assets/dialogos/nordeste/foto-6.jpg";
import ne7 from "../assets/dialogos/nordeste/foto-7.jpg";
import ne8 from "../assets/dialogos/nordeste/foto-8.jpg";
import ne9 from "../assets/dialogos/nordeste/foto-9.jpg";
import ne10 from "../assets/dialogos/nordeste/foto-10.jpg";
import forumRegionalImg from "../assets/dialogos/forum-regional.jpg";
import forumRegional2Img from "../assets/dialogos/forum-regional-2.jpg";
import forumGlobalImg from "../assets/dialogos/forum-global.jpg";
import forumGlobal2Img from "../assets/dialogos/forum-global-2.jpg";
import forumGlobal3Img from "../assets/dialogos/forum-global-3.jpg";
import forumGlobal4Img from "../assets/dialogos/forum-global-4.jpg";

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
    photos: [nac1, nac2, nac3, nac4, nac5, nac6, nac7, nac8, nac9, nac10],
  },
  {
    key: "sudeste",
    label: "Sudeste",
    city: "São Paulo",
    tag: "Etapa regional",
    note: "Profissionais de DH e DEI em mesas de trabalho no formato world café.",
    photos: [se1, se2, se3, se4, se5, se6, se7, se8, se9, se10],
  },
  {
    key: "centro-oeste",
    label: "Centro-Oeste",
    city: "Brasília",
    tag: "Etapa regional",
    note: "Empresas, poder público e sociedade civil construindo estratégias juntos.",
    photos: [co1, co2, co3, co4, co5, co6, co7, co8, co9, co10],
  },
  {
    key: "sul",
    label: "Sul",
    city: "Curitiba",
    tag: "Etapa regional",
    note: "Discussões temáticas conectando a agenda de DH & DEI aos ODS.",
    photos: [sul1, sul2, sul3, sul4, sul5, sul6, sul7, sul8, sul9, sul10],
  },
  {
    key: "norte",
    label: "Norte",
    city: "Manaus",
    tag: "Etapa regional",
    note: "Diálogo sobre justiça climática e bioeconomia no coração da Amazônia.",
    photos: [nor1, nor2, nor3, nor4, nor5, nor6, nor7, nor8, nor9, nor10],
  },
  {
    key: "nordeste",
    label: "Nordeste",
    city: "Recife",
    tag: "Etapa regional",
    note: "O encontro que fechou o ciclo das cinco regiões.",
    photos: [ne1, ne2, ne3, ne4, ne5, ne6, ne7, ne8, ne9, ne10],
  },
  {
    key: "forum-regional",
    label: "Fórum Regional",
    city: "São Paulo (2025)",
    tag: "Articulação Regional",
    note: "O principal espaço latino-americano de conduta empresarial responsável, co-realizado por ACNUDH, OIT e OCDE para estabelecer diálogos multiatores.",
    photos: [forumRegionalImg, forumRegional2Img],
  },
  {
    key: "forum-global",
    label: "Fórum Global da ONU",
    city: "Genebra, Suíça",
    tag: "Conexão Internacional",
    note: "O maior encontro mundial sobre Empresas e Direitos Humanos na sede das Nações Unidas, onde as contribuições brasileiras serão compartilhadas globalmente.",
    photos: [forumGlobalImg, forumGlobal2Img, forumGlobal3Img, forumGlobal4Img],
  },
];

const STATS = [
  { value: "8", label: "etapas e fóruns" },
  { value: "5", label: "regiões do brasil" },
  { value: "Genebra", label: "conexão global" },
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
  const [lightbox, setLightbox] = useState<number | null>(null);

  const active = REGIONS.find((r) => r.key === activeKey) ?? REGIONS[0];

  const selectRegion = useCallback((key: string) => {
    setActiveKey(key);
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
          <p className="dhe-section-label">
            Nossa Trajetória
          </p>
          <div className="dhe-stripe-divider">
            <span /><span /><span /><span />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black leading-[1.05] max-w-3xl mb-8" style={{ color: "#FFFFFF" }}>
            Nossa Trajetória e<br className="hidden sm:block" /> Conexão Internacional
          </h2>

          {/* Bento Grid layout de informações */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Card 1: A Jornada (Contexto) */}
            <div className="lg:col-span-2 rounded-3xl p-8 border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-xl flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#E8187A] mb-3">A Jornada</p>
                <p className="text-base sm:text-lg text-white/90 leading-relaxed font-light">
                  Com início na <strong className="text-white font-bold">69ª CSW da ONU</strong> em Nova York, a Rede Brasil do Pacto Global percorreu o país para desenhar estratégias robustas de Direitos Humanos sob a lente de Diversidade, Equidade e Inclusão, culminando em importantes marcos e fóruns internacionais.
                </p>
                <p className="text-sm text-white/70 leading-relaxed mt-4">
                  Foram cinco encontros regionais (World Café) e a síntese nacional, conectados ao Fórum Regional de Empresas e DH (co-realizado por OIT, ACNUDH e OCDE) e ao Fórum Global de Empresas e DH da ONU em Genebra.
                </p>
              </div>
            </div>

            {/* Card 2: O Objetivo (Glassmorphism Bento) */}
            <div className="rounded-3xl p-8 border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.01] backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[240px]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-dhe-magenta/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-dhe-magenta/20 text-dhe-magenta border border-dhe-magenta/30 mb-5">
                  O Objetivo
                </span>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed font-medium">
                  Debater estratégias resilientes e conectadas aos ODS, resultando nas diretrizes do <strong className="text-white font-bold">Guia Orientador de DH &amp; DEI</strong> corporativo rumo a <strong className="text-white font-bold">2030</strong>.
                </p>
              </div>
              <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between">
                <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">Pacto Global</span>
                <div className="w-2 h-2 rounded-full bg-dhe-magenta animate-pulse" />
              </div>
            </div>

            {/* Card 3: Métricas (Bento Row) */}
            <div className="lg:col-span-3 rounded-3xl p-8 border border-white/5 bg-white/[0.01] backdrop-blur-sm grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
              {STATS.map((s) => (
                <div key={s.label} className="text-center sm:text-left border-l border-white/10 pl-4 first:border-none">
                  <p className="text-3xl sm:text-4xl font-display font-black text-white leading-none mb-1">{s.value}</p>
                  <p className="text-[10px] font-black uppercase tracking-wider text-white/40">{s.label}</p>
                </div>
              ))}
            </div>
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
        <div className="mt-8">
          <motion.div
            key={active.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col gap-6 max-w-5xl mx-auto"
          >
            {/* Meta da etapa */}
            <div className="text-left border-l-4 border-dhe-magenta pl-4 py-1">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-dhe-magenta">
                <MapPin className="w-3 h-3" />
                {active.city} · {active.label}
              </span>
              <p className="text-base text-white/85 leading-relaxed mt-2 max-w-3xl">
                {active.note}
              </p>
            </div>

            {/* Bento Grid de Fotos */}
            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 auto-rows-[200px] sm:auto-rows-[240px]">
                {active.photos.map((photo, index) => {
                  if (index >= 5) return null;

                  let gridClass = "";
                  if (active.photos.length === 1) {
                    gridClass = "col-span-3 row-span-2";
                  } else if (active.photos.length === 2) {
                    if (index === 0) gridClass = "col-span-2 row-span-2";
                    if (index === 1) gridClass = "col-span-1 row-span-2";
                  } else if (active.photos.length === 3) {
                    if (index === 0) gridClass = "col-span-2 row-span-2";
                    if (index === 1) gridClass = "col-span-1 row-span-1";
                    if (index === 2) gridClass = "col-span-1 row-span-1";
                  } else if (active.photos.length === 4) {
                    if (index === 0) gridClass = "col-span-2 row-span-2";
                    if (index === 1) gridClass = "col-span-1 row-span-1";
                    if (index === 2) gridClass = "col-span-1 row-span-1";
                    if (index === 3) gridClass = "col-span-3 row-span-1";
                  } else { // 5 ou mais
                    if (index === 0) gridClass = "col-span-2 row-span-2";
                    if (index === 1) gridClass = "col-span-1 row-span-1";
                    if (index === 2) gridClass = "col-span-1 row-span-1";
                    if (index === 3) gridClass = "col-span-1 row-span-1";
                    if (index === 4) gridClass = "col-span-2 row-span-1";
                  }

                  const isLastWithMore = index === 4 && active.photos.length > 5;

                  return (
                    <button
                      key={photo}
                      type="button"
                      onClick={() => setLightbox(index)}
                      className={`${gridClass} group relative w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-sm shadow-xl cursor-pointer focus:outline-none transition-all duration-300 hover:border-white/20`}
                      aria-label={`Ampliar foto ${index + 1}`}
                    >
                      <img
                        src={photo}
                        alt={`Diálogo ${active.label} — ${active.city} (${index + 1})`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      {/* Efeito Glassmorphism overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07182a]/70 via-transparent to-transparent opacity-65 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none" />
                      
                      {/* Borda interna refinada */}
                      <div className="absolute inset-0 border border-white/5 rounded-3xl group-hover:border-white/15 transition-all duration-300 pointer-events-none" />

                      {!isLastWithMore && (
                        <span className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center bg-black/45 backdrop-blur-md border border-white/15 text-white opacity-0 group-hover:opacity-100 transition-all duration-200">
                          <Maximize2 className="w-4 h-4" />
                        </span>
                      )}

                      {isLastWithMore && (
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-[3px] flex flex-col items-center justify-center text-white transition-colors duration-300 group-hover:bg-black/75">
                          <span className="text-3xl font-display font-black">+{active.photos.length - 5}</span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/70 mt-1">Fotos</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
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
