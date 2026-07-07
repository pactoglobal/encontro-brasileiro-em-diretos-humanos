import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Speakers } from "./components/Speakers";
import { Attractions } from "./components/Attractions";
import { Agenda } from "./components/Agenda";
import { Venue } from "./components/Venue";
import { Organizers } from "./components/Organizers";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";

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
    <>
      <CustomCursor />
      <Navbar />
      <main>
        {/* ATO 1 — A PROMESSA & APRESENTAÇÃO */}
        <Hero />
        <About />
        <Speakers />

        {/* ATO 2 — CRONOGRAMA & CONTEÚDO */}
        <Agenda />
        
        {/* ATO 3 — VIVENCIAL & ATRAÇÕES */}
        <Venue />
        <Attractions />

        {/* ATO 4 — APOIO & CONVERSÃO */}
        <Organizers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
