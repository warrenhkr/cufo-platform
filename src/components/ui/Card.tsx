// components/ui/Card.tsx
import type { ElementType, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** "onDark" pour un fond sombre (ex. bandeau hero) ; "elevated" pour une
   *  carte détachée du fond, opaque, avec une ombre marquée (ex. modales,
   *  carte mise en avant) plutôt que le glassmorphism translucide standard */
  tone?: "light" | "onDark" | "elevated";
}

export function Card({ children, className = "", as: Tag = "div", tone = "light" }: CardProps) {
  const toneStyles: Record<NonNullable<CardProps["tone"]>, string> = {
    light: "border-border bg-card/80 backdrop-blur-xl shadow-lg",
    onDark:
      "border-primary-foreground/15 bg-primary-foreground/10 text-primary-foreground backdrop-blur-xl shadow-lg",
    elevated: "border-border/60 bg-card shadow-xl",
  };

  return <Tag className={`rounded-2xl border ${toneStyles[tone]} ${className}`}>{children}</Tag>;
}