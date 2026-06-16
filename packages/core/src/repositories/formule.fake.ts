import { fixtureFormules } from "../fixtures";
import type { Formule } from "../types/models";

import { byOrdre, simulateAsync } from "./fake-helpers";
import { FormuleRepository, type FormuleQuery } from "./formule.repository";

/** Implémentation de DÉVELOPPEMENT : lit la fausse base locale (fixtures). */
export class FakeFormuleRepository extends FormuleRepository {
  async getAll(query: FormuleQuery = {}): Promise<Formule[]> {
    let formules = [...fixtureFormules];
    if (query.disponiblesUniquement) formules = formules.filter((f) => f.disponible);
    return simulateAsync(formules.sort(byOrdre));
  }

  async getBySlug(slug: string): Promise<Formule | null> {
    return simulateAsync(fixtureFormules.find((f) => f.slug === slug) ?? null);
  }
}
