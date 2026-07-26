// app/competition/reglement/page.tsx
import { Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { RegulationAccordion } from "@/components/regulation/RegulationAccordion";
import { regulationSections } from "@/lib/regulation-mock-data";

/** Doc section 9 — Règlement & format */
export default function RegulationPage() {
  return (
    <Container className="py-8 sm:py-10">
      <PageHeader
        title="Règlement & format"
        subtitle="Comment fonctionne le championnat CUFO"
      />

      <RegulationAccordion sections={regulationSections} />
      <a
        href="#"
        className="mt-6 flex w-fit items-center gap-2 text-sm font-medium text-secondary hover:text-secondary/80"
      >
        <Download size={16} />
        Télécharger le règlement complet (PDF)
      </a>
    </Container>
  );
}