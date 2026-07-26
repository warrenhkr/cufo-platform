// app/not-found.tsx
import Link from "next/link";
import { Container } from "@/components/ui/Container";

/**
 * Doc 1.6 — Page 404. Illustration simple (silhouette géométrique),
 * seule tolérée en dehors des états vides d'après la doc (15.2) —
 * le reste de la plateforme reste photo-first.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4">
      <Container>
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            className="mb-6 text-primary/20"
          >
            <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="2" strokeDasharray="6 8" />
            <path
              d="M60 28l9 6-3 11h-12l-3-11 9-6zM60 28V16M31 79l-9-6M89 79l9-6M45 95l-6 10M75 95l6 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path d="M38 46L20 30M82 46l18-16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>

          <span className="font-heading text-7xl font-bold text-primary/10">404</span>

          <h1 className="mt-2 font-heading text-3xl font-semibold uppercase tracking-wide text-foreground">
            Ce terrain n&rsquo;existe pas
          </h1>

          <p className="mt-3 text-muted-foreground">
            La page que tu cherches a été déplacée ou n&rsquo;existe plus.
          </p>

          <Link
            href="/"
            className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Retour à l&rsquo;accueil
          </Link>
        </div>
      </Container>
    </main>
  );
}