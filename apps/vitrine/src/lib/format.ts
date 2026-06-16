import type { PrestationPrix } from "@batchcooking/core";

/**
 * Formate le prix de prestation d'un plat pour l'affichage public.
 *  - fixe       → "5 €"
 *  - fourchette → "4 – 6 €" (ou "à partir de 4 €" si seul le min est connu)
 */
export function formatPrestation(p: PrestationPrix): string | null {
  if (p.type === "fixe") {
    return p.fixe != null ? `${p.fixe} €` : null;
  }
  if (p.min != null && p.max != null) {
    return `${p.min} – ${p.max} €`;
  }
  if (p.min != null) {
    return `à partir de ${p.min} €`;
  }
  return null;
}
