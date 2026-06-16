import { fixturePlats } from "../fixtures";
import type { Plat } from "../types/models";

import { byOrdre, simulateAsync } from "./fake-helpers";
import { PlatRepository, type PlatQuery } from "./plat.repository";

/** Implémentation de DÉVELOPPEMENT : lit la fausse base locale (fixtures). */
export class FakePlatRepository extends PlatRepository {
  async getAll(query: PlatQuery = {}): Promise<Plat[]> {
    let plats = [...fixturePlats];
    if (query.disponiblesUniquement) plats = plats.filter((p) => p.disponible);
    return simulateAsync(plats.sort(byOrdre));
  }

  async getMisEnAvant(max = 4): Promise<Plat[]> {
    const plats = fixturePlats
      .filter((p) => p.disponible && p.mis_en_avant)
      .sort(byOrdre)
      .slice(0, max);
    return simulateAsync(plats);
  }

  async getBySlug(slug: string): Promise<Plat | null> {
    return simulateAsync(fixturePlats.find((p) => p.slug === slug) ?? null);
  }
}
