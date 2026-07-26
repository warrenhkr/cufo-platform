// app/suggestions/page.tsx
import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SuggestionForm } from "@/components/suggestions/SuggestionForm";

/** Doc section 13 — Boîte à suggestions */
export default function SuggestionsPage() {
  return (
    <Container className="flex flex-col items-center py-10 sm:py-14">
      <div className="w-full max-w-[480px]">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MessageCircle size={22} />
          </span>
          <h1 className="font-heading text-3xl font-semibold uppercase tracking-wide text-foreground">
            Boîte à suggestions
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Anonyme, direct, utile
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Une remarque sur l&rsquo;organisation, un terrain, un arbitrage ?
            Dis-le nous. Ton message est envoyé sans aucune information
            permettant de t&rsquo;identifier.
          </p>
        </div>

        <SuggestionForm />
      </div>
    </Container>
  );
}