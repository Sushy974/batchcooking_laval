import type { Metadata } from "next";

import { FormuleCard } from "@/components/formule-card";
import { getFormulesDisponibles } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Les formules",
  description:
    "Découvrez les formules de batchcooking à domicile d'Emma : durée, nombre de repas, option courses.",
};

export default async function FormulesPage() {
  const formules = await getFormulesDisponibles();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Les formules</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Emma se déplace chez vous pour cuisiner vos repas de la semaine.
          Choisissez la formule adaptée à votre foyer.
        </p>
      </header>

      {formules.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {formules.map((f) => (
            <FormuleCard key={f.id} formule={f} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-black/10 p-10 text-center text-muted">
          Aucune formule disponible pour le moment.
        </p>
      )}
    </div>
  );
}
