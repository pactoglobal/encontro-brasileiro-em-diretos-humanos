import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#programacao", label: "Programação" },
  { href: "#palestrantes", label: "Palestrantes" },
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
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-[#D8D4C7]/40 bg-[#F1EFEA]/90 backdrop-blur-xl shadow-sm py-2.5"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="dhe-container flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="shrink-0 py-1">
            <img
              src="/identity/logo-evento.png"
              alt="Encontro DH&E Brasil 2026"
              className={`w-auto object-contain transition-all duration-500 ${
                scrolled ? "h-8 sm:h-9" : "h-10 sm:h-12"
              }`}
            />
          </a>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="text-xs font-bold uppercase tracking-widest text-dhe-text-main/80 transition-colors hover:text-dhe-magenta"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA desktop */}
          <a
            href="#contato"
            onClick={(e) => handleNavClick(e, "#contato")}
            className="dhe-btn-primary hidden lg:inline-flex text-[10px] py-3 px-5"
          >
            Inscreva-se
          </a>

          {/* Hamburger (Touch target de 44px) */}
          <button
            type="button"
            className="lg:hidden flex items-center justify-center w-11 h-11 text-dhe-navy cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-x-0 top-[68px] z-40 border-b border-[#D8D4C7]/50 bg-[#F1EFEA]/98 backdrop-blur-xl px-5 pb-8 pt-4 lg:hidden shadow-lg"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className="block py-3.5 text-sm font-bold uppercase tracking-widest text-dhe-text-main/80 transition-colors hover:text-dhe-magenta"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contato"
              onClick={(e) => handleNavClick(e, "#contato")}
              className="dhe-btn-primary mt-6 w-full justify-center py-3.5"
            >
              Inscreva-se
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
