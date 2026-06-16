import type { Metadata } from "next";
import type { Formule } from "@batchcooking/core";

import { oui } from "@/lib/format";
import { getAllFormules } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Formules — Admin" };

const COURSES: Record<Formule["courses"], string> = {
  incluses: "Incluses",
  non_incluses: "Non incluses",
  en_option: "En option",
};

export default async function AdminFormulesPage() {
  const formules = await getAllFormules();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold tracking-tight">Formules</h1>
      <p className="mt-1 text-sm text-muted">{formules.length} formules</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-black/5 text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3">Repas</th>
              <th className="px-4 py-3">Courses</th>
              <th className="px-4 py-3">Dispo</th>
            </tr>
          </thead>
          <tbody>
            {formules.map((f) => (
              <tr key={f.id} className="border-b border-black/5 last:border-0">
                <td className="px-4 py-3 font-medium">{f.nom}</td>
                <td className="px-4 py-3">{f.prix} €</td>
                <td className="px-4 py-3 text-muted">{f.nombre_repas}</td>
                <td className="px-4 py-3 text-muted">{COURSES[f.courses]}</td>
                <td className="px-4 py-3">{oui(f.disponible)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
