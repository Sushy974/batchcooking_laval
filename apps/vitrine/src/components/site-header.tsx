import Link from "next/link";
import type { ConfigGenerale } from "@batchcooking/core";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/formules", label: "Les formules" },
  { href: "/plats", label: "Le menu" },
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/a-propos", label: "À propos" },
];

export function SiteHeader({ config }: { config: ConfigGenerale | null }) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-12">
        <Link
          href="/"
          className="font-headings text-xl font-bold tracking-tight"
        >
          {config?.nom_societe ?? "Le Batchcooking d'Emma"}
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-warm md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Me contacter
        </Link>
      </div>
    </header>
  );
}
