import type { Metadata } from "next";
import { LABELS_CATEGORIE } from "@batchcooking/core";

import { formatPrestation, oui } from "@/lib/format";
import { getAllPlats } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Plats — Admin" };

export default async function AdminPlatsPage() {
  const plats = await getAllPlats();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold tracking-tight">Plats</h1>
      <p className="mt-1 text-sm text-muted">{plats.length} plats</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-black/5 text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Catégorie</th>
              <th className="px-4 py-3">Prestation</th>
              <th className="px-4 py-3">Dispo</th>
              <th className="px-4 py-3">Vedette</th>
            </tr>
          </thead>
          <tbody>
            {plats.map((p) => (
              <tr key={p.id} className="border-b border-black/5 last:border-0">
                <td className="px-4 py-3 font-medium">{p.nom}</td>
                <td className="px-4 py-3 text-muted">
                  {LABELS_CATEGORIE[p.categorie]}
                </td>
                <td className="px-4 py-3">{formatPrestation(p.prestation)}</td>
                <td className="px-4 py-3">{oui(p.disponible)}</td>
                <td className="px-4 py-3">{oui(p.mis_en_avant)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
