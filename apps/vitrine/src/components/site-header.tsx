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
    <header className="sticky top-0 z-10 border-b border-black/5 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight">
          {config?.nom_societe ?? "Le Batchcooking d'Emma"}
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
        >
          Réserver
        </Link>
      </div>
    </header>
  );
}
