// components/ui/Card.tsx
import type { ElementType, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Carte plus contrastée pour un fond sombre (ex. bandeau hero navy) */
  tone?: "light" | "onDark";
}

/**
 * Carte de base "iOS glassmorphism" : coins 16–24px, fond translucide,
 * léger flou, bordure fine. Sert de socle à MatchStatusCard, aux cartes
 * joueur/actu, etc. — composer par-dessus plutôt que dupliquer les styles.
 */
export function Card({
  children,
  className = "",
  as: Tag = "div",
  tone = "light",
}: CardProps) {
  const toneStyles =
    tone === "onDark"
      ? "border-primary-foreground/15 bg-primary-foreground/10 text-primary-foreground backdrop-blur-xl"
      : "border-border bg-card/80 backdrop-blur-xl";

  return (
    <Tag className={`rounded-2xl border shadow-lg ${toneStyles} ${className}`}>
      {children}
    </Tag>
  );
}