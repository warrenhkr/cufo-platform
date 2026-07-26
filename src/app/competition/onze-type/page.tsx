// app/competition/onze-type/page.tsx
"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { TotwPitch } from "@/components/totw/TotwPitch";
import { totwPlayers, totwMatchdayLabel } from "@/lib/totw-mock-data";

type ExportState = "idle" | "generating" | "done";

/** Doc 14.2 — Onze-Type de la semaine. Page accessible par URL directe,
 * pas encore reliée au menu (module contextuel selon la doc, à intégrer
 * dans Compétition ou Équipes quand on décidera de l'emplacement). */
export default function TotwPage() {
  const [exportState, setExportState] = useState<ExportState>("idle");

  const handleExport = async () => {
    setExportState("generating");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setExportState("done");
  };

  return (
    <Container className="flex flex-col items-center py-8 text-center sm:py-10">
      <h1 className="font-heading text-3xl font-semibold uppercase tracking-wide text-foreground">
        Le Onze-Type de la semaine
      </h1>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        Les meilleurs joueurs de la {totwMatchdayLabel}, sélectionnés selon leurs performances
      </p>
      <p className="mt-1 max-w-md text-xs text-muted-foreground/80">
        Généré automatiquement à partir des statistiques de la journée : buts, passes
        décisives et notes de match.
      </p>

      <div className="mt-8 w-full">
        <TotwPitch players={totwPlayers} />
      </div>

      <button
        onClick={handleExport}
        disabled={exportState === "generating"}
        className="mt-6 flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        <Download size={16} />
        {exportState === "generating"
          ? "Génération…"
          : exportState === "done"
            ? "Image téléchargée. Prête à être partagée !"
            : "Exporter le Onze-Type"}
      </button>
    </Container>
  );
}