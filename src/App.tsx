import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Speakers } from "./components/Speakers";
import { Attractions } from "./components/Attractions";
import { Agenda } from "./components/Agenda";
import { Venue } from "./components/Venue";
import { Organizers } from "./components/Organizers";
import { Sponsorship } from "./components/Sponsorship";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

// Robust routing support for hash URLs on initial load (like /#/sobre)
function useHashScroll() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Capture standard #sobre or hash routers like #/sobre
    const rawHash = window.location.hash;
    const cleanId = rawHash.replace("#/", "").replace("#", "");
    if (!cleanId) return;

    let cancelled = false;

    const scrollToHash = (): boolean => {
      if (cancelled) return false;
      const el = document.getElementById(cleanId);
      if (!el) return false;
      
      const top = el.getBoundingClientRect().top + window.pageYOffset - 96;
      window.scrollTo({ top, behavior: "instant" });
      return true;
    };

    // Delay measurement to ensure React rendering is completed
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (scrollToHash()) return;

        // Fallback polling for dynamically rendered components
        let attempts = 0;
        const interval = setInterval(() => {
          if (scrollToHash() || ++attempts >= 30) clearInterval(interval);
        }, 100);
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);
}

function App() {
  useHashScroll();

  return (
    // reducedMotion="user": respeita prefers-reduced-motion do sistema em todo
    // motion.* da árvore (springs, hover, Ken Burns, flip do countdown) sem
    // precisar tocar cada componente individualmente.
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        {/* ATO 1 — A PROMESSA & APRESENTAÇÃO */}
        <Hero />
        <About />

        {/* ATO 2 — CRONOGRAMA & CONTEÚDO */}
        <Agenda />

        {/* ATO 3 — QUEM FAZ ACONTECER */}
        <Speakers />

        {/* ATO 4 — VIVENCIAL & ATRAÇÕES */}
        <Venue />
        <Attractions />

        {/* ATO 5 — APOIO & CONVERSÃO */}
        <Organizers />
        <Sponsorship />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}

export default App;
