// components/ui/Button.tsx
"use client";

import { forwardRef } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { hoverPress } from "@/lib/motion";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "live";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  icon?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  ghost: "bg-transparent text-foreground hover:bg-muted",
  outline: "border border-border bg-transparent text-foreground hover:bg-muted",
  live: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3.5 text-base",
};

/**
 * Bouton de base du design system. `variant="live"` est réservé aux
 * actions liées à un match en direct (ex. "Suivre en direct") — même
 * apparence que "secondary" pour l'instant, séparé pour pouvoir évoluer
 * indépendamment (ex. glow) sans toucher aux boutons génériques.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", children, icon, className = "", disabled, ...props }, ref) => {
    const reduceMotion = useReducedMotion();
    const pressAnim = hoverPress(!!reduceMotion);

    return (
      <motion.button
        ref={ref}
        disabled={disabled}
        className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...pressAnim}
        {...props}
      >
        {icon}
        {children}
      </motion.button>
    );
  }
);
// ...après sizeStyles, avant le composant Button :

/**
 * Classes du bouton sans le wrapper <motion.button> — pour styliser un
 * <Link> ou tout autre élément qui doit avoir l'apparence d'un bouton du
 * design system sans en être un techniquement (ex. CTA de navigation).
 */
export function buttonClassName(variant: ButtonVariant = "primary", size: ButtonSize = "md", className = "") {
  return `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
}
Button.displayName = "Button";