// components/ui/SectionHeader.tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  href?: string;
  linkLabel?: string;
}

/**
 * En-tête de bloc de contenu (ex. "Où en est le championnat",
 * "Ils font le spectacle"...) avec lien "voir tout" optionnel,
 * conforme au pattern ti-chevron-right de l'annexe 15.1.
 */
export function SectionHeader({ title, href, linkLabel }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4 sm:mb-6">
      <h2 className="font-heading text-2xl font-semibold uppercase tracking-wide text-foreground sm:text-3xl">
        {title}
      </h2>
      {href && linkLabel && (
        <Link
          href={href}
          className="group flex shrink-0 items-center gap-1 text-sm font-medium text-secondary transition-colors hover:text-secondary/80"
        >
          {linkLabel.replace(" →", "")}
          <ChevronRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}