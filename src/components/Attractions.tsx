import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "../hooks/useInView";

import guilherme from "../assets/painelistas/guilherme-xavier.jpg";
import camila from "../assets/painelistas/camila-zelezoglo.jpg";
import jandyra from "../assets/painelistas/jandyra-uehara.jpg";
import josefa from "../assets/painelistas/josefa-camara.jpg";
import uine from "../assets/painelistas/uine-lopes.jpg";
import maryellen from "../assets/painelistas/maryellen-crisostomo.jpg";
import gilson from "../assets/painelistas/gilson-camboim.jpg";
import pedro from "../assets/painelistas/pedro-villela.jpg";
import thalita from "../assets/painelistas/thalita-silva.jpg";
import luiz from "../assets/painelistas/luiz-henrique-ramos.jpg";
import simone from "../assets/painelistas/simone-rocha.jpg";
import gabriel from "../assets/painelistas/gabriel-bezerra.jpg";
import irina from "../assets/painelistas/irina-bacci.jpg";
import marcos from "../assets/painelistas/marcos-antonio-matos.jpg";
import joao from "../assets/painelistas/joao-marcos-pires-camargo.jpg";
import victoriana from "../assets/painelistas/victoriana-leonora-c-gonzaga.jpg";
import gabriela from "../assets/painelistas/gabriela-almeida.jpg";
import adriana from "../assets/painelistas/adriana-marcolino.jpg";
import hernan from "../assets/painelistas/hernan-coronado.jpg";
import reinaldo from "../assets/painelistas/reinaldo-bulgarelli.jpg";
import margareth from "../assets/painelistas/margareth-goldenberg.jpg";
import sue from "../assets/painelistas/sue-wolter-vianna.jpg";

type Confirmado = {
  name: string;
  role: string;
  org: string;
  photo: string;
  accent: string;
};

// Cores da paleta da marca (com contraste alto sobre o card escuro)
const MAGENTA = "#E8187A";
const GREEN = "#4A8C3F";
const CORAL = "#E05A3A";
const BLUE = "#38BDF8";

// Palestrantes confirmados via formulário oficial (planilha de confirmação).
const CONFIRMADOS: Confirmado[] = [
  { name: "Guilherme Xavier", role: "Diretor Executivo", org: "Pacto Global da ONU — Rede Brasil", photo: guilherme, accent: MAGENTA },
  { name: "Jandyra Uehara", role: "Secretária de Políticas Sociais e Direitos Humanos", org: "CUT Nacional", photo: jandyra, accent: GREEN },
  { name: "Maryellen Crisóstomo", role: "Coletivo de Mulheres", org: "CONAQ", photo: maryellen, accent: CORAL },
  { name: "Camila Zelezoglo", role: "Gerente de Sustentabilidade e Inovação", org: "ABIT", photo: camila, accent: BLUE },
  { name: "Uine Lopes", role: "Pescador e Professor", org: "Mov. dos Pescadores e Pescadoras Artesanais", photo: uine, accent: MAGENTA },
  { name: "Josefa Camara", role: "Educadora Popular Beiradeira", org: "Conselho Ribeirinho", photo: josefa, accent: GREEN },
  { name: "Simone Rocha", role: "Sócia — Direitos Humanos e Impacto Social", org: "ERM América Latina", photo: simone, accent: CORAL },
  { name: "Pedro Villela", role: "Gerente Executivo de Impacto Social", org: "Axia Energia", photo: pedro, accent: MAGENTA },
  { name: "Thalita Silva", role: "Defensora Pública", org: "Defensoria Pública do Estado de SP", photo: thalita, accent: GREEN },
  { name: "Gilson Camboim", role: "Coordenador Nacional do Cooperativismo", org: "Fecomin", photo: gilson, accent: CORAL },
  { name: "Irina Bacci", role: "Diretora Técnica", org: "PADF", photo: irina, accent: BLUE },
  { name: "Luiz Henrique Ramos", role: "Secretário de Inspeção do Trabalho", org: "Ministério do Trabalho e Emprego", photo: luiz, accent: MAGENTA },
  { name: "Gabriel Bezerra", role: "Presidente", org: "CONTAR", photo: gabriel, accent: GREEN },
  { name: "Marcos Matos", role: "Diretor Geral", org: "CECAFÉ", photo: marcos, accent: CORAL },
  { name: "João Marcos Pires Camargo", role: "Diretor de Política e Planejamento Mineral", org: "Ministério de Minas e Energia", photo: joao, accent: BLUE },
  { name: "Victoriana Leonora C. Gonzaga", role: "Diretora Executiva", org: "ESG Novas Gerações", photo: victoriana, accent: MAGENTA },
  { name: "Gabriela Almeida", role: "Gerente", org: "Pacto Global da ONU — Rede Brasil", photo: gabriela, accent: GREEN },
  { name: "Adriana Marcolino", role: "Diretora Técnica", org: "DIEESE", photo: adriana, accent: CORAL },
  { name: "Hernán Coronado", role: "Especialista Regional Pueblos Indígenas", org: "OIT", photo: hernan, accent: BLUE },
  { name: "Reinaldo Bulgarelli", role: "Secretário Executivo", org: "Fórum de Empresas e Direitos LGBTI+", photo: reinaldo, accent: MAGENTA },
  { name: "Margareth Goldenberg", role: "Diretora Executiva", org: "Movimento Mulher 360", photo: margareth, accent: GREEN },
  { name: "Sue Wolter Vianna", role: "Gerente de Riscos Sociais e Direitos Humanos", org: "Petrobras", photo: sue, accent: CORAL },
];

