// app/a-propos/page.tsx
import { Building2, Handshake, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/about/ContactForm";

/** Doc section 12 — À propos / CUFO : lecture simple, une colonne, ~680px */
export default function AboutPage() {
  return (
    <Container className="py-8 sm:py-10">
      <div className="mx-auto flex max-w-[680px] flex-col gap-12">
        <section>
          <h1 className="font-heading text-3xl font-semibold uppercase tracking-wide text-foreground">
            Le CUFO
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Le championnat universitaire qui rassemble le campus
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground">
            Le CUFO UCAO-UUC est la compétition sportive officielle de l&rsquo;université.
            Chaque saison, les équipes s&rsquo;affrontent pour représenter leur filière ou
            leur promotion et décrocher le titre.
          </p>
        </section>

        <section>
          <h2 className="flex items-center gap-2 font-heading text-2xl font-semibold uppercase tracking-wide text-foreground">
            <Building2 size={20} className="text-primary" />
            L&rsquo;organisation
          </h2>
          <p className="mt-3 text-base leading-relaxed text-foreground">
            Le championnat est organisé et arbitré par le comité étudiant du CUFO, en
            lien avec l&rsquo;administration de l&rsquo;UCAO-UUC.
          </p>
        </section>

        <section id="partenaires">
          <h2 className="flex items-center gap-2 font-heading text-2xl font-semibold uppercase tracking-wide text-foreground">
            <Handshake size={20} className="text-primary" />
            Ils soutiennent le championnat
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex h-20 items-center justify-center rounded-2xl border border-border bg-muted/50 text-xs font-medium text-muted-foreground"
              >
                Logo partenaire
              </div>
            ))}
          </div>
        </section>

        <section id="contact">
          <h2 className="flex items-center gap-2 font-heading text-2xl font-semibold uppercase tracking-wide text-foreground">
            <Mail size={20} className="text-primary" />
            Nous contacter
          </h2>
          <div className="mt-4">
            <ContactForm />
          </div>
        </section>
      </div>
    </Container>
  );
}