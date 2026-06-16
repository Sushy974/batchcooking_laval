import type { Metadata } from "next";

import { getConfig } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Configuration — Admin" };

export default async function AdminConfigPage() {
  const config = await getConfig();

  if (!config) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold tracking-tight">Configuration</h1>
        <p className="mt-4 text-muted">Configuration indisponible.</p>
      </div>
    );
  }

  const rows: { label: string; value: string }[] = [
    { label: "Société", value: config.nom_societe },
    { label: "Téléphone", value: config.telephone },
    { label: "Email", value: config.email },
    { label: "Zone d'intervention", value: config.zone_intervention },
    { label: "Rayon (km)", value: String(config.rayon_km) },
    { label: "Communes", value: config.communes_couvertes.join(", ") },
    { label: "Instagram", value: config.reseaux_sociaux?.instagram ?? "—" },
    {
      label: "Bannière",
      value: config.banniere_active
        ? (config.banniere_message ?? "(active, sans message)")
        : "Inactive",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold tracking-tight">Configuration</h1>

      <dl className="mt-6 max-w-2xl divide-y divide-black/5 rounded-2xl border border-black/5 bg-white shadow-sm">
        {rows.map((r) => (
          <div key={r.label} className="flex gap-4 px-5 py-3 text-sm">
            <dt className="w-48 shrink-0 text-muted">{r.label}</dt>
            <dd className="font-medium">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
