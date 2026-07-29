"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Wrapper client autour de ThemeProvider next-themes.
 * layout.tsx est un Server Component — ThemeProvider a besoin de "use client".
 * On l'isole ici pour ne pas marquer layout.tsx entier comme client.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
