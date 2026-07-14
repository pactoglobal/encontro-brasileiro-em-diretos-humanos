import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const EDITABLE_SELECTOR = "input, textarea";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [overEditable, setOverEditable] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      // Sobre input/textarea, cede o lugar ao cursor de texto (I-beam) nativo
      const target = e.target as HTMLElement | null;
      setOverEditable(!!target?.closest(EDITABLE_SELECTOR));
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  if (!isVisible || overEditable) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      {/* Seta estilizada */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="drop-shadow-lg"
      >
        <path
          d="M4 4L12 20L14.5 13.5L20 12L4 4Z"
          fill="#FAF9F6"
          stroke="#0C2540"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}