import { cache } from "react";
import { useCases } from "@batchcooking/core";

/**
 * Adaptateurs de lecture pour la vitrine : ils passent TOUJOURS par les use cases
 * (UI → UseCase → Repository) et ajoutent une mémoïsation par requête via
 * `react.cache` — ainsi le layout et la page peuvent demander la même donnée
 * sans la charger deux fois (utile dès qu'on branchera Firestore).
 */
// Le layout (en-tête/pied de page) est rendu sur TOUTES les pages, y compris les
// pages statiques (ex. /_not-found) générées au build. Si la config ne peut pas
// être chargée (build sans clés Firebase, panne réseau…), on dégrade proprement
// vers `null` plutôt que de faire planter tout le site.
export const getConfig = cache(async () => {
  try {
    return await useCases.getConfig.execute();
  } catch (error) {
    console.error("getConfig a échoué, rendu sans configuration :", error);
    return null;
  }
});

export const getAccueil = cache(() => useCases.getPage.execute("accueil"));

export const getPage = cache((slug: string) => useCases.getPage.execute(slug));

export const getFormulesDisponibles = cache(() =>
  useCases.getFormules.execute({ disponiblesUniquement: true }),
);

export const getFormuleBySlug = cache((slug: string) =>
  useCases.getFormuleBySlug.execute(slug),
);

export const getPlatsMisEnAvant = cache(() =>
  useCases.getPlatsMisEnAvant.execute(3),
);

export const getPlatsDisponibles = cache(() =>
  useCases.getPlats.execute({ disponiblesUniquement: true }),
);

export const getPlatBySlug = cache((slug: string) =>
  useCases.getPlatBySlug.execute(slug),
);
