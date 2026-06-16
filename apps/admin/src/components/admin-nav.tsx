import Link from "next/link";

const LINKS = [
  { href: "/", label: "Tableau de bord" },
  { href: "/plats", label: "Plats" },
  { href: "/formules", label: "Formules" },
  { href: "/pages", label: "Pages" },
  { href: "/config", label: "Configuration" },
];

export function AdminNav() {
  return (
    <aside className="w-56 shrink-0 border-r border-black/5 bg-white">
      <div className="p-4">
        <p className="text-sm font-bold">Admin</p>
        <p className="text-xs text-muted">Le Batchcooking d&apos;Emma</p>
      </div>
      <nav className="flex flex-col px-2 pb-4 text-sm">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-lg px-3 py-2 text-foreground/80 transition-colors hover:bg-brand/5 hover:text-foreground"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
