import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Cookie, X, Settings, Check, Info, FileText, Lock } from "lucide-react";

type ConsentState = {
  essential: boolean; // Always true
  analytics: boolean;
  functional: boolean;
};

const CONSENT_KEY = "dhe_cookie_consent_v2";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [confirmationData, setConfirmationData] = useState<{
    open: boolean;
    title: string;
    description: string;
    savedState: ConsentState;
  }>({
    open: false,
    title: "",
    description: "",
    savedState: { essential: true, analytics: false, functional: false },
  });

  const [preferences, setPreferences] = useState<ConsentState>({
    essential: true,
    analytics: true,
    functional: true,
  });

  useEffect(() => {
    // Check stored consent on initial load
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
        // Fallback
      }
    }
  }, []);

  // Listen for global open events (from footer links)
  useEffect(() => {
    const handleOpenPreferences = () => {
      setIsModalOpen(true);
    };
    const handleOpenPrivacy = () => {
      setIsPrivacyModalOpen(true);
    };

    window.addEventListener("dhe:open-cookie-preferences", handleOpenPreferences);
    window.addEventListener("dhe:open-privacy-policy", handleOpenPrivacy);
    return () => {
      window.removeEventListener("dhe:open-cookie-preferences", handleOpenPreferences);
      window.removeEventListener("dhe:open-privacy-policy", handleOpenPrivacy);
    };
  }, []);

  const saveConsent = (state: ConsentState) => {
    const data = {
      ...state,
      timestamp: new Date().toISOString(),
    };

    // 1. Grava no localStorage real
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
    
    // 2. Grava nos cookies reais do navegador (para persistência e CMP)
    const maxAge = 365 * 24 * 60 * 60; // 1 ano
    document.cookie = `adopt_consent=${state.analytics && state.functional ? "true" : "essential"}; path=/; max-age=${maxAge}; SameSite=Lax`;
    document.cookie = `dhe_lgpd_consent=${state.analytics ? "full" : "essential"}; path=/; max-age=${maxAge}; SameSite=Lax`;

    // 3. Notifica a API do GoAdopt para registrar o consentimento na "Base de Consentimentos" (be.lgpd)
    const win = window as unknown as Record<string, unknown>;
    try {
      if (win.GoAdopt && typeof (win.GoAdopt as Record<string, unknown>).acceptAll === "function") {
        ((win.GoAdopt as Record<string, unknown>).acceptAll as () => void)();
      }
      if (win.GoAdopt && typeof (win.GoAdopt as Record<string, unknown>).accept === "function") {
        ((win.GoAdopt as Record<string, unknown>).accept as (status: string) => void)(state.analytics ? "all" : "essential");
      }
      if (win.Adopt && typeof (win.Adopt as Record<string, unknown>).accept === "function") {
        ((win.Adopt as Record<string, unknown>).accept as () => void)();
      }
    } catch {
      // Ignore fallback
    }

    // 4. Dispara clique programático caso o elemento do GoAdopt esteja carregado no DOM
    try {
      const container = document.querySelector('#adopt-website-id, .adopt-injector-container, [id*="goadopt"]') as HTMLElement;
      if (container) {
        const btn = container.querySelector('button, [role="button"], a') as HTMLElement;
        if (btn) btn.click();
      }
    } catch {
      // Ignore fallback
    }

    // 5. Envia requisição beacon HTTP direta para os servidores do GoAdopt (be.lgpd)
    try {
      const payload = JSON.stringify({
        website_code: "f53ac651-4ac2-40fb-beea-8e21f2a74603",
        consent_status: state.analytics ? "ACCEPTED_ALL" : "ESSENTIAL_ONLY",
        accepted_categories: state.analytics ? ["essential", "analytics", "functional"] : ["essential"],
        timestamp: new Date().toISOString(),
        url: window.location.href,
      });

      if (navigator.sendBeacon) {
        navigator.sendBeacon("https://tag.goadopt.io/api/v1/consent", payload);
      } else {
        fetch("https://tag.goadopt.io/api/v1/consent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Ignore
    }

    setIsVisible(false);
    setIsModalOpen(false);
  };

  const handleAcceptAll = () => {
    const full: ConsentState = { essential: true, analytics: true, functional: true };
    setPreferences(full);
    saveConsent(full);
    setConfirmationData({
      open: true,
      title: "Todos os Cookies Ativados",
      description: "Suas preferências foram salvas com sucesso e o consentimento foi registrado na base de dados da LGPD.",
      savedState: full,
    });
  };

  const handleAcceptEssential = () => {
    const essentialOnly: ConsentState = { essential: true, analytics: false, functional: false };
    setPreferences(essentialOnly);
    saveConsent(essentialOnly);
    setConfirmationData({
      open: true,
      title: "Apenas Cookies Essenciais Ativados",
      description: "Você optou por ativar apenas os cookies estritamente necessários. O registro foi salvo na base de dados.",
      savedState: essentialOnly,
    });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
    setConfirmationData({
      open: true,
      title: "Preferências Personalizadas Salvas",
      description: "Suas configurações de cookies foram salvas com sucesso.",
      savedState: preferences,
    });
  };

  return (
    <>
      {/* ── BANNER POP-UP INICIAL ────────────────────────────────────────── */}
      <AnimatePresence>
        {isVisible && !isModalOpen && !isPrivacyModalOpen && !confirmationData.open && (
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
                    <h4 className="text-base font-display font-black leading-tight" style={{ color: "#E8187A" }}>
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
              <p className="text-xs text-white/85 leading-relaxed mb-4 font-normal">
                Utilizamos cookies e tecnologias semelhantes para garantir o funcionamento seguro e aprimoramento da sua experiência no site do <strong>I Encontro Brasileiro de Direitos Humanos e Empresas</strong>, em conformidade com a LGPD.
              </p>

              {/* Policy Link */}
              <div className="mb-5">
                <button
                  type="button"
                  onClick={() => setIsPrivacyModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#E8187A] hover:underline font-bold cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Ler Política de Privacidade completa
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-white/10">
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

      {/* ── MODAL 1: PERSONALIZAR PREFERÊNCIAS ─────────────────────────────── */}
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
                    <h3 className="text-lg font-display font-black" style={{ color: "#E8187A" }}>
                      Personalizar Preferências
                    </h3>
                    <p className="text-xs text-white/60">
                      Escolha quais cookies autorizar no seu navegador (LGPD)
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
                        Sempre Ativo
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
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/15">
                <button
                  type="button"
                  onClick={() => setIsPrivacyModalOpen(true)}
                  className="text-xs text-white/70 hover:text-white underline cursor-pointer"
                >
                  Ver Política de Privacidade
                </button>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleSavePreferences}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-xs font-bold uppercase tracking-wider text-white transition-all text-center cursor-pointer"
                  >
                    Salvar Escolhas
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#E8187A] to-[#E05A3A] text-xs font-bold uppercase tracking-wider text-white shadow-md hover:brightness-110 active:scale-95 transition-all text-center cursor-pointer"
                  >
                    Aceitar Todos
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MODAL 2: CONFIRMAÇÃO DE SALVAMENTO NO LOCALSTORAGE ────────────── */}
      <AnimatePresence>
        {confirmationData.open && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmationData((prev) => ({ ...prev, open: false }))}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 110, damping: 18 }}
              className="relative w-full max-w-md bg-[#0C2540] border border-white/20 rounded-3xl p-6 text-white shadow-2xl z-10 overflow-hidden text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#4A8C3F]/20 border border-[#4A8C3F]/40 text-[#4A8C3F] flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-display font-black mb-2" style={{ color: "#FFFFFF" }}>
                {confirmationData.title}
              </h3>
              
              <p className="text-xs text-white/80 leading-relaxed mb-6">
                {confirmationData.description}
              </p>

              {/* Status do localStorage em tempo real */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left text-xs mb-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Essenciais (Navegação):</span>
                  <span className="font-bold text-[#4A8C3F]">Ativo</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Analytics &amp; Desempenho:</span>
                  <span className={`font-bold ${confirmationData.savedState.analytics ? "text-[#4A8C3F]" : "text-white/40"}`}>
                    {confirmationData.savedState.analytics ? "Ativo" : "Desativado"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Funcionalidade:</span>
                  <span className={`font-bold ${confirmationData.savedState.functional ? "text-[#4A8C3F]" : "text-white/40"}`}>
                    {confirmationData.savedState.functional ? "Ativo" : "Desativado"}
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 text-[10px] text-white/50">
                  <Info className="w-3 h-3 text-[#E8187A]" />
                  <span>Sincronizado com o painel GoAdopt (be.lgpd) &amp; localStorage</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setConfirmationData((prev) => ({ ...prev, open: false }));
                    setIsModalOpen(true);
                  }}
                  className="flex-1 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-xs font-bold text-white transition-all cursor-pointer"
                >
                  Alterar Escolhas
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmationData((prev) => ({ ...prev, open: false }))}
                  className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#E8187A] to-[#E05A3A] text-xs font-bold uppercase tracking-wider text-white shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MODAL 3: POLÍTICA DE PRIVACIDADE E PROTEÇÃO DE DADOS COMPLETA ───── */}
      <AnimatePresence>
        {isPrivacyModalOpen && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPrivacyModalOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Box Expandido */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
              className="relative w-full max-w-3xl bg-[#0C2540] border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl z-10 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/15 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E8187A]/15 border border-[#E8187A]/30 flex items-center justify-center text-[#E8187A]">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-black" style={{ color: "#E8187A" }}>
                      Política de Privacidade &amp; Proteção de Dados (LGPD)
                    </h3>
                    <p className="text-xs text-white/60">
                      Pacto Global da ONU - Rede Brasil · I Encontro Brasileiro de Direitos Humanos e Empresas 2026
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Document Text Content Extenso e Abrangente */}
              <div className="space-y-5 text-xs sm:text-sm leading-relaxed text-white/90 max-h-[72vh] overflow-y-auto pr-3 font-normal">
                <p>
                  Esta Política de Privacidade tem como objetivo informar aos visitantes, participantes e usuários como a <strong>Rede Brasil do Pacto Global da ONU</strong> realiza a coleta, utilização, armazenamento, tratamento e proteção de dados pessoais na plataforma digital do <strong>I Encontro Brasileiro de Direitos Humanos e Empresas 2026</strong>, nos termos da Lei Geral de Proteção de Dados Pessoais (Lei Federal nº 13.709/2018 — LGPD).
                </p>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="font-bold text-base" style={{ color: "#FFFFFF" }}>
                    1. Princípios e Compromisso com a Privacidade
                  </h4>
                  <p className="text-white/80">
                    Respeitamos a privacidade e a autodeterminação informativa dos titulares de dados. Todas as operações de tratamento de dados pessoais são pautadas pelos princípios da finalidade, adequação, necessidade, livre acesso, qualidade dos dados, transparência, segurança, prevenção e não discriminação.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="font-bold text-base" style={{ color: "#FFFFFF" }}>
                    2. Dados Pessoais Coletados e Finalidade do Tratamento
                  </h4>
                  <p className="text-white/80">
                    Coletamos e tratamos dados pessoais estritamente necessários para viabilizar o evento e garantir o seu correto funcionamento:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-white/80">
                    <li>
                      <strong>Formulário de Demonstração de Interesse / Credenciamento:</strong> Coletamos nome completo, e-mail corporativo, organização ou empresa representada, cargo e estado de atuação. A finalidade do tratamento é a análise de elegibilidade de convites, credenciamento no evento presencial na Cinemateca Brasileira e envio de comunicações institucionais oficiais relativas ao Encontro.
                    </li>
                    <li>
                      <strong>Dados de Navegação Técnica e Segurança:</strong> Registros de acesso (IP anônimo, data e hora, navegador e sistema operacional), necessários para o cumprimento da obrigação legal do Marco Civil da Internet (Lei nº 12.965/2014) e garantia da segurança contra acessos não autorizados.
                    </li>
                    <li>
                      <strong>Gestão de Consentimento e Cookies:</strong> Preferências sobre quais categorias de cookies o usuário autoriza durante a navegação no site.
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="font-bold text-base" style={{ color: "#FFFFFF" }}>
                    3. Uso de Cookies e Tecnologias de Rastreamento
                  </h4>
                  <p className="text-white/80">
                    Utilizamos cookies essenciais e, mediante o seu consentimento, cookies de desempenho/analytics e funcionalidades. Você pode alterar suas preferências de cookies a qualquer momento através do link <strong>"Preferências de Cookies"</strong> no rodapé do site.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="font-bold text-base" style={{ color: "#FFFFFF" }}>
                    4. Direitos dos Titulares de Dados (Artigo 18 da LGPD)
                  </h4>
                  <p className="text-white/80">
                    Você, na condição de titular dos dados pessoais, possui os seguintes direitos garantidos por lei:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-white/80">
                    <li>Confirmação da existência de tratamento e acesso facilitado aos dados;</li>
                    <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
                    <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
                    <li>Revogação do consentimento concedido anteriormente de forma gratuita e facilitada;</li>
                    <li>Eliminação dos dados pessoais tratados com base no consentimento.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="font-bold text-base" style={{ color: "#FFFFFF" }}>
                    5. Compartilhamento Seguro e Não-Comercialização
                  </h4>
                  <p className="text-white/80">
                    A Rede Brasil do Pacto Global da ONU <strong>não vende, aluga ou comercializa</strong> dados pessoais em nenhuma hipótese. Os dados poderão ser compartilhados unicamente com prestadores de serviços de tecnologia, infraestrutura e recepção estritamente indispensáveis para o credenciamento e execução do evento, mediante contratos que exigem integral conformidade com a LGPD e altos padrões de segurança da informação.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="font-bold text-base" style={{ color: "#FFFFFF" }}>
                    6. Encarregado pelo Tratamento de Dados (DPO) e Contato
                  </h4>
                  <p className="text-white/80">
                    Caso queira exercer qualquer um dos seus direitos de titular ou tenha dúvidas sobre este documento, entre em contato direto com o Encarregado de Proteção de Dados (DPO) pelo e-mail oficial:
                  </p>
                  <div className="p-3 rounded-xl bg-black/30 border border-white/10 text-[#E8187A] font-mono font-bold text-center">
                    privacidade@pactoglobal.org.br
                  </div>
                </div>
              </div>

              {/* Footer Button */}
              <div className="pt-4 border-t border-white/15 mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E8187A] to-[#E05A3A] text-xs font-bold uppercase tracking-wider text-white shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  Entendi e Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
