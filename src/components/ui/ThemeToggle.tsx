"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Bouton soleil/lune pour basculer entre thème clair et sombre.
 * Monté côté client uniquement pour éviter le flash de mauvaise icône (SSR).
 * Style aligné sur les boutons de Navbar : rounded-full, tokens de couleur.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // On attend le montage pour afficher l'icône correcte (hydratation safe)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    // Placeholder de même taille pour éviter le layout shift
    return (
      <div className="h-9 w-9 rounded-full" aria-hidden="true" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Passer en thème clair" : "Passer en thème sombre"}
      className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
