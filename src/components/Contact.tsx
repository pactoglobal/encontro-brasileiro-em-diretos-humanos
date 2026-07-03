import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { CheckCircle } from "lucide-react";

export function Contact() {
  const [ref, inView] = useInView();
  
  // Estados do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  // Handler de inscrição (também chamado via WebMCP)
  const handleInscricao = (nomeVal: string, emailVal: string, empresaVal: string, cargoVal?: string) => {
    if (!nomeVal || !emailVal || !empresaVal) {
      setErro("Por favor, preencha todos os campos obrigatórios.");
      return false;
    }
    
    setNome(nomeVal);
    setEmail(emailVal);
    setEmpresa(empresaVal);
    if (cargoVal) setCargo(cargoVal);
    
    setSucesso(true);
    setErro("");
    return true;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleInscricao(nome, email, empresa, cargo);
  };

  // Integração Imperativa com WebMCP (Google Antigravity SDK - AI-Ready)
  useEffect(() => {
    // @ts-ignore
    if (typeof window !== "undefined" && window.document && window.document.modelContext && typeof window.document.modelContext.registerTool === "function") {
      try {
        // @ts-ignore
        const abortController = new AbortController();
        // @ts-ignore
        window.document.modelContext.registerTool({
          name: "solicitar-inscricao",
          description: "Registra uma solicitação de inscrição para o Fórum DH&E Brasil 2026. Abre confirmação de sucesso na tela para o usuário.",
          inputSchema: {
            type: "object",
            properties: {
              nome: { type: "string", description: "Nome completo do participante" },
              email: { type: "string", description: "Endereço de e-mail de contato" },
              empresa: { type: "string", description: "Nome da empresa ou organização" },
              cargo: { type: "string", description: "Cargo profissional do participante" }
            },
            required: ["nome", "email", "empresa"]
          },
          execute(args: { nome: string; email: string; empresa: string; cargo?: string }) {
            const ok = handleInscricao(args.nome, args.email, args.empresa, args.cargo);
            if (ok) {
              return { status: "success", message: `Inscrição de ${args.nome} solicitada com sucesso.` };
            } else {
              return { status: "error", message: "Falha ao registrar inscrição por campos ausentes." };
            }
          }
        }, { signal: abortController.signal });

        return () => {
          abortController.abort();
        };
      } catch (err) {
        console.error("Falha ao registrar ferramenta WebMCP:", err);
      }
    }
  }, []);

  return (
    <section id="contato" className="dhe-section-light relative overflow-hidden">
      {/* Ribbon decorativo */}
      <div className="absolute inset-y-0 right-0 w-1/3 opacity-[0.04] pointer-events-none hidden lg:block" style={{ backgroundImage: 'url("/identity/kv-sem-fundo.png")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center' }} />

      <div className="dhe-container relative z-10">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="dhe-section-label text-center">Contato & Inscrições</p>
          <div className="dhe-stripe-divider mx-auto justify-center">
            <span />
            <span />
            <span />
            <span />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-dhe-navy mb-4">
            Participe do Encontro
          </h2>
          <p className="text-base leading-relaxed mb-12 text-dhe-text-muted">
            O I Encontro DH&E Brasil 2026 é <strong className="text-dhe-navy font-extrabold">gratuito e credenciado</strong> para
            empresas, movimentos sociais, poder público e academia.
          </p>

          <div className="max-w-2xl mx-auto text-left mb-12">
            <div className="dhe-card-editorial p-6 sm:p-8 bg-white/75 backdrop-blur-sm border-2 border-dhe-navy dhe-shadow-brutal relative">
                
                <AnimatePresence mode="wait">
                  {!sucesso ? (
                    <motion.form
                      key="form-inscricao"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={onSubmit}
                      className="space-y-4"
                      // @ts-ignore WebMCP attributes
                      toolname="solicitar-inscricao"
                      tooldescription="Registra a solicitação de inscrição para o Fórum DH&E Brasil 2026"
                    >
                      {erro && (
                        <div className="text-xs font-bold text-dhe-crimson bg-dhe-crimson/5 border border-dhe-crimson/20 p-3 rounded-lg">
                          {erro}
                        </div>
                      )}
                      
                      <div>
                        <label htmlFor="nome" className="block text-xs font-bold text-dhe-navy uppercase tracking-wider mb-1.5">
                          Nome Completo *
                        </label>
                        <input
                          id="nome"
                          type="text"
                          required
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Seu nome"
                          className="w-full text-sm bg-white border border-[#D8D4C7] rounded-xl px-4 py-3 text-dhe-navy focus:outline-none focus:border-dhe-magenta focus:ring-1 focus:ring-dhe-magenta"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-bold text-dhe-navy uppercase tracking-wider mb-1.5">
                          E-mail Corporativo / Contato *
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu.email@empresa.com"
                          className="w-full text-sm bg-white border border-[#D8D4C7] rounded-xl px-4 py-3 text-dhe-navy focus:outline-none focus:border-dhe-magenta focus:ring-1 focus:ring-dhe-magenta"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="empresa" className="block text-xs font-bold text-dhe-navy uppercase tracking-wider mb-1.5">
                            Organização / Empresa *
                          </label>
                          <input
                            id="empresa"
                            type="text"
                            required
                            value={empresa}
                            onChange={(e) => setEmpresa(e.target.value)}
                            placeholder="Nome da empresa"
                            className="w-full text-sm bg-white border border-[#D8D4C7] rounded-xl px-4 py-3 text-dhe-navy focus:outline-none focus:border-dhe-magenta focus:ring-1 focus:ring-dhe-magenta"
                          />
                        </div>
                        <div>
                          <label htmlFor="cargo" className="block text-xs font-bold text-dhe-navy uppercase tracking-wider mb-1.5">
                            Cargo / Função
                          </label>
                          <input
                            id="cargo"
                            type="text"
                            value={cargo}
                            onChange={(e) => setCargo(e.target.value)}
                            placeholder="Seu cargo"
                            className="w-full text-sm bg-white border border-[#D8D4C7] rounded-xl px-4 py-3 text-dhe-navy focus:outline-none focus:border-dhe-magenta focus:ring-1 focus:ring-dhe-magenta"
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <button type="submit" className="dhe-btn-primary w-full sm:w-auto">
                          Enviar Solicitação
                        </button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="sucesso-inscricao"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                      className="text-center py-8 space-y-4"
                    >
                      <div className="flex justify-center">
                        <CheckCircle className="w-16 h-16 text-dhe-green" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-bold text-dhe-navy">Solicitação Enviada!</h3>
                      <p className="text-sm text-dhe-text-muted leading-relaxed max-w-sm mx-auto">
                        Obrigado, <strong className="text-dhe-navy">{nome}</strong>. Sua solicitação de credenciamento
                        para o Fórum foi enviada. Entraremos em contato no e-mail <span className="underline">{email}</span> para confirmação das credenciais.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSucesso(false)}
                        className="dhe-btn-outline text-xs py-2.5 px-6"
                      >
                        Nova Inscrição
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

            </div>

            {/* Informações adicionais de suporte */}
            <div className="text-center mt-6">
              <p className="text-xs text-dhe-text-muted">
                Dúvidas ou suporte? Entre em contato pelo e-mail oficial:{" "}
                <a
                  href="mailto:contato@pactoglobal.org.br"
                  className="font-bold text-dhe-navy hover:text-dhe-magenta transition-colors underline"
                >
                  contato@pactoglobal.org.br
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
