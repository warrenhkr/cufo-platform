// components/ui/Badge.tsx
import type { ReactNode } from "react";

type BadgeVariant =
  | "status"
  | "zone-qualification"
  | "zone-playoff"
  | "zone-relegation"
  | "player"
  | "neutral";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  status: "bg-muted text-muted-foreground",
  "zone-qualification": "bg-emerald-500/15 text-emerald-600",
  "zone-playoff": "bg-accent/20 text-accent-foreground",
  "zone-relegation": "bg-destructive/15 text-destructive",
  player: "bg-accent/15 text-accent-foreground",
  neutral: "bg-primary/10 text-primary",
};

/**
 * Badge générique du design system — pour les zones de classement, les
 * badges joueur (ex. "Capitaine", "Top buteur"), les étiquettes de statut
 * ponctuelles. Le statut de match en direct reste géré à part par
 * `LiveStatusBadge`, qui a son propre crossfade animé entre états.
 */
export function Badge({ children, variant = "neutral", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}