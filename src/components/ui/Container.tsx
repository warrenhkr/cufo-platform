// components/ui/Container.tsx
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wrapper de largeur/marge cohérent pour toute la plateforme.
 * Mobile-first : padding horizontal généreux sur petit écran,
 * largeur plafonnée sur desktop pour garder une lecture confortable.
 */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}