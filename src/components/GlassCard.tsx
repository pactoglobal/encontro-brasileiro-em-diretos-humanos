import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

// Tipos das variantes de glass
type GlassVariant = "default" | "highlight" | "dark" | "accent";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  variant?: GlassVariant;
  accentColor?: string;
  showBorder?: boolean;
  hoverable?: boolean;
}

// Configuração de variantes com cores ODS
const VARIANT_STYLES: Record<GlassVariant, { bg: string; border: string; text: string }> = {
  default: {
    bg: "rgba(255,255,255,0.07)",
    border: "rgba(255,255,255,0.1)",
    text: "#FAF9F6",
  },
  highlight: {
    bg: "rgba(232,24,122,0.08)",
    border: "rgba(232,24,122,0.25)",
    text: "#FAF9F6",
  },
  dark: {
    bg: "rgba(12,37,64,0.15)",
    border: "rgba(12,37,64,0.3)",
    text: "#FAF9F6",
  },
  accent: {
    bg: "rgba(74,140,63,0.08)",
    border: "rgba(74,140,63,0.25)",
    text: "#FAF9F6",
  },
};

export function GlassCard({
  children,
  variant = "default",
  accentColor,
  showBorder = true,
  hoverable = false,
  className = "",
  style,
  ...props
}: GlassCardProps) {
  const variantStyle = VARIANT_STYLES[variant];
  const borderColor = accentColor ? `${accentColor}40` : variantStyle.border;
  const bgColor = accentColor ? `${accentColor}14` : variantStyle.bg;

  return (
    <motion.div
      className={`rounded-2xl p-5 sm:p-6 ${hoverable ? "cursor-default" : ""} ${className}`}
      style={{
        background: bgColor,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: showBorder ? `1px solid ${borderColor}` : "none",
        color: variantStyle.text,
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Componente especializados para bento grid
interface BentoItemProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  colSpan?: 1 | 2 | 3 | 4;
  accentColor?: string;
}

export function BentoItem({
  children,
  colSpan = 1,
  accentColor,
  className = "",
  style,
  ...props
}: BentoItemProps) {
  const colSpanClass = {
    1: "",
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
  }[colSpan];

  return (
    <motion.div
      className={`rounded-2xl p-4 sm:p-5 ${colSpanClass} ${className}`}
      style={{
        background: accentColor ? `${accentColor}12` : "rgba(255,255,255,0.05)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: accentColor ? `1px solid ${accentColor}30` : "1px solid rgba(255,255,255,0.08)",
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Badge glass com cor accent
interface GlassBadgeProps {
  children: ReactNode;
  color?: string;
  className?: string;
}

export function GlassBadge({ children, color = "#E8187A", className = "" }: GlassBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full ${className}`}
      style={{
        background: `${color}20`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${color}35`,
        color: color,
      }}
    >
      {children}
    </span>
  );
}

// Container principal para seções com glass background
interface GlassSectionProps {
  children: ReactNode;
  variant?: "light" | "dark" | "gradient";
  className?: string;
}

export function GlassSection({ children, variant = "light", className = "" }: GlassSectionProps) {
  const variantStyle = {
    light: "bg-white/5",
    dark: "bg-[#0C2540]/80",
    gradient: "bg-gradient-to-br from-white/8 to-white/3",
  }[variant];

  return (
    <div
      className={`relative overflow-hidden ${variantStyle} ${className}`}
      style={{
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      {children}
    </div>
  );
}