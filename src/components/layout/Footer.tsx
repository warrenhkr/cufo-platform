import Link from "next/link";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";

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
      <Link
        href="/suggestions"
        className="mt-4 inline-block text-xs text-muted-foreground hover:text-secondary"
      >
        Boîte à suggestions
      </Link>
    </footer>
  );
}