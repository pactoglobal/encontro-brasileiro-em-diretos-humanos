import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { Users, ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const CINEMATECA_IMAGES = [
  "/identity/cinemateca-facade.jpg",
  "/identity/cinemateca-gardens.jpg",
];

// Background images mapped to each bento card
const CARD_BG = {
  contexto: "/identity/bg-carousel-1.jpg",
  publicoAlvo: "/identity/bg-carousel-2.jpg",
};

const PUBLICO_TAGS = [
  "Lideranças Corporativas",
  "Poder Público",
  "Sociedade Civil",
  "Academia",
  "Organismos Internacionais",
];

export function About() {
  const [ref1, inView1] = useInView();
  const [ref2, inView2] = useInView();
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % CINEMATECA_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevPhoto = useCallback(() => {
    setActivePhoto((prev) => (prev - 1 + CINEMATECA_IMAGES.length) % CINEMATECA_IMAGES.length);
  }, []);

  const nextPhoto = useCallback(() => {
    setActivePhoto((prev) => (prev + 1) % CINEMATECA_IMAGES.length);
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
    <>
      {/* SEÇÃO 1: Sobre o Encontro & Local */}
      <section id="sobre" ref={ref1 as React.RefObject<HTMLDivElement>} className="dhe-section-light relative overflow-hidden bg-[#F1EFEA] py-20 lg:py-24">


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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black max-w-3xl leading-tight" style={{ color: "#0C2540" }}>
              Empresas e Direitos Humanos em um <span style={{ color: "#E8187A" }}>mundo em transformação</span>
            </h2>
          </div>

          {/* Bento Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView1 ? "visible" : "hidden"}
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
                <div className="space-y-4 text-sm sm:text-base leading-relaxed text-white">
                  <p>
                    Nos últimos anos, sucessivas crises globais têm interrompido e revertido avanços no
                    desenvolvimento sustentável. A pandemia, conflitos armados, mudanças climáticas e a
                    instrumentalização geopolítica da economia criaram um cenário de elevada incerteza e volatilidade.
                  </p>
                  <p>
                    As empresas não operam em um vácuo. A capacidade de enfrentar risks sistêmicos deixou de ser
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
                  <p className="text-xs text-dhe-navy font-medium mt-1">
                    Espaço histórico e cultural no coração de São Paulo, preparado para sediar as reflexões mais urgentes do ecossistema.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#D8D4C7]/60 flex items-center justify-between">
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-dhe-text-muted">Correalização e Apoio</p>
                    <p className="text-[10px] font-bold text-dhe-navy mt-0.5">Parceiro Oficial de Espaço</p>
                  </div>
                  <div className="p-2.5 bg-white border border-[#D8D4C7] rounded-xl flex items-center justify-center shadow-sm">
                    <img src="/identity/parceiro-cinemateca.png" alt="Cinemateca Brasileira Logo" className="h-10 w-auto object-contain" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Público-Alvo — Panoramic Horizontal Layout (spans 3 cols) */}
            <motion.div
              variants={itemVariants}
              whileHover={hoverStyle}
              className="md:col-span-3 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden border border-white/20"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${CARD_BG.publicoAlvo})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0C2540]/90 via-[#0C2540]/85 to-[#0C2540]/75" />
              <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-dhe-magenta/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-stretch justify-between gap-8 w-full">
                <div className="flex-1 max-w-xl">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-dhe-magenta mb-5 border border-white/15">
                    <Users className="w-5.5 h-5.5" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-dhe-magenta mb-2 block">Público-Alvo</span>
                  <h3 className="text-2xl font-display font-black leading-snug mb-3" style={{ color: '#ffffff' }}>Quem participará do Encontro</h3>
                  <p className="text-sm text-white font-medium leading-relaxed">
                    Uma coalizão diversa de atores estratégicos focados na construção de pontes e soluções viáveis.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5 items-center md:max-w-md content-center">
                  {PUBLICO_TAGS.map((tag) => (
                    <span key={tag} className="text-xs font-bold px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white transition-all hover:bg-white/20 shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO 2: Diretrizes & Objetivos Estratégicos */}
      <section id="diretrizes" ref={ref2 as React.RefObject<HTMLDivElement>} className="dhe-section-alt relative overflow-hidden bg-[#FAF9F6] border-t border-[#D8D4C7]/50 py-20 lg:py-24">


        <div className="dhe-container">
          {/* Section Header */}
          <div className="mb-12">
            <p className="dhe-section-label">Diretrizes</p>
            <div className="dhe-stripe-divider">
              <span />
              <span />
              <span />
              <span />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black max-w-3xl leading-tight" style={{ color: "#0C2540" }}>
              Objetivos <span style={{ color: "#E8187A" }}>Estratégicos</span>
            </h2>
            <p className="text-base text-dhe-text-muted mt-3 max-w-xl">
              Os pilares que orientam as discussões, painéis e resultados práticos do Encontro.
            </p>
          </div>

          {/* Bento Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Card 1: Geopolítica & Valor (1 col) */}
            <motion.div
              variants={itemVariants}
              whileHover={hoverStyle}
              className="md:col-span-1 rounded-[28px] p-7 flex flex-col justify-between relative overflow-hidden border border-white/10 shadow-[0_12px_40px_rgba(12,37,64,0.08)] bg-gradient-to-br from-[#E8187A] to-[#B50B5B]"
              style={{ minHeight: "240px" }}
            >
              <div>
                <div className="w-10 h-10 bg-white/15 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white text-base font-black shadow-sm">
                  1
                </div>
                <span className="inline-flex items-center mt-6 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-white/15 backdrop-blur-md border border-white/20 text-white shadow-sm">
                  Geopolítica &amp; Valor
                </span>
                <h3 className="text-lg font-display font-black leading-snug mt-3" style={{ color: '#ffffff' }}>
                  Analisar como transformações geopolíticas e econômicas globais incidem sobre empresas e cadeias de valor.
                </h3>
              </div>
            </motion.div>

            {/* Card 2: Estratégia & Incerteza (1 col) */}
            <motion.div
              variants={itemVariants}
              whileHover={hoverStyle}
              className="md:col-span-1 rounded-[28px] p-7 flex flex-col justify-between relative overflow-hidden border border-white/10 shadow-[0_12px_40px_rgba(12,37,64,0.08)] bg-gradient-to-br from-[#4A8C3F] to-[#3B7032]"
              style={{ minHeight: "240px" }}
            >
              <div>
                <div className="w-10 h-10 bg-white/15 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white text-base font-black shadow-sm">
                  2
                </div>
                <span className="inline-flex items-center mt-6 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-white/15 backdrop-blur-md border border-white/20 text-white shadow-sm">
                  Estratégia &amp; Incerteza
                </span>
                <h3 className="text-lg font-display font-black leading-snug mt-3" style={{ color: '#ffffff' }}>
                  Debater se, e por que, a agenda de Empresas e Direitos Humanos segue estratégica em um contexto de incerteza.
                </h3>
              </div>
            </motion.div>

            {/* Card 3: Espaço Multiator (1 col) */}
            <motion.div
              variants={itemVariants}
              whileHover={hoverStyle}
              className="md:col-span-1 rounded-[28px] p-7 flex flex-col justify-between relative overflow-hidden border border-white/10 shadow-[0_12px_40px_rgba(12,37,64,0.08)] bg-gradient-to-br from-[#0C2540] to-[#061525]"
              style={{ minHeight: "240px" }}
            >
              <div>
                <div className="w-10 h-10 bg-white/15 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white text-base font-black shadow-sm">
                  3
                </div>
                <span className="inline-flex items-center mt-6 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-white/15 backdrop-blur-md border border-white/20 text-white shadow-sm">
                  Espaço Multiator
                </span>
                <h3 className="text-lg font-display font-black leading-snug mt-3" style={{ color: '#ffffff' }}>
                  Garantir um espaço multiator com participação efetiva de titulares de direitos, empresas, poder público, sociedade civil e academia.
                </h3>
              </div>
            </motion.div>

            {/* Card 4: Transparência & Prática (2 cols) */}
            <motion.div
              variants={itemVariants}
              whileHover={hoverStyle}
              className="md:col-span-2 rounded-[28px] p-8 flex flex-col justify-between relative overflow-hidden border border-white/10 shadow-[0_12px_40px_rgba(12,37,64,0.08)] bg-gradient-to-br from-[#E05A3A] to-[#BF4A2E]"
              style={{ minHeight: "220px" }}
            >
              <div>
                <div className="w-10 h-10 bg-white/15 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white text-base font-black shadow-sm">
                  4
                </div>
                <span className="inline-flex items-center mt-6 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-white/15 backdrop-blur-md border border-white/20 text-white shadow-sm">
                  Transparência &amp; Prática
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-black leading-snug mt-3" style={{ color: '#ffffff' }}>
                  Superar abordagens baseadas apenas em boas práticas, incorporando lições aprendidas, dilemas e falhas reais.
                </h3>
              </div>
            </motion.div>

            {/* Card 5: Legado & Contribuição (1 col) */}
            <motion.div
              variants={itemVariants}
              whileHover={hoverStyle}
              className="md:col-span-1 rounded-[28px] p-7 flex flex-col justify-between relative overflow-hidden border border-white/10 shadow-[0_12px_40px_rgba(12,37,64,0.08)] bg-gradient-to-br from-[#7B2D1E] to-[#5D2116]"
              style={{ minHeight: "220px" }}
            >
              <div>
                <div className="w-10 h-10 bg-white/15 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white text-base font-black shadow-sm">
                  5
                </div>
                <span className="inline-flex items-center mt-6 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-white/15 backdrop-blur-md border border-white/20 text-white shadow-sm">
                  Legado &amp; Contribuição
                </span>
                <h3 className="text-base sm:text-lg font-display font-black leading-snug mt-3" style={{ color: '#ffffff' }}>
                  Produzir um documento com potencial de contribuição ao debate nacional e ao Fórum em Genebra.
                </h3>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}