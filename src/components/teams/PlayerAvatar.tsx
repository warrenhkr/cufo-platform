// components/teams/PlayerAvatar.tsx
"use client";

import { Shirt } from "lucide-react";

interface PlayerAvatarProps {
  name: string;
  photoUrl: string | null;
  size?: number;
  className?: string;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

/**
 * Avatar joueur avec fallback élégant quand `photoUrl` est null (le CRM
 * n'a pas encore de photo). Le fallback combine un dégradé navy → or, un
 * maillot en filigrane, et les initiales du joueur — plutôt qu'une icône
 * générique isolée.
 */
export function PlayerAvatar({ name, photoUrl, size = 96, className = "" }: PlayerAvatarProps) {
  if (photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photoUrl}
        alt={name}
        style={{ width: size, height: size }}
        className={`rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-primary to-[color-mix(in_oklch,var(--primary)_60%,var(--accent))] ${className}`}
    >
      <Shirt size={size * 0.55} strokeWidth={1.25} className="absolute text-primary-foreground/15" />
      <span className="relative font-heading font-bold text-primary-foreground" style={{ fontSize: size * 0.32 }}>
        {getInitials(name)}
      </span>
    </div>
  );
}