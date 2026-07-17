import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { 
  ChevronLeft, 
  ChevronRight,
  MapPin
} from "lucide-react";

import shambuyiImg from "../assets/empreendedores/shambuyiwetu.jpg";
import esmatImg from "../assets/empreendedores/esmatwear.jpg";
import perfumesImg from "../assets/empreendedores/perfumesaldomari.jpg";
import renabesImg from "../assets/empreendedores/renabesartes.jpg";
import downliciaImg from "../assets/empreendedores/downlicia_oficial.jpg";
import ninaImg from "../assets/empreendedores/ninabarbosamacrame.jpg";
import santaImg from "../assets/empreendedores/santatherezadesign.jpg";

type Initiative = {
  name: string;
  org: string;
  category: string;
  description: string;
  ods: string;
  odsLogo: string;
  location: string;
  color: string;
  bg: string;
  instagram: string;
  image: string;
  partner?: string;
};

const INITIATIVES: Initiative[] = [
  {
    name: "Shambuyi Wetu",
    org: "Shambuyi Wetu",
    category: "Artista Plástico",
    description: "Artista plástico congolês radicado em São Paulo, cuja produção artística e performances dialogam com a memória, a ancestralidade e a diáspora africana.",
    ods: "ODS 10 · Redução das Desigualdades",
    odsLogo: "/ods/ods-10.jpg",
    location: "São Paulo, SP",
    color: "#E8187A",
    bg: "rgba(232, 24, 122, 0.06)",
    instagram: "https://www.instagram.com/shambuyiwetu/",
    image: shambuyiImg,
    partner: "ACNUR"
  },
  {
    name: "Esmat Wear",
    org: "Esmatullah Mohsini",
    category: "Mochilas e Bolsas Handmade",
    description: "Mochilas e bolsas artesanais, sustentáveis e veganas, criadas por um artesão afegão refugiado no Brasil, promovendo design autoral e consciência ecológica.",
    ods: "ODS 12 · Consumo e Produção Responsáveis",
    odsLogo: "/ods/ods-12.jpg",
    location: "São Paulo, SP",
    color: "#4A8C3F",
    bg: "rgba(74, 140, 63, 0.06)",
    instagram: "https://www.instagram.com/esmatwear/",
    image: esmatImg,
    partner: "ACNUR"
  },
  {
    name: "Perfumes Al Domari",
    org: "Anas Obaid",
    category: "Fragrâncias e Perfumaria",
    description: "Fragrâncias e perfumes artesanais inspirados na rica tradição da perfumaria árabe, produzidos com óleos essenciais exclusivos por um empreendedor sírio.",
    ods: "ODS 8 · Trabalho Decente",
    odsLogo: "/ods/ods-8.jpg",
    location: "São Paulo, SP",
    color: "#0C2540",
    bg: "rgba(12, 37, 64, 0.06)",
    instagram: "https://www.instagram.com/perfumesaldomari/",
    image: perfumesImg,
    partner: "ACNUR"
  },
  {
    name: "Renabes Artes",
    org: "Renee Abegail Ross Londja",
    category: "Bonecas e Bichinhos",
    description: "Confecção artesanal de bonecas de pano e bichinhos decorativos lúdicos feitos à mão, celebrando a infância, a diversidade cultural e a representatividade.",
    ods: "ODS 10 · Redução das Desigualdades",
    odsLogo: "/ods/ods-10.jpg",
    location: "São Paulo, SP",
    color: "#7B2D1E",
    bg: "rgba(123, 45, 30, 0.06)",
    instagram: "https://www.instagram.com/renabesartes",
    image: renabesImg,
    partner: "ACNUR"
  },
  {
    name: "Downlícia",
    org: "Gabriel Bernardes",
    category: "Brigadeiros Gourmet",
    description: "Deliciosos brigadeiros artesanais levados na tradicional foodbike por Gabriel Bernardes, mostrando o poder da inclusão ativa de pessoas com síndrome de Down.",
    ods: "ODS 10 · Redução das Desigualdades",
    odsLogo: "/ods/ods-10.jpg",
    location: "São Paulo, SP",
    color: "#E05A3A",
    bg: "rgba(224, 90, 58, 0.06)",
    instagram: "https://www.instagram.com/downlicia_oficial/",
    image: downliciaImg,
    partner: "Empreendedor"
  },

  {
    name: "Nina Barbosa Macramê",
    org: "Nina Barbosa",
    category: "Moda & Decoração Afetiva",
    description: "Peças exclusivas de vestuário e decoração tecidas manualmente através de nós de macramê, resgatando técnicas ancestrais com design moderno.",
    ods: "ODS 5 · Igualdade de Gênero",
    odsLogo: "/ods/ods-5.jpg",
    location: "São Paulo, SP",
    color: "#E8187A",
    bg: "rgba(232, 24, 122, 0.06)",
    instagram: "https://www.instagram.com/ninabarbosamacrame/",
    image: ninaImg,
    partner: "RME"
  },
  {
    name: "Santa Thereza Design",
    org: "Fa Thereza Silva",
    category: "Moda Afro",
    description: "Marca autoral de moda afro que exalta a identidade, o orgulho e as cores da cultura negra através de roupas estampadas e acessórios cheios de estilo.",
    ods: "ODS 10 · Redução das Desigualdades",
    odsLogo: "/ods/ods-10.jpg",
    location: "São Paulo, SP",
    color: "#CC2222",
    bg: "rgba(204, 34, 34, 0.06)",
    instagram: "https://www.instagram.com/santatherezadesign/",
    image: santaImg,
    partner: "RME"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 85, damping: 15 },
  },
};

