import type { Metadata } from "next";
import { Barlow_Condensed, Manrope, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

const fontHeading = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
});

const fontSans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "FootUCAO — Championnat CUFO UCAO-UUC",
  description: "Scores en direct, classement, effectifs et actualités du championnat universitaire CUFO UCAO-UUC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${fontHeading.variable} ${fontSans.variable} ${fontMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <Navbar />
        <main className="flex-1 pb-20 pt-16 md:pb-0 md:pt-0">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}