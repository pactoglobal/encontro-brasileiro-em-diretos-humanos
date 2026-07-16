import { motion } from "framer-motion";
import { Check, Mail, Info } from "lucide-react";

const BENEFITS = [
  "Visibilidade de Marca: Posicionamento estratégico em ambiente de alto nível institucional liderado pela ONU.",
  "Relacionamento: Acesso qualificado a lideranças do setor privado, governamental, sociedade civil e academia.",
  "Associação de Impacto: Posicionar sua marca na vanguarda da agenda de Direitos Humanos e Empresas no Brasil.",
  "Rede de Contatos: Fortalecimento de parcerias e networking com empresas comprometidas com a Agenda 2030.",
];

export function Sponsorship() {
  return (
    <section id="patrocinio" className="relative overflow-hidden bg-[#0C2540] py-20 lg:py-24 text-white">
      {/* Decorative background element */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] overflow-hidden">
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-dhe-magenta rounded-full blur-3xl" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-dhe-green rounded-full blur-3xl" />
      </div>

      <div className="dhe-container relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          {/* Left Column: Benefits */}
          <div>
            <p className="dhe-section-label" style={{ color: "#E8187A" }}>Oportunidade de Impacto</p>
            <div className="dhe-stripe-divider">
              <span style={{ backgroundColor: "#E8187A" }} />
              <span style={{ backgroundColor: "#7B2D1E" }} />
              <span style={{ backgroundColor: "#4A8C3F" }} />
              <span style={{ backgroundColor: "#E05A3A" }} />
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-black leading-tight mb-6" style={{ color: "#ffffff" }}>
              Quer ser um patrocinador?
            </h2>
            <p className="text-sm sm:text-base text-white/95 leading-relaxed mb-8 max-w-xl">
              Faça parte do I Encontro DH&E Brasil 2026. Apoiar a agenda de Empresas e Direitos Humanos é um posicionamento de liderança e responsabilidade socioambiental.
            </p>

            <div className="space-y-5">
              {BENEFITS.map((item) => {
                const [title, desc] = item.split(": ");
                return (
                  <div key={title} className="flex gap-4">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-dhe-magenta/20 text-dhe-magenta">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <div>
                      <p className="font-display font-black text-sm uppercase tracking-wide text-white">{title}</p>
                      <p className="mt-1 text-sm text-white leading-relaxed">{desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Contact Card */}
          <div className="flex flex-col gap-6 w-full">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 lg:text-right">
              Parcerias & Cota Comercial
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="rounded-3xl p-8 shadow-[0_12px_40px_rgba(0,0,0,0.15)] relative overflow-hidden flex flex-col justify-between dhe-glass dhe-glow-hover"
              style={{ minHeight: "340px" }}
            >
              <div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-dhe-magenta/20 border border-dhe-magenta/30 text-dhe-magenta">
                  <Mail aria-hidden="true" className="h-6 h-6" strokeWidth={1.8} />
                </div>

                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#E8187A] mb-2">
                  Parcerias e Apoio
                </p>
                <h3 className="text-2xl font-display font-black leading-tight mb-2" style={{ color: "#ffffff" }}>
                  Rafael Carmo
                </h3>
                <p className="text-sm text-white/95 leading-relaxed mb-6">
                  Fale com o coordenador comercial para receber o portfólio de patrocínios, cotas de apoio e conhecer todas as contrapartidas estruturadas.
                </p>
              </div>

              <div>
                <a
                  href="mailto:rafael.carmo@pactoglobal.org.br?subject=Patrocínio - I Encontro DH%26E Brasil 2026"
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-[#0C2540] bg-white hover:bg-white/90 active:bg-white/80 transition-all duration-200 shadow-lg text-center"
                >
                  Falar com Rafael
                </a>
                <p className="mt-3.5 text-[10px] text-center font-bold text-white/70 tracking-wide uppercase">
                  rafael.carmo@pactoglobal.org.br
                </p>
              </div>
            </motion.div>

            <div className="rounded-2xl p-5 flex items-start gap-4 dhe-glass">
              <Info size={16} className="text-[#E8187A] shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed text-white/90">
                Cada cota de patrocínio oferece contrapartidas exclusivas em exposição de marca na Cinemateca Brasileira, relacionamento institucional de alto nível e conteúdos conjuntos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
