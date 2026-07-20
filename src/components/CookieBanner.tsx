import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Cookie, X, Settings, Check } from "lucide-react";

type ConsentState = {
  essential: boolean; // Always true
  analytics: boolean;
  functional: boolean;
};

const CONSENT_KEY = "dhe_cookie_consent_v2";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preferences, setPreferences] = useState<ConsentState>({
    essential: true,
    analytics: true,
    functional: true,
  });

  useEffect(() => {
    // Check stored consent
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object") {
          setPreferences({
            essential: true,
            analytics: !!parsed.analytics,
            functional: !!parsed.functional,
          });
        }
      } catch {
        // Fallback for string states
      }
    }
  }, []);

  // Listen for global open event (e.g. from footer link)
  useEffect(() => {
    const handleOpen = () => {
      setIsModalOpen(true);
    };
    window.addEventListener("dhe:open-cookie-preferences", handleOpen);
    return () => window.removeEventListener("dhe:open-cookie-preferences", handleOpen);
  }, []);

  const saveConsent = (state: ConsentState) => {
    const data = {
      ...state,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
    
    // Set actual cookies for browser & CMP integration
    const maxAge = 365 * 24 * 60 * 60; // 1 year
    document.cookie = `adopt_consent=${state.analytics && state.functional ? "true" : "essential"}; path=/; max-age=${maxAge}; SameSite=Lax`;
    document.cookie = `dhe_lgpd_consent=${state.analytics ? "full" : "essential"}; path=/; max-age=${maxAge}; SameSite=Lax`;

    // Try calling GoAdopt API if injected
    if (typeof (window as unknown as { GoAdopt?: { acceptAll: () => void } }).GoAdopt?.acceptAll === "function") {
      try {
        (window as unknown as { GoAdopt: { acceptAll: () => void } }).GoAdopt.acceptAll();
      } catch {
        // Ignore iframe fallback
      }
    }

    setIsVisible(false);
    setIsModalOpen(false);
  };

  const handleAcceptAll = () => {
    const full: ConsentState = { essential: true, analytics: true, functional: true };
    setPreferences(full);
    saveConsent(full);
  };

  const handleAcceptEssential = () => {
    const essentialOnly: ConsentState = { essential: true, analytics: false, functional: false };
    setPreferences(essentialOnly);
    saveConsent(essentialOnly);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  return (
    <>
      {/* ── BANNER POP-UP INICIAL ────────────────────────────────────────── */}
      <AnimatePresence>
        {isVisible && !isModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 90, damping: 15 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 max-w-lg z-50 p-6 rounded-3xl bg-[#0C2540]/95 backdrop-blur-2xl border border-white/20 text-white shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden"
          >
            {/* Soft pink glow */}
            <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#E8187A]/25 blur-2xl pointer-events-none" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/15 shrink-0 text-[#E8187A]">
                    <Cookie className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-display font-black text-[#E8187A] leading-tight">
                      Privacidade &amp; Cookies
                    </h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                      Conformidade LGPD
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAcceptEssential}
                  aria-label="Fechar aviso de cookies"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Description */}
              <p className="text-xs text-white/85 leading-relaxed mb-5 font-normal">
                Utilizamos cookies e tecnologias semelhantes para garantir o funcionamento seguro, navegação adequada e aprimoramento da sua experiência no site do <strong>I Encontro Brasileiro de Direitos Humanos e Empresas</strong>, em conformidade com a LGPD (Lei Geral de Proteção de Dados).
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white/70 hover:text-white hover:underline transition-colors py-1 cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-[#E8187A]" />
                  Personalizar
                </button>

                <div className="flex flex-wrap items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={handleAcceptEssential}
                    className="px-4 py-2.5 rounded-full border border-white/25 bg-white/5 text-xs font-bold text-white/90 hover:bg-white/15 hover:border-white/40 transition-all text-center cursor-pointer"
                  >
                    Apenas Essenciais
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E8187A] to-[#E05A3A] text-xs font-bold uppercase tracking-wider text-white shadow-md hover:shadow-lg hover:brightness-110 active:scale-95 transition-all text-center cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Aceitar Todos
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MODAL DE PREFERÊNCIAS E PERSONALIZAÇÃO ───────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
              className="relative w-full max-w-xl bg-[#0C2540] border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl z-10 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/15 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E8187A]/15 border border-[#E8187A]/30 flex items-center justify-center text-[#E8187A]">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-black text-white">
                      Preferências de Privacidade
                    </h3>
                    <p className="text-xs text-white/60">
                      Gerencie suas escolhas de cookies (LGPD)
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cookie Categories */}
              <div className="space-y-4 mb-8 max-h-[50vh] overflow-y-auto pr-1">
                {/* Category 1: Essential */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      Cookies Essenciais
                      <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#4A8C3F]/30 text-[#4A8C3F] border border-[#4A8C3F]/40">
                        Obrigatório
                      </span>
                    </span>
                    <div className="w-5 h-5 rounded-full bg-[#4A8C3F] flex items-center justify-center text-white">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <p className="text-xs text-white/75 leading-relaxed">
                    Necessários para a navegação, segurança, funcionamento do formulário de interesse e carregamento de fontes e estilos do site. Não podem ser desativados.
                  </p>
                </div>

                {/* Category 2: Analytics */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-white">
                      Analytics e Desempenho
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences((p) => ({ ...p, analytics: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E8187A]" />
                    </label>
                  </div>
                  <p className="text-xs text-white/75 leading-relaxed">
                    Nos ajudam a entender de forma anônima e agregada como os visitantes interagem com o site, permitindo aprimorar o desempenho e a relevância dos conteúdos.
                  </p>
                </div>

                {/* Category 3: Functional */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-white">
                      Funcionalidade e Mídia
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={(e) => setPreferences((p) => ({ ...p, functional: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E8187A]" />
                    </label>
                  </div>
                  <p className="text-xs text-white/75 leading-relaxed">
                    Permitem recursos avançados, como lembrete de navegação e preferências visuais de interface.
                  </p>
                </div>
              </div>

              {/* Modal Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-white/15">
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-xs font-bold uppercase tracking-wider text-white transition-all text-center cursor-pointer"
                >
                  Salvar Minhas Escolhas
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#E8187A] to-[#E05A3A] text-xs font-bold uppercase tracking-wider text-white shadow-md hover:brightness-110 active:scale-95 transition-all text-center cursor-pointer"
                >
                  Aceitar Todos
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
