"use client";

import { useEffect, useState } from "react";

/**
 * true uniquement la première fois que cette clé est vue pendant la session
 * (jamais true si l'utilisateur préfère moins d'animations).
 *
 * Le state démarre à `false` pour matcher le rendu serveur (sessionStorage
 * et matchMedia n'existent pas en SSR), puis bascule à `true` côté client
 * si c'est la première visite — un aller-retour de rendu volontaire ici,
 * donc la règle set-state-in-effect est désactivée sciemment sur cette ligne.
 */
export function usePlayOnce(storageKey: string) {
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const alreadyPlayed = sessionStorage.getItem(storageKey);
    if (!alreadyPlayed) {
      sessionStorage.setItem(storageKey, "1");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture ponctuelle d'une API navigateur indisponible en SSR ; le 2e rendu côté client est nécessaire, pas une dérivation d'état à corriger.
      setShouldPlay(true);
    }
  }, [storageKey]);

  return shouldPlay;
}