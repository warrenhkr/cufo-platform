"use client";

import { motion } from "motion/react";
import { usePlayOnce } from "@/lib/hooks/use-play-once";

export function NetMotif() {
  const shouldAnimate = usePlayOnce("motif-net-results");

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="net-mesh" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M0 0 L28 28 M28 0 L0 28" stroke="var(--border)" strokeWidth="1" />
        </pattern>
      </defs>
      <motion.rect
        width="100%"
        height="100%"
        fill="url(#net-mesh)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={shouldAnimate ? { duration: 1.2, ease: "easeOut" } : { duration: 0 }}
      />
    </svg>
  );
}