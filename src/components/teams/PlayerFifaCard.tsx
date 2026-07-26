// components/teams/PlayerFifaCard.tsx
"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, UserRound, Share2 } from "lucide-react";
import type { Player } from "@/lib/team-types";
import type { Team } from "@/lib/types";

interface PlayerFifaCardProps {
  player: Player;
  team: Team;
  open: boolean;
  onClose: () => void;
}

const ATTRIBUTE_LABELS: { key: keyof Player["attributes"]; label: string }[] = [
  { key: "speed", label: "Vitesse" },
  { key: "shooting", label: "Tir" },
  { key: "passing", label: "Passe" },
  { key: "dribbling", label: "Dribble" },
  { key: "defense", label: "Défense" },
  { key: "physical", label: "Physique" },
];

export function PlayerFifaCard({ player, team, open, onClose }: PlayerFifaCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [exportState, setExportState] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleExport() {
    if (!cardRef.current) return;
    setExportState("loading");
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `${player.name.replace(/\s+/g, "-").toLowerCase()}-footucao.png`;
      link.href = dataUrl;
      link.click();
      setExportState("success");
    } catch {
      setExportState("error");
    } finally {
      setTimeout(() => setExportState("idle"), 3000);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.2 }}
            className="relative flex flex-col items-center gap-5"
            style={{ perspective: 800 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-10 right-0 text-white/80 hover:text-white"
              aria-label="Fermer"
            >
              <X size={22} />
            </button>

            <motion.div
              ref={cardRef}
              whileHover={{ rotateY: 4 }}
              transition={{ duration: 0.15 }}
              style={{ transformStyle: "preserve-3d" }}
              className="flex w-72 flex-col items-center gap-4 rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-xl"
            >
              <div className="flex w-full items-start justify-between">
                <span className="font-heading text-4xl font-extrabold text-primary">{player.number}</span>
                {player.badge && (
                  <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[10px] font-bold uppercase text-accent-foreground">
                    {player.badge}
                  </span>
                )}
              </div>

              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                {player.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={player.photoUrl} alt={player.name} className="h-full w-full rounded-full object-cover" />
                ) : (
                  <UserRound size={40} className="text-muted-foreground" />
                )}
              </div>

              <div className="text-center">
                <p className="font-heading text-lg font-bold uppercase text-foreground">{player.name}</p>
                <p className="text-sm text-muted-foreground">{player.position} · {team.name}</p>
              </div>

              <div className="grid w-full grid-cols-2 gap-x-4 gap-y-2">
                {ATTRIBUTE_LABELS.map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-heading font-bold text-foreground">{player.attributes[key]}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <button
              onClick={handleExport}
              disabled={exportState === "loading"}
              title="Partage cette carte sur WhatsApp ou Instagram"
              className="flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90 disabled:opacity-70"
            >
              <Share2 size={16} />
              {exportState === "loading" ? "Génération…" : "Exporter en image"}
            </button>

            {exportState === "success" && (
              <p className="text-sm font-medium text-white">Carte téléchargée. Prête à être partagée !</p>
            )}
            {exportState === "error" && (
              <p className="text-sm font-medium text-destructive">L&apos;export a échoué. Réessaie dans un instant.</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}