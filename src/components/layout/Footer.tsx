// components/layout/Footer.tsx
import Link from "next/link";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";

const currentYear = new Date().getFullYear();

/** Doc 2.1 — pied de page desktop : liens secondaires + mentions */
export function Footer() {
  return (
    <footer className="mt-16 border-t border-border pb-8 pt-8 text-center">
      <p className="font-heading text-lg font-bold uppercase text-foreground">
        CUFO <span className="text-secondary">UCAO-UUC</span>
      </p>
      <p className="mt-1 text-sm italic text-muted-foreground">
        Le championnat universitaire qui rassemble le campus
      </p>

      <div className="mt-4 flex justify-center gap-3">
        {[FaFacebook, FaYoutube, FaInstagram].map((Icon, i) => (
          <span
            key={i}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground"
          >
            <Icon size={16} />
          </span>
        ))}
      </div>

      <nav className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <Link href="/suggestions" className="hover:text-secondary">
          Boîte à suggestions
        </Link>
        <span className="text-border">·</span>
        <Link href="/competition/reglement" className="hover:text-secondary">
          Règlement
        </Link>
        <span className="text-border">·</span>
        <Link href="/a-propos#contact" className="hover:text-secondary">
          Contact
        </Link>
      </nav>

      <p className="mt-4 text-[11px] text-muted-foreground/70">
        © {currentYear} CUFO UCAO-UUC
      </p>
    </footer>
  );
}