// components/totw/TotwPitch.tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { TotwPlayer } from "@/lib/totw-mock-data";

interface TotwPitchProps {
  players: TotwPlayer[];
}

/** Doc 14.2 — visualisation en formation de terrain. Terrain vertical
 * (fonctionne mobile + desktop) ; la variante horizontale desktop décrite
 * dans la doc n'est pas implémentée dans cette passe. */
export function TotwPitch({ players }: TotwPitchProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="relative mx-auto aspect-[2/3] w-full max-w-md overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-emerald-700 to-emerald-800">
      {/* Lignes de terrain, en SVG pour rester nettes à toute taille */}
      <svg viewBox="0 0 100 150" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <g stroke="white" strokeOpacity="0.35" strokeWidth="0.5" fill="none">
          <rect x="2" y="2" width="96" height="146" />
          <line x1="2" y1="75" x2="98" y2="75" />
          <circle cx="50" cy="75" r="12" />
          <rect x="25" y="2" width="50" height="18" />
          <rect x="25" y="130" width="50" height="18" />
        </g>
      </svg>

      {players.map((player, index) => (
        <motion.button
          key={player.id}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.04 }}
          onClick={() => setActiveId(activeId === player.id ? null : player.id)}
          style={{ left: `${player.x}%`, top: `${player.y}%` }}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-bold text-emerald-800 shadow-md">
            {player.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
          </span>
          <span className="max-w-[70px] truncate rounded-full bg-black/40 px-1.5 py-0.5 text-[10px] font-medium text-white">
            {player.name.split(" ")[0]}
          </span>
        </motion.button>
      ))}

      {activeId && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-x-3 bottom-3 rounded-2xl bg-card/95 p-3 backdrop-blur-xl"
        >
          {(() => {
            const p = players.find((pl) => pl.id === activeId)!;
            return (
              <>
                <p className="font-heading text-sm font-semibold text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.team} · {p.statLabel}</p>
              </>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
}