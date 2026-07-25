// lib/useCountUp.ts
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

/**
 * Compte de 0 jusqu'à `target` une seule fois, quand l'élément entre
 * dans le viewport (3.9 — "Chiffres du bloc résumé : count-up à l'arrivée
 * sur l'écran, une seule fois").
 */
export function useCountUp<T extends HTMLElement = HTMLElement>(
  target: number,
  durationMs = 900,
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
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, durationMs]);

  return { ref, value };
}