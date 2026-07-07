import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#palestrantes", label: "Palestrantes" },
  { href: "#atracoes", label: "Atrações" },
  { href: "#programacao", label: "Programação" },
  { href: "#local", label: "Local" },
  { href: "#organizadores", label: "Organizadores" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{ paddingTop: scrolled ? "0.5rem" : "1rem" }}
      >
        {/* ─── Capsule Container ─── */}
        <nav
          className="dhe-container"
        >
          <div
            className="flex items-center justify-between transition-all duration-500 mx-auto"
            style={{
              maxWidth: scrolled ? "100%" : "960px",
              background: scrolled
                ? "rgba(241,239,234,0.92)"
                : "rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px) saturate(1.4)",
              WebkitBackdropFilter: "blur(20px) saturate(1.4)",
              borderRadius: scrolled ? "16px" : "9999px",
              border: scrolled
                ? "1px solid rgba(216,212,199,0.6)"
                : "1px solid rgba(255,255,255,0.15)",
              boxShadow: scrolled
                ? "0 4px 24px rgba(12,37,64,0.08)"
                : "0 4px 32px rgba(0,0,0,0.15)",
              padding: scrolled ? "0.5rem 1.25rem" : "0.5rem 0.5rem 0.5rem 1.25rem",
            }}
          >
            {/* Logo */}
            <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="shrink-0">
              <img
                src="/identity/logo-evento.png"
                alt="Encontro DH&E Brasil 2026"
                className="w-auto object-contain transition-all duration-500"
                style={{
                  height: scrolled ? "28px" : "26px",
                  filter: scrolled ? "none" : "brightness(0) invert(1)",
                }}
              />
            </a>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] transition-all duration-200"
                    style={{
                      color: scrolled ? "rgba(28,35,41,0.7)" : "rgba(255,255,255,0.75)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = scrolled
                        ? "rgba(12,37,64,0.06)"
                        : "rgba(255,255,255,0.12)";
                      e.currentTarget.style.color = scrolled ? "#E8187A" : "#ffffff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = scrolled
                        ? "rgba(28,35,41,0.7)"
                        : "rgba(255,255,255,0.75)";
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA button */}
            <a
              href="#contato"
              onClick={(e) => handleNavClick(e, "#contato")}
              className="hidden lg:inline-flex items-center justify-center text-[10px] font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300"
              style={{
                padding: "0.5rem 1.25rem",
                background: "#E8187A",
                color: "#fff",
                boxShadow: "0 2px 12px rgba(232,24,122,0.3)",
              }}
            >
              Inscreva-se
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all duration-200"
              style={{
                background: scrolled ? "rgba(12,37,64,0.06)" : "rgba(255,255,255,0.12)",
                color: scrolled ? "#0C2540" : "#fff",
              }}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {menuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile fullscreen overlay */}
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
            <div className="absolute inset-0 bg-[#0C2540]/95 backdrop-blur-xl" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center gap-2 mb-10"
              >
                {NAV_LINKS.map(({ href, label }, i) => (
                  <li key={href}>
                    <motion.a
                      href={href}
                      onClick={(e) => handleNavClick(e, href)}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.04 }}
                      className="block py-3 text-lg font-display font-black uppercase tracking-widest text-white/80 hover:text-dhe-magenta transition-colors text-center"
                    >
                      {label}
                    </motion.a>
                  </li>
                ))}
              </motion.ul>

              <motion.a
                href="#contato"
                onClick={(e) => handleNavClick(e, "#contato")}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="dhe-btn-primary px-10 py-4"
              >
                Inscreva-se
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
