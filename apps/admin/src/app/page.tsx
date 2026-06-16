import Link from "next/link";

import {
  getAllFormules,
  getAllPages,
  getAllPlats,
  getConfig,
} from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [plats, formules, pages, config] = await Promise.all([
    getAllPlats(),
    getAllFormules(),
    getAllPages(),
    getConfig(),
  ]);

  const stats = [
    { label: "Plats", value: plats.length, href: "/plats" },
    { label: "Formules", value: formules.length, href: "/formules" },
    { label: "Pages", value: pages.length, href: "/pages" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
      <p className="mt-1 text-sm text-muted">
        {config?.nom_societe ?? "Le Batchcooking d'Emma"}
      </p>

      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        ⚠️ Back-office en <strong>lecture seule</strong> (données de dev). L&apos;édition
        (authentification + écritures Firebase) reste à brancher.
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-3xl font-bold text-brand">{s.value}</p>
            <p className="mt-1 text-sm text-muted">{s.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