export function EntrepreneurArea() {
  const [ref, inView] = useInView();
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const cardWidth = 380 + 24; // Card width + gap
      const offset = direction === "left" ? -cardWidth : cardWidth;
      carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section id="empreendedores" className="dhe-section-light relative overflow-hidden bg-[#FAF9F6] border-t border-[#D8D4C7]/55 py-20 lg:py-24">
      {/* Background Graphic elements */}
      <div className="absolute inset-y-0 left-0 w-1/4 opacity-[0.03] pointer-events-none hidden lg:block"
        style={{ backgroundImage: 'url("/identity/kv-sem-fundo.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "left center" }} />

      <div className="dhe-container" ref={ref as React.RefObject<HTMLDivElement>}>
        
        {/* ── Header da Seção + Controls ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="max-w-4xl"
          >
            <p className="dhe-section-label">Área Empreendedora</p>
            <div className="dhe-stripe-divider">
              <span style={{ backgroundColor: "#E8187A" }} />
              <span style={{ backgroundColor: "#7B2D1E" }} />
              <span style={{ backgroundColor: "#4A8C3F" }} />
              <span style={{ backgroundColor: "#E05A3A" }} />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-display font-black text-dhe-navy mb-4">
              Conheça os empreendedores de Impacto
            </h2>
            <p className="text-base text-dhe-text-muted leading-relaxed">
              A Área de Empreendedores reúne 9 iniciativas que transformam propósito em impacto, apresentando produtos e negócios comprometidos com a inclusão e o desenvolvimento sustentável. Conheça cada empreendimento, inspire-se com suas histórias e apoie quem gera valor social por meio do empreendedorismo.
            </p>
          </motion.div>
          
          {/* Carousel Arrows Controls */}
          {inView && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex gap-2.5 shrink-0"
            >
              <button 
                onClick={() => scroll("left")}
                aria-label="Anterior"
                className="w-11 h-11 rounded-full border border-dhe-navy/15 bg-white flex items-center justify-center text-dhe-navy hover:bg-[#FAF9F6] active:scale-95 hover:border-dhe-navy/30 transition-all cursor-pointer focus:outline-none shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll("right")}
                aria-label="Próximo"
                className="w-11 h-11 rounded-full border border-dhe-navy/15 bg-white flex items-center justify-center text-dhe-navy hover:bg-[#FAF9F6] active:scale-95 hover:border-dhe-navy/30 transition-all cursor-pointer focus:outline-none shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>

        {/* ── Carrossel Horizontal de Iniciativas ── */}
        {inView && (
          <div className="relative w-full">
            {/* Sombras de fade nas laterais para indicar continuidade no desktop */}
            <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-[#FAF9F6] to-transparent z-10 pointer-events-none hidden md:block" />
            <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-[#FAF9F6] to-transparent z-10 pointer-events-none hidden md:block" />
            
            <motion.div
              ref={carouselRef}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 px-4 md:px-0 -mx-4 md:mx-0 scroll-smooth scrollbar-thin scrollbar-thumb-dhe-navy/10 scrollbar-track-transparent"
              style={{
                scrollbarWidth: "thin",
                msOverflowStyle: "none",
              }}
            >
              {INITIATIVES.map((ini) => {
                return (
                  <motion.div
                    key={ini.name}
                    variants={cardVariants}
                    whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                    className="snap-start shrink-0 w-[290px] sm:w-[340px] md:w-[380px] rounded-[32px] p-7 border border-white/20 bg-gradient-to-b from-[#7B2D1E]/95 to-[#7B2D1E]/80 backdrop-blur-2xl flex flex-col justify-between shadow-[0_16px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgba(123,45,30,0.3)] hover:border-[#FFD700]/30 transition-all duration-500 select-none group relative overflow-hidden"
                  >
                    {/* Subtle KV Neon glow inside */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#FFD700]/5 group-hover:to-[#FFD700]/15 transition-all duration-500 pointer-events-none" />
                    
                    <div className="relative z-10">
                      {/* Top Row: Avatar Photo + Info next to it */}
                      <div className="flex gap-4 items-center mb-6">
                        <div 
                          className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 shadow-sm"
                          style={{ borderColor: ini.color }}
                        >
                          <img 
                            src={ini.image} 
                            alt={ini.org} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-white truncate">
                            {ini.org}
                          </p>
                          <p className="text-[10px] font-black uppercase tracking-wider truncate text-white/90">
                            {ini.category}
                          </p>
                          {ini.partner && (
                            <span className="inline-block text-[8px] font-black uppercase bg-white/10 text-white px-2 py-0.5 rounded-full mt-1 border border-white/10">
                              {ini.partner}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Brand Title / Name */}
                      <h3 className="text-xl font-display font-black text-white mb-3">
                        {ini.name}
                      </h3>

                      {/* Description - Fixed clipping by removing fixed height */}
                      <p className="text-[13px] text-white/70 leading-relaxed mb-6 font-medium">
                        {ini.description}
                      </p>
                      
                      {/* Instagram Link */}
                      {ini.instagram && (
                        <a 
                          href={ini.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-white hover:text-white/80 hover:underline mb-4 transition-colors"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                          </svg>
                          Instagram
                        </a>
                      )}
                    </div>

                    {/* Footer Row: ODS + Location */}
                    <div className="relative z-10 pt-5 border-t border-white/10 flex flex-col gap-3 mt-auto">
                      <div className="flex items-center gap-2">
                        {ini.odsLogo && (
                          <div className="bg-white p-0.5 rounded-md shrink-0">
                            <img 
                              src={ini.odsLogo} 
                              alt={ini.ods} 
                              className="w-8 h-8 object-contain" 
                            />
                          </div>
                        )}
                        <span className="text-[11px] font-bold text-white leading-tight">
                          {ini.ods}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 text-white/90 bg-white/10 self-start rounded-full px-3 py-1.5 border border-white/10 backdrop-blur-sm">
                        <MapPin className="w-3.5 h-3.5 text-white" />
                        <span className="text-[10px] font-black uppercase tracking-wider text-white">
                          {ini.location}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
