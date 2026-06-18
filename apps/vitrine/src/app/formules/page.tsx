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
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Les formules</h1>
        <p className="mx-auto mt-2 max-w-2xl text-warm">
          Emma se déplace chez vous pour cuisiner vos repas de la semaine.
          Choisissez la formule adaptée à votre foyer.
        </p>
      </header>

      {formules.length > 0 ? (
        <div className="flex flex-wrap items-stretch justify-center gap-6">
          {formules.map((f, i) => (
            <div key={f.id} className="w-full max-w-sm sm:w-80">
              <FormuleCard formule={f} index={i} />
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-border p-10 text-center text-warm">
          Aucune formule disponible pour le moment.
        </p>
      )}
    </div>
  );
}
