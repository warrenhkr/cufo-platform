// components/ui/PageHeader.tsx
interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

/**
 * En-tête standard des pages internes (Calendrier, Résultats, Classement...) :
 * H2 + sous-titre. L'Accueil n'utilise pas ce composant — il a son propre
 * Hero — mais il est inclus ici pour que les autres pages de la doc
 * (sections 5 à 12) s'appuient dessus.
 */
export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <h1 className="font-heading text-3xl font-semibold uppercase tracking-wide text-foreground sm:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1.5 text-base text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}