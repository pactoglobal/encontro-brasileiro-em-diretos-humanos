import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Ordem alinhada ao DOM real em App.tsx (Sobre → Programação → Palestrantes → Local → Atrações → Organizadores → Contato)
const NAV_LINKS = [
  { id: "sobre", href: "#/sobre", label: "Sobre" },
  { id: "programacao", href: "#/programacao", label: "Programação" },
  { id: "palestrantes", href: "#/palestrantes", label: "Palestrantes" },
  { id: "local", href: "#/local", label: "Local" },
  { id: "atracoes", href: "#/atracoes", label: "Atrações" },
  { id: "organizadores", href: "#/organizadores", label: "Organizadores" },
  { id: "contato", href: "#/contato", label: "Contato" },
];

const SECTIONS = NAV_LINKS.map((link) => link.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const handleScroll = useCallback(() => {
    // Threshold set to 60px for a more natural activation point
    const currentScroll = window.scrollY;
    setScrolled(currentScroll > 60);

    // Track active section based on proximity to viewport top
    for (const id of [...SECTIONS].reverse()) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        // If element top is close to header height (120px)
        if (rect.top <= 140) {
          setActiveSection(id);
          history.replaceState(null, "", `#/${id}`);
          return;
        }
      }
    }

    // Fallback to hero/top
    if (currentScroll < 100) {
      setActiveSection("hero");
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    // Delay listener slightly to let hash scrolling complete first
    const timeout = setTimeout(handleScroll, 800);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;

    const offset = scrolled ? 90 : 110;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;

    history.pushState(null, "", `#/${id}`);
    window.scrollTo({ top, behavior: "smooth" });
    setActiveSection(id);
  }, [scrolled]);

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-50 pointer-events-none"
        animate={{
          y: 0,
          paddingTop: scrolled ? "12px" : "24px",
        }}
        transition={{ type: "spring", stiffness: 180, damping: 24 }}
      >
        <nav className="dhe-container" aria-label="Navegação principal">
          <motion.div
            className="pointer-events-auto flex items-center justify-between mx-auto"
            animate={{
              maxWidth: scrolled ? "1040px" : "1180px",
              padding: scrolled ? "10px 20px" : "14px 28px",
              borderRadius: scrolled ? "24px" : "9999px",
              backgroundColor: scrolled ? "rgba(241, 239, 234, 0.94)" : "rgba(255, 255, 255, 0.05)",
              borderColor: scrolled ? "rgba(216, 212, 199, 0.8)" : "rgba(255, 255, 255, 0.1)",
              boxShadow: scrolled ? "0 10px 40px rgba(12, 37, 64, 0.06)" : "0 8px 32px rgba(0, 0, 0, 0.08)",
            }}
            transition={{ type: "spring", stiffness: 180, damping: 24 }}
            style={{
              backdropFilter: "blur(24px) saturate(1.4)",
              WebkitBackdropFilter: "blur(24px) saturate(1.4)",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="shrink-0 cursor-pointer flex items-center focus:outline-none"
            >
              <motion.img
                src="/identity/logo-evento.png"
                alt="Encontro DH&E Brasil 2026"
                width={625}
                height={429}
                className="w-auto object-contain transition-all duration-300"
                style={{
                  height: scrolled ? "30px" : "33px",
                  filter: scrolled ? "none" : "brightness(0) invert(1)",
                }}
              />
            </button>

            {/* Desktop Navigation Links */}
            <ul className="hidden lg:flex items-center gap-1.5">
              {NAV_LINKS.map(({ id, label }) => {
                const isActive = activeSection === id;
                return (
                  <li key={id} className="relative">
                    <button
                      onClick={() => scrollTo(id)}
                      className="px-3.5 py-2 rounded-full text-[10px] font-sans font-extrabold uppercase tracking-[0.12em] transition-all duration-300 relative focus:outline-none cursor-pointer"
                      style={{
                        color: isActive
                          ? (scrolled ? "#E8187A" : "#FFFFFF")
                          : (scrolled ? "rgba(28,35,41,0.6)" : "rgba(255,255,255,0.65)"),
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = scrolled ? "#0C2540" : "#FFFFFF";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = scrolled
                            ? "rgba(28,35,41,0.6)"
                            : "rgba(255,255,255,0.65)";
                        }
                      }}
                    >
                      {label}
                      {/* Active Indicator Sliding Highlight (layoutId) */}
                      {isActive && (
                        <motion.span
                          layoutId="activeUnderline"
                          className="absolute bottom-0 left-3.5 right-3.5 h-0.5 rounded-full"
                          style={{
                            backgroundColor: scrolled ? "#E8187A" : "#FFFFFF",
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* CTA Button */}
            <button
              onClick={() => scrollTo("contato")}
              className="hidden lg:inline-flex items-center justify-center text-[10px] font-sans font-extrabold uppercase tracking-[0.12em] rounded-full transition-all duration-300 cursor-pointer focus:outline-none hover:shadow-lg"
              style={{
                padding: scrolled ? "10px 22px" : "12px 26px",
                background: scrolled ? "#E8187A" : "#FFFFFF",
                color: scrolled ? "#FFFFFF" : "#0C2540",
                boxShadow: scrolled ? "0 4px 14px rgba(232,24,122,0.25)" : "0 4px 14px rgba(255,255,255,0.15)",
              }}
            >
              Tenho interesse
            </button>

            {/* Mobile: CTA + Hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              {/* CTA Mobile */}
              <button
                onClick={() => scrollTo("contato")}
                className="inline-flex items-center justify-center text-[9px] font-sans font-extrabold uppercase tracking-[0.1em] rounded-full transition-all duration-300 cursor-pointer focus:outline-none"
                style={{
                  padding: "8px 14px",
                  background: scrolled ? "#E8187A" : "#FFFFFF",
                  color: scrolled ? "#FFFFFF" : "#0C2540",
                  boxShadow: scrolled
                    ? "0 4px 14px rgba(232,24,122,0.25)"
                    : "0 4px 14px rgba(255,255,255,0.15)",
                }}
              >
                Tenho interesse
              </button>

              {/* Hamburger */}
              <button
                type="button"
                className="flex items-center justify-center w-11 h-11 rounded-full cursor-pointer transition-all duration-300 focus:outline-none"
                style={{
                  background: scrolled ? "rgba(12,37,64,0.06)" : "rgba(255,255,255,0.12)",
                  color: scrolled ? "#0C2540" : "#FFFFFF",
                }}
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        </nav>
      </motion.header>

      {/* Mobile Fullscreen Navigation Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#0C2540]/80 backdrop-blur-2xl" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center gap-1 mb-10 w-full max-w-xs"
              >
                {NAV_LINKS.map(({ id, label }, i) => {
                  const isActive = activeSection === id;
                  return (
                    <li key={id} className="w-full text-center">
                      <motion.button
                        onClick={() => scrollTo(id)}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.04 }}
                        className="w-full py-4 text-base font-display font-black uppercase tracking-widest transition-colors focus:outline-none cursor-pointer"
                        style={{
                          color: isActive ? "#E8187A" : "rgba(255, 255, 255, 0.75)",
                        }}
                      >
                        {label}
                      </motion.button>
                    </li>
                  );
                })}
              </motion.ul>

              <motion.button
                onClick={() => scrollTo("contato")}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="dhe-btn-primary px-12 py-4 shadow-lg focus:outline-none cursor-pointer"
              >
                Tenho interesse
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
