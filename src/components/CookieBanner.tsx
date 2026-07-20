import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Cookie, X } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been stored
    const consent = localStorage.getItem("dhe_cookie_consent");
    if (!consent) {
      // Delay showing banner slightly for smooth page entrance
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("dhe_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem("dhe_cookie_consent", "essential");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 90, damping: 15 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 max-w-lg z-50 p-6 rounded-3xl bg-[#0C2540]/95 backdrop-blur-2xl border border-white/20 text-white shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden"
        >
          {/* Subtle brand glow accent */}
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#E8187A]/20 blur-2xl pointer-events-none" />
          
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
            <p className="text-xs text-white/80 leading-relaxed mb-5 font-normal">
              Utilizamos cookies e tecnologias semelhantes para garantir o funcionamento correto, segurança e aprimoramento da sua experiência no site do <strong>I Encontro Brasileiro de Direitos Humanos e Empresas</strong>, em conformidade com a LGPD.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5">
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
