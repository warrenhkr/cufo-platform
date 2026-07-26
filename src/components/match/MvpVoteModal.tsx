// components/match/MvpVoteModal.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check } from "lucide-react";
import type { MvpCandidate } from "@/lib/match-types";

interface MvpVoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidates: MvpCandidate[];
  remainingSeconds: number;
  hasVotedBefore: boolean;
  onVoteSubmitted: () => void;
}

type VoteState = "voting" | "already_voted" | "submitted" | "closed";

function formatTime(total: number) {
  const m = Math.floor(total / 60).toString().padStart(2, "0");
  const s = (total % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

/** Doc 14.1 — écran de vote Homme du Match complet. Bandeau non-intrusif
 * (4.12) : cette modale s'ouvre uniquement sur action explicite de
 * l'utilisateur (clic sur "Voter maintenant"), jamais imposée. */
export function MvpVoteModal({
  isOpen,
  onClose,
  candidates,
  remainingSeconds,
  hasVotedBefore,
  onVoteSubmitted,
}: MvpVoteModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [voteState, setVoteState] = useState<VoteState>(hasVotedBefore ? "already_voted" : "voting");
  const [secondsLeft, setSecondsLeft] = useState(remainingSeconds);

  // Ré-initialise voteState quand la modale s'ouvre, sans passer par un effet
  // (pattern recommandé par React pour ajuster un state suite au changement
  // d'une prop, cf. "Adjusting state based on a prop change").
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setVoteState(hasVotedBefore ? "already_voted" : "voting");
    }
  }

  useEffect(() => {
    if (!isOpen || voteState !== "voting") return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          setVoteState("closed");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, voteState]);

  const handleConfirm = () => {
    if (!selectedId) return;
    setVoteState("submitted");
    onVoteSubmitted();
  };

  const winner = candidates[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 sm:items-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="w-full max-w-md rounded-t-3xl bg-card p-6 sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-xl font-semibold uppercase text-foreground">
                Homme du match
              </h2>
              <button onClick={onClose} className="text-muted-foreground" aria-label="Fermer">
                <X size={20} />
              </button>
            </div>

            {voteState === "voting" && (
              <>
                <p className="mb-1 text-sm text-muted-foreground">Vote ouvert pendant 15 minutes</p>
                <p className="mb-4 text-xs font-semibold text-secondary">
                  Encore {formatTime(secondsLeft)}
                </p>
                <p className="mb-4 text-sm text-foreground">
                  Qui a fait la différence dans ce match ? À toi de voter.
                </p>

                <div className="mb-5 flex flex-col gap-2">
                  {candidates.map((candidate) => (
                    <button
                      key={candidate.id}
                      onClick={() => setSelectedId(candidate.id)}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
                        selectedId === candidate.id
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card/40 hover:bg-muted"
                      }`}
                    >
                      <span className="text-sm font-medium text-foreground">{candidate.name}</span>
                      {selectedId === candidate.id && <Check size={16} className="text-primary" />}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleConfirm}
                  disabled={!selectedId}
                  className="w-full rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Confirmer mon vote
                </button>
              </>
            )}

            {voteState === "already_voted" && (
              <div className="flex flex-col items-center gap-2 py-6 text-center">
                <p className="text-sm font-medium text-foreground">
                  Tu as déjà voté pour ce match.
                </p>
              </div>
            )}

            {voteState === "submitted" && (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check size={24} />
                </div>
                <p className="font-heading text-lg font-semibold text-foreground">Vote enregistré.</p>
                <p className="text-sm text-muted-foreground">Résultat annoncé à la fin du décompte.</p>
              </div>
            )}

            {voteState === "closed" && (
              <div className="flex flex-col items-center gap-2 py-6 text-center">
                <p className="font-heading text-lg font-semibold uppercase text-foreground">Vote terminé</p>
                <p className="text-sm text-muted-foreground">
                  Le Homme du match est {winner?.name} avec 62% des voix.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}