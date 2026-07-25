// components/home/SuggestionTeaser.tsx
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";

/** Doc 3.6 — rappel discret de la Boîte à suggestions, en bas de l'Accueil */
export function SuggestionTeaser() {
  return (
    <Card className="flex flex-col items-center gap-3 px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MessageCircle size={18} />
        </span>
        <p className="text-sm text-muted-foreground sm:text-base">
          Une remarque sur l&rsquo;organisation ? Dis-le nous, anonymement.
        </p>
      </div>
      <Link
        href="/suggestions"
        className="w-full shrink-0 rounded-full bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
      >
        Envoyer un avis
      </Link>
    </Card>
  );
}