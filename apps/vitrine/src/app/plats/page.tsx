import type { Metadata } from "next";
import {
  ALLERGENES,
  CATEGORIES,
  REGIMES,
} from "@batchcooking/core";

import { PlatsExplorer } from "@/components/plats-explorer";
import { getPlatsDisponibles } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Le menu — nos plats",
  description:
    "Découvrez le répertoire de plats cuisinés par Emma : filtrez par catégorie, régime et allergènes.",
};

export default async function PlatsPage() {
  const plats = await getPlatsDisponibles();

  // Facettes : on ne propose que les filtres réellement présents dans le catalogue.
  const facets = {
    categories: CATEGORIES.filter((c) => plats.some((p) => p.categorie === c)),
    regimes: REGIMES.filter((r) => plats.some((p) => p.regimes.includes(r))),
    allergenes: ALLERGENES.filter((a) =>
      plats.some((p) => p.allergenes.includes(a)),
    ),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Le menu</h1>
        <p className="mt-2 text-warm">
          Un aperçu des plats qu&apos;Emma peut cuisiner pour vous. Composez votre
          menu selon vos envies.
        </p>
      </header>

      <PlatsExplorer plats={plats} facets={facets} />
    </div>
  );
}
