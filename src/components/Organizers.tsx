import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

type OrgGroup = {
  category: string;
  color: string;
  logos: { src: string; alt: string; className: string }[];
};

const ORG_GROUPS: OrgGroup[] = [
  {
    category: "Realização",
    color: "var(--color-dhe-magenta)",
    logos: [
      { src: "/identity/adhe-logo.png", alt: "ADHE — Aliança pelos Direitos Humanos e Empresas", className: "h-14 sm:h-16" },
    ],
  },
  {
    category: "Co-realização",
    color: "var(--color-dhe-green)",
    logos: [
      { src: "/identity/co-realizacao.png", alt: "Pacto Global Rede Brasil, CERALC, Global Gateway, OIT, OCDE, ACNUDH", className: "h-10 sm:h-12 w-auto max-w-full" },
    ],
  },
  {
    category: "Patrocínio",
    color: "var(--color-dhe-crimson)",
    logos: [
      { src: "/identity/petrobras-patrocinio.png", alt: "Petrobras", className: "h-14 sm:h-16" },
    ],
  },
  {
    category: "Parceiro",
    color: "var(--color-dhe-maroon)",
    logos: [
      { src: "/identity/parceiro-cinemateca.png", alt: "Cinemateca Brasileira", className: "h-12 sm:h-14" },
    ],
  },
];

const ABOUT_ADHE = `A Aliança pelos Direitos Humanos e Empresas (ADHE) é uma plataforma multiator dedicada a fortalecer a implementação da agenda de Empresas e Direitos Humanos no Brasil, conectando empresas, organizações da sociedade civil, poder público e academia em torno de práticas responsáveis e do cumprimento de padrões internacionais.`;

const ABOUT_PACTO = `O Pacto Global – Rede Brasil foi criado em 2003 e é a segunda maior rede local do mundo, com mais de 2.000 participantes. Convocação especial do Secretário-Geral da ONU para que empresas de todo o mundo alinhem suas operações a dez princípios universais nas áreas de direitos humanos, trabalho, meio ambiente e anticorrupção.`;

export function Organizers() {
  const [ref, inView] = useInView();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 },
    },
  };

  return (
    <section id="organizadores" className="dhe-section-alt relative overflow-hidden">
      {/* Decorative blurry shape */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-dhe-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="dhe-container px-5 sm:px-8">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        >
          <p className="dhe-section-label">Realizadores</p>
          <div className="dhe-stripe-divider">
            <span />
            <span />
            <span />
            <span />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-dhe-navy mb-10">
            Organizadores e Parceiros
          </h2>

          {/* Sobre ADHE + Pacto */}
          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            {[
              { title: "Sobre a ADHE", text: ABOUT_ADHE, color: "var(--color-dhe-magenta)" },
              { title: "Sobre o Pacto Global – Rede Brasil", text: ABOUT_PACTO, color: "var(--color-dhe-green)" },
            ].map(({ title, text, color }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ type: "spring", stiffness: 70, damping: 15, delay: idx * 0.1 }}
                className="dhe-card-editorial p-6 bg-white/60 backdrop-blur-sm shadow-sm"
                style={{ borderColor: `${color}33` }}
              >
                <p
                  className="text-[10px] font-black uppercase tracking-[0.24em] mb-3"
                  style={{ color }}
                >
                  {title}
                </p>
                <p className="text-sm leading-relaxed text-dhe-text-muted">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Logos por categoria */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {ORG_GROUPS.map((group) => (
              <motion.div
                key={group.category}
                variants={itemVariants}
                className="dhe-card-editorial p-6 bg-white/60 backdrop-blur-sm shadow-sm"
                style={{ borderColor: `${group.color}33` }}
              >
                <p
                  className="text-[10px] font-black uppercase tracking-[0.28em] mb-5"
                  style={{ color: group.color }}
                >
                  {group.category}
                </p>
                <div className="flex flex-wrap items-center gap-8">
                  {group.logos.map((logo) => (
                    <motion.img
                      key={logo.alt}
                      src={logo.src}
                      alt={logo.alt}
                      whileHover={{ scale: 1.05 }}
                      className={`${logo.className} w-auto object-contain opacity-95 select-none pointer-events-none`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