function ConfirmadoCard({ person, index }: { person: Confirmado; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 16, delay: index * 0.05 }}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 18 } }}
      className="group relative overflow-hidden rounded-[22px] flex-shrink-0 select-none w-[248px] sm:w-[280px] shadow-[0_16px_36px_rgba(0,0,0,0.35)] border border-white/5"
      style={{ minHeight: "372px" }}
    >
      {/* Foto de rosto — quadro cheio */}
      <img
        src={person.photo}
        alt={person.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
      />
      {/* Gradiente para leitura do texto */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(7,24,40,0.97) 0%, rgba(7,24,40,0.78) 28%, rgba(7,24,40,0.18) 58%, transparent 100%)",
        }}
      />
      {/* Tint sutil no topo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, ${person.accent}14 0%, transparent 30%)` }}
      />

      <div className="relative z-10 h-full flex flex-col justify-between p-5">
        <div>
          <span
            className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full dhe-glass"
            style={{ color: "#fff", backgroundColor: `${person.accent}59`, border: `1px solid ${person.accent}80` }}
          >
            <span className="w-1 h-1 rounded-full" style={{ background: "#fff" }} />
            Confirmado
          </span>
        </div>

        <div>
          <h3 className="font-display font-black leading-tight text-lg mb-1" style={{ color: "#ffffff" }}>
            {person.name}
          </h3>
          <p className="text-[13px] font-bold leading-snug mb-1" style={{ color: person.accent === BLUE ? "#7DD3FC" : person.accent }}>
            {person.role}
          </p>
          <p className="text-[11px] text-white/85 leading-snug">{person.org}</p>
          <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-[8px] font-black uppercase tracking-widest text-white/85">04 AGO 2026</span>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: person.accent }} />
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
    el.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
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
            <p className="dhe-section-label">Palestrantes Confirmados</p>
            <div className="dhe-stripe-divider">
              <span /><span /><span /><span />
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-dhe-navy">
              Quem já confirmou presença
            </h2>
            <p className="text-base text-dhe-text-muted mt-2 max-w-lg">
              Lideranças do setor privado, poder público, sociedade civil, organismos internacionais e titulares de direitos que sobem ao palco em 04 de agosto.
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

      {/* Carrossel com scroll horizontal */}
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
              style={{ background: "linear-gradient(to right, #F1EFEA, transparent)", opacity: canScrollLeft ? 1 : 0 }}
            />
            {/* Fade direita */}
            <div
              className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, #F1EFEA, transparent)" }}
            />

            <div
              ref={scrollRef}
              onScroll={updateScrollState}
              className="flex gap-4 overflow-x-auto pb-6 dhe-scroll-snap"
              style={{ paddingLeft: "calc(max(1.25rem, (100vw - 80rem) / 2 + 1.25rem))", paddingRight: "calc(max(1.25rem, (100vw - 80rem) / 2 + 1.25rem))" }}
            >
              {CONFIRMADOS.map((p, i) => (
                <ConfirmadoCard key={p.name} person={p} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
