// components/match/MvpVoteBanner.tsx
"use client";

interface MvpVoteBannerProps {
  remainingSeconds: number;
}

function formatRemaining(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  return `${minutes} min`;
}

/**
 * Doc 4.4 — Bandeau non-intrusif, jamais de modale forcée (4.12).
 * L'écran de vote complet (choix des joueurs, confirmation) est détaillé
 * en section 14 — ce bandeau ouvre ce flux, pas encore branché ici.
 */
export function MvpVoteBanner({ remainingSeconds }: MvpVoteBannerProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/60 px-5 py-4 backdrop-blur-xl sm:flex-row sm:justify-between">
      <div>
        <p className="font-heading text-lg font-semibold uppercase text-foreground">
          Vote Homme du Match
        </p>
        <p className="text-sm text-muted-foreground">
          Il te reste {formatRemaining(remainingSeconds)} pour voter
        </p>
      </div>
      <button className="w-full shrink-0 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90 sm:w-auto">
        Voter maintenant
      </button>
    </div>
  );
}