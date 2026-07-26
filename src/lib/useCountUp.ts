// lib/useCountUp.ts
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Compte de 0 jusqu'à `target` une seule fois, quand l'élément entre
 * dans le viewport (3.9). Courbe ease-in-out : légère accélération au
 * démarrage, arrêt naturel en douceur plutôt qu'un freinage brutal.
 */
export function useCountUp<T extends HTMLElement = HTMLElement>(
  target: number,
  durationMs = 1000,
) {
  const ref = useRef<T | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      setValue(Math.round(easeInOutCubic(progress) * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, durationMs]);

  return { ref, value };
}