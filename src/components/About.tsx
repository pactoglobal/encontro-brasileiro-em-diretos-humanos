import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

const BULLETS = [
  "Analisar como transformações geopolíticas e econômicas globais incidem sobre empresas e cadeias de valor",
  "Debater se, e por que, a agenda de Empresas e Direitos Humanos segue estratégica em um contexto de incerteza",
  "Garantir um espaço multiator, com participação efetiva de titulares de direitos, empresas, poder público, sociedade civil e academia",
  "Superar abordagens centradas exclusivamente em boas práticas, incorporando lições aprendidas, dilemas e falhas",
  "Produzir um documento com potencial de contribuição ao debate nacional e ao Fórum Internacional em Genebra",
];

export function About() {
  const [ref, inView] = useInView();

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring" as const, stiffness: 60, damping: 15 },
    },
  };

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 },
    },
  };

  return (
    <section id="sobre" className="dhe-section-alt relative overflow-hidden">
      {/* Decorative Blur Orb */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-dhe-magenta/5 rounded-full blur-3xl pointer-events-none" />

      <div className="dhe-container">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start"
        >
          {/* Texto */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <p className="dhe-section-label">Sobre o Encontro</p>

            <div className="dhe-stripe-divider">
              <span />
              <span />
              <span />
              <span />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-dhe-navy mb-6 leading-tight">
              Empresas e Direitos Humanos em um mundo em profunda transformação
            </h2>

            <div className="space-y-4 text-base leading-relaxed text-dhe-text-muted">
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
                Paradoxalmente, é precisamente em cenários de crise que os impactos dos negócios sobre os
                direitos de trabalhadores, comunidades e territórios se intensificam, tornando a agenda
                não apenas relevante, mas estratégica e necessária.
              </p>
            </div>
          </motion.div>

          {/* Objetivos */}
          <motion.div
            variants={listContainerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <p className="dhe-section-label mb-4">Objetivos do Encontro</p>

            <ul className="space-y-3">
              {BULLETS.map((item, i) => (
                <motion.li
                  key={i}
                  variants={listItemVariants}
                  className="dhe-card-editorial p-4 flex gap-4 items-start"
                >
                  <span
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black mt-0.5"
                    style={{ background: "rgba(232,24,122,0.08)", color: "#E8187A", border: "1px solid rgba(232,24,122,0.2)" }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-dhe-text-muted">
                    {item}
                  </p>
                </motion.li>
              ))}
            </ul>

            {/* Público */}
            <motion.div
              variants={listItemVariants}
              className="mt-6 dhe-card-editorial p-5 border-l-4 border-l-dhe-green"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.24em] mb-2 text-dhe-green">
                Público-Alvo
              </p>
              <p className="text-sm leading-relaxed text-dhe-text-muted">
                Empresas nacionais e multinacionais · Representantes do poder público · Organizações da
                sociedade civil e movimentos sociais · Academia e centros de pesquisa · Organismos internacionais
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
