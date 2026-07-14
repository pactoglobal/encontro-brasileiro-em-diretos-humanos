import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { Target, Users, ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const BULLETS = [
  "Analisar como transformações geopolíticas e econômicas globais incidem sobre empresas e cadeias de valor",
  "Debater se, e por que, a agenda de Empresas e Direitos Humanos segue estratégica em um contexto de incerteza",
  "Garantir um espaço multiator, com participação efetiva de titulares de direitos, empresas, poder público, sociedade civil e academia",
  "Superar abordagens centradas exclusivamente em boas práticas, incorporando lições aprendidas, dilemas e falhas",
  "Produzir um documento com potencial de contribuição ao debate nacional e ao Fórum Internacional em Genebra",
];

const BULLET_COLORS = [
  { color: "#E8187A", bg: "rgba(232,24,122,0.15)" },
  { color: "#4A8C3F", bg: "rgba(74,140,63,0.15)" },
  { color: "#7B2D1E", bg: "rgba(123,45,30,0.15)" },
  { color: "#E05A3A", bg: "rgba(224,90,58,0.15)" },
  { color: "#0C2540", bg: "rgba(12,37,64,0.15)" },
];

const CINEMATECA_IMAGES = [
  "/identity/cinemateca-facade.jpg",
  "/identity/cinemateca-gardens.jpg",
];

// Background images mapped to each bento card
const CARD_BG = {
  contexto: "/identity/bg-carousel-1.jpg",
  publicoAlvo: "/identity/bg-carousel-2.jpg",
  objetivos: "/identity/bg-carousel-3.jpg",
};

const PUBLICO_TAGS = [
  "Lideranças Corporativas",
  "Poder Público",
  "Sociedade Civil",
  "Academia",
  "Organismos Internacionais",
];

export function About() {
  const [ref, inView] = useInView();
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % CINEMATECA_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextPhoto = useCallback(() => {
    setActivePhoto((prev) => (prev + 1) % CINEMATECA_IMAGES.length);
  }, []);

  const prevPhoto = useCallback(() => {
    setActivePhoto((prev) => (prev - 1 + CINEMATECA_IMAGES.length) % CINEMATECA_IMAGES.length);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 60, damping: 15, staggerChildren: 0.1 },
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

  // Sem hover scale - apenas transições suaves
  const hoverStyle = {
    boxShadow: "0 8px 32px rgba(12,37,64,0.06)",
    transition: { duration: 0.2 },
  };

  return (
    <section id="sobre" className="dhe-section-light relative overflow-hidden bg-[#0C2540] py-20 lg:py-28 text-white">
      {/* Decorative ribbon */}
      <div
        className="absolute top-0 right-0 w-64 h-full opacity-[0.03] pointer-events-none hidden lg:block"
        style={{
          backgroundImage: 'url("/identity/kv-sem-fundo.png")',
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
        }}
      />

      <div className="dhe-container">
        {/* Section Header */}
        <div className="mb-12">
          <p className="dhe-section-label">Sobre o Encontro</p>
          <div className="dhe-stripe-divider">
            <span />
            <span />
            <span />
            <span />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black max-w-3xl leading-tight" style={{ color: "#FFFFFF" }}>
            Empresas e Direitos Humanos em um <span style={{ color: "#E8187A" }}>mundo em transformação</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1: Contexto — bg image + dark overlay, spans 2 cols */}
          <motion.div
            variants={itemVariants}
            whileHover={hoverStyle}
            className="md:col-span-2 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden border border-white/20"
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${CARD_BG.contexto})` }}
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0C2540]/90 via-[#0C2540]/75 to-[#0C2540]/60" />
            {/* Content */}
            <div className="relative z-10">
              <div className="absolute top-0 right-0 p-6 text-white/60 group-hover:text-white/90 transition-colors duration-300">
                <ArrowUpRight className="w-6 h-6" />
              </div>
              <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-dhe-green animate-pulse" />
                Cenário Atual
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-black mb-5 max-w-xl leading-snug" style={{ color: "#FFFFFF" }}>
                Riscos sistêmicos e estratégias de resiliência corporativa no Brasil
              </h3>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/85">
                <p>
                  Nos últimos anos, sucessivas crises globais têm interrompido e revertido avanços no
                  desenvolvimento sustentável. A pandemia, conflitos armados, mudanças climáticas e a
                  instrumentalização geopolítica da economia criaram um cenário de elevada incerteza e volatilidade.
                </p>
                <p>
                  As empresas não operam em um vácuo. A capacidade de enfrentar riscos sistêmicos deixou de ser
                  questão de conformidade ou reputação — passou a integrar estratégias de resiliência e
                  competitividade de longo prazo.
                </p>
                <p>
                  É precisamente em cenários de crise que os impactos dos negócios sobre os direitos de
                  trabalhadores, comunidades e territórios se intensificam, tornando a agenda
                  não apenas relevante, mas estratégica e necessária para a liderança empresarial.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Cinemateca — slider, spans 1 col */}
          <motion.div
            variants={itemVariants}
            whileHover={hoverStyle}
            className="md:col-span-1 bg-white border border-[#D8D4C7] rounded-3xl overflow-hidden flex flex-col justify-between"
          >
            {/* Slider */}
            <div className="relative aspect-[16/10] bg-black overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activePhoto}
                  src={CINEMATECA_IMAGES[activePhoto]}
                  alt="Cinemateca Brasileira"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
              <span className="absolute top-4 left-4 inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-black/40 backdrop-blur-md text-white border border-white/10">
                <MapPin className="w-2.5 h-2.5 text-dhe-coral" />
                Local do Evento
              </span>
              <button onClick={prevPhoto} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-label="Foto anterior">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={nextPhoto} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-label="Próxima foto">
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {CINEMATECA_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePhoto(idx)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: idx === activePhoto ? "#FFFFFF" : "rgba(255,255,255,0.4)",
                      width: idx === activePhoto ? "12px" : "6px",
                      height: "6px",
                    }}
                    aria-label={`Foto ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h4 className="text-lg font-display font-black leading-tight" style={{ color: "#E8187A" }}>Cinemateca Brasileira</h4>
                <p className="text-xs text-dhe-text-muted mt-1">
                  Espaço histórico e cultural no coração de São Paulo, preparado para sediar as reflexões mais urgentes do ecossistema.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-[#D8D4C7]/60 flex items-center justify-between">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-dhe-text-muted">Co-realização e Apoio</p>
                  <p className="text-[10px] font-bold text-dhe-navy mt-0.5">Parceiro Oficial de Espaço</p>
                </div>
                <div className="p-2 bg-[#FAF9F6] border border-[#D8D4C7] rounded-xl flex items-center justify-center shadow-sm">
                  <img src="/identity/parceiro-cinemateca.png" alt="Cinemateca Brasileira Logo" width={109} height={68} className="h-7 w-auto object-contain" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Público-Alvo — bg image + navy overlay, spans 1 col */}
          <motion.div
            variants={itemVariants}
            whileHover={hoverStyle}
            className="md:col-span-1 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden border border-white/20"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${CARD_BG.publicoAlvo})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0C2540]/85 via-[#0C2540]/80 to-[#0C2540]/95" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-dhe-magenta/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col justify-between flex-1">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-dhe-magenta mb-6">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-dhe-magenta mb-3 block">Público-Alvo</span>
                <h3 className="text-xl font-display font-black leading-snug mb-4" style={{ color: "#FFFFFF" }}>Quem participará do Encontro</h3>
                <p className="text-xs text-white/70 leading-relaxed mb-6">
                  Uma coalizão diversa de atores estratégicos focados na construção de pontes e soluções viáveis.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {PUBLICO_TAGS.map((tag) => (
                  <span key={tag} className="text-[9px] font-bold px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/90 group-hover:bg-white/10 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 4: Objetivos — bg image + light overlay, spans 2 cols */}
          <motion.div
            variants={itemVariants}
            whileHover={hoverStyle}
            className="md:col-span-2 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden border border-[#D8D4C7]/40"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${CARD_BG.objetivos})` }}
            />
            <div className="absolute inset-0 bg-[#FAF9F6]/92 backdrop-blur-[2px]" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#E8187A]/10 flex items-center justify-center text-[#E8187A]">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-dhe-magenta block">Diretrizes</span>
                  <h4 className="text-lg font-display font-black" style={{ color: "#E8187A" }}>Objetivos Estratégicos</h4>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BULLETS.map((bullet, i) => (
                  <div
                    key={i}
                    className="p-4 bg-white/80 backdrop-blur-sm border border-[#D8D4C7]/60 rounded-2xl flex gap-3.5 items-start group-hover:bg-white group-hover:border-[#D8D4C7] transition-colors"
                    style={{ gridColumn: i === 2 ? "span 1 sm:span-2" : "auto" }}
                  >
                    <span
                      className="shrink-0 w-6.5 h-6.5 rounded-xl flex items-center justify-center text-[10px] font-black"
                      style={{ background: BULLET_COLORS[i].bg, color: BULLET_COLORS[i].color }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-dhe-text-muted">{bullet}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}