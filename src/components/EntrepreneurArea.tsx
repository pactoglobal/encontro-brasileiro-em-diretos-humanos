import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { 
  Sparkles, 
  ShoppingBag, 
  Leaf, 
  Cpu, 
  Coffee, 
  Scissors, 
  Sun, 
  Heart, 
  Package, 
  Layers, 
  ChevronDown, 
  ChevronUp,
  MapPin
} from "lucide-react";

type Initiative = {
  name: string;
  category: string;
  description: string;
  ods: string;
  location: string;
  color: string;
  bg: string;
  Icon: React.FC<{ className?: string }>;
};

const INITIATIVES: Initiative[] = [
  {
    name: "Mãos da Terra",
    category: "Artesanato & Renda",
    description: "Cooperativa de artesanato sustentável feito com fibras naturais de bananeira e capim-dourado por mulheres da periferia de São Paulo, gerando autonomia e renda qualificada.",
    ods: "ODS 5 · Igualdade de Gênero",
    location: "São Paulo, SP",
    color: "#E8187A",
    bg: "rgba(232, 24, 122, 0.06)",
    Icon: ShoppingBag,
  },
  {
    name: "Ciclo Orgânico",
    category: "Economia Circular",
    description: "Iniciativa de coleta de resíduos orgânicos residenciais de bicicleta, transformando toneladas de lixo em adubo de alta qualidade para agricultura familiar.",
    ods: "ODS 12 · Consumo e Produção Responsáveis",
    location: "Campinas, SP",
    color: "#4A8C3F",
    bg: "rgba(74, 140, 63, 0.06)",
    Icon: Leaf,
  },
  {
    name: "Recicla Tech",
    category: "Inclusão Digital",
    description: "Recondicionamento de resíduos eletrônicos para doação a escolas públicas, oferecendo capacitação em robótica e montagem de computadores para jovens em vulnerabilidade.",
    ods: "ODS 8 · Trabalho Decente",
    location: "Valinhos, SP",
    color: "#0C2540",
    bg: "rgba(12, 37, 64, 0.06)",
    Icon: Cpu,
  },
  {
    name: "Café da Mata",
    category: "Agroecologia",
    description: "Produção agroecológica e comércio justo de café especial cultivado por comunidades quilombolas do Vale do Ribeira, preservando a biodiversidade local.",
    ods: "ODS 15 · Vida Terrestre",
    location: "Registro, SP",
    color: "#7B2D1E",
    bg: "rgba(123, 45, 30, 0.06)",
    Icon: Coffee,
  },
  {
    name: "Costura Cidadã",
    category: "Moda Circular",
    description: "Marca coletiva de upcycling que transforma retalhos descartados por indústrias têxteis em bolsas e acessórios de design autoral desenvolvidos por imigrantes e refugiados.",
    ods: "ODS 10 · Redução das Desigualdades",
    location: "São Paulo, SP",
    color: "#E05A3A",
    bg: "rgba(224, 90, 58, 0.06)",
    Icon: Scissors,
  },
  {
    name: "Luz do Sertão",
    category: "Energia Renovável",
    description: "Sistemas modulares de energia solar montados e instalados de forma comunitária em assentamentos rurais, garantindo acesso à eletricidade e bombeamento de água.",
    ods: "ODS 7 · Energia Limpa",
    location: "Petrolina, PE",
    color: "#FFD700",
    bg: "rgba(255, 215, 0, 0.08)",
    Icon: Sun,
  },
  {
    name: "Sabores da Amazônia",
    category: "Extrativismo Sustentável",
    description: "Produção de geleias e doces artesanais a partir de frutas nativas da floresta por cooperativas tradicionais ribeirinhas, promovendo o desenvolvimento sustentável.",
    ods: "ODS 12 · Produção Sustentável",
    location: "Manaus, AM",
    color: "#4A8C3F",
    bg: "rgba(74, 140, 63, 0.06)",
    Icon: Sparkles,
  },
  {
    name: "Mosaico Social",
    category: "Design Inclusivo",
    description: "Estúdio de artes gráficas e papelaria corporativa ecológica que atua na inserção profissional e desenvolvimento social de jovens adultos no espectro autista.",
    ods: "ODS 8 · Crescimento Econômico",
    location: "Santos, SP",
    color: "#0C2540",
    bg: "rgba(12, 37, 64, 0.06)",
    Icon: Layers,
  },
  {
    name: "Tijolo Verde",
    category: "Eco-Construção",
    description: "Fabricação de tijolos e blocos modulares ecológicos sem queima de combustível fóssil, incorporando resíduos industriais reciclados na matéria-prima.",
    ods: "ODS 11 · Cidades Sustentáveis",
    location: "Sorocaba, SP",
    color: "#7B2D1E",
    bg: "rgba(123, 45, 30, 0.06)",
    Icon: Package,
  },
  {
    name: "Nutri Acolher",
    category: "Alimentação Saudável",
    description: "Cozinha social que distribui refeições nutritivas com insumos da agricultura familiar a preços simbólicos, gerando emprego local para cozinheiras de baixa renda.",
    ods: "ODS 2 · Fome Zero",
    location: "Guarulhos, SP",
    color: "#E8187A",
    bg: "rgba(232, 24, 122, 0.06)",
    Icon: Heart,
  },
  {
    name: "BioPoli",
    category: "Biomateriais",
    description: "Startup que desenvolve embalagens descartáveis biodegradáveis e compostáveis a partir de resíduos do processamento da mandioca e cana-de-açúcar.",
    ods: "ODS 13 · Ação Contra o Clima",
    location: "Piracicaba, SP",
    color: "#E05A3A",
    bg: "rgba(224, 90, 58, 0.06)",
    Icon: Leaf,
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
  const [showAll, setShowAll] = useState(false);

  // Exibir 6 inicialmente, expandir para as 11
  const displayedInitiatives = showAll ? INITIATIVES : INITIATIVES.slice(0, 6);

  return (
    <section id="empreendedores" className="dhe-section-light relative overflow-hidden bg-[#FAF9F6] border-t border-[#D8D4C7]/55 py-20 lg:py-24">
      {/* Background Graphic elements */}
      <div className="absolute inset-y-0 left-0 w-1/4 opacity-[0.03] pointer-events-none hidden lg:block"
        style={{ backgroundImage: 'url("/identity/kv-sem-fundo.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "left center" }} />

      <div className="dhe-container" ref={ref as React.RefObject<HTMLDivElement>}>
        
        {/* ── Header da Seção ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          className="mb-12"
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
          <p className="text-base text-dhe-text-muted max-w-4xl leading-relaxed">
            A Área de Empreendedores reúne 11 iniciativas que transformam propósito em impacto, apresentando produtos e negócios comprometidos com a inclusão e o desenvolvimento sustentável. Conheça cada empreendimento, inspire-se com suas histórias e apoie quem gera valor social por meio do empreendedorismo.
          </p>
        </motion.div>

        {/* ── Bento Grid de Iniciativas ── */}
        {inView && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {displayedInitiatives.map((ini) => {
                const Icon = ini.Icon;
                return (
                  <motion.div
                    key={ini.name}
                    variants={cardVariants}
                    layout
                    whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 18 } }}
                    className="rounded-[24px] p-6 border border-[#D8D4C7]/65 flex flex-col justify-between dhe-glow-hover bg-white select-none shadow-sm"
                  >
                    <div>
                      {/* Top Row: Icon + Category tag */}
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <div 
                          className="w-11 h-11 rounded-xl flex items-center justify-center border text-white"
                          style={{
                            background: `linear-gradient(135deg, ${ini.color}, ${ini.color}cc)`,
                            borderColor: `${ini.color}40`
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span 
                          className="text-[8px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border"
                          style={{
                            backgroundColor: ini.bg,
                            borderColor: `${ini.color}30`,
                            color: ini.color
                          }}
                        >
                          {ini.category}
                        </span>
                      </div>

                      {/* Title / Name */}
                      <h3 className="text-lg font-display font-black text-dhe-navy mb-2.5">
                        {ini.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-dhe-text-muted leading-relaxed mb-6 font-medium">
                        {ini.description}
                      </p>
                    </div>

                    {/* Footer Row: ODS + Location */}
                    <div className="pt-4 border-t border-[#D8D4C7]/45 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span 
                          className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse" 
                          style={{ backgroundColor: ini.color }}
                        />
                        <span className="text-[9px] font-bold text-dhe-text-muted truncate">
                          {ini.ods}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 text-white/50 bg-[#0C2540]/5 rounded px-2 py-0.5 border border-[#0C2540]/10">
                        <MapPin className="w-2.5 h-2.5 text-[#0C2540]/60" />
                        <span className="text-[8px] font-black uppercase text-[#0C2540]/75">
                          {ini.location}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Expand Button ── */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-dhe-navy/20 hover:border-dhe-navy/40 bg-white text-dhe-navy font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer hover:shadow-md focus:outline-none"
          >
            {showAll ? (
              <>
                Recolher lista
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Ver todas as 11 iniciativas
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
