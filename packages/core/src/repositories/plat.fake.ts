import { fixturePlats } from "../fixtures";
import type { PlatInput, Plat } from "../types/models";

import { byOrdre, simulateAsync } from "./fake-helpers";
import { PlatRepository, type PlatQuery } from "./plat.repository";

// Magasin mutable en mémoire (réinitialisé à chaque process — dev only).
let magasin: Plat[] = structuredClone(fixturePlats);

/** Implémentation de DÉVELOPPEMENT : fausse base en mémoire (lecture + écriture). */
export class FakePlatRepository extends PlatRepository {
  async getAll(query: PlatQuery = {}): Promise<Plat[]> {
    let plats = [...magasin];
    if (query.disponiblesUniquement) plats = plats.filter((p) => p.disponible);
    return simulateAsync(plats.sort(byOrdre));
  }

  async getMisEnAvant(max = 4): Promise<Plat[]> {
    const plats = magasin
      .filter((p) => p.disponible && p.mis_en_avant)
      .sort(byOrdre)
      .slice(0, max);
    return simulateAsync(plats);
  }

  async getBySlug(slug: string): Promise<Plat | null> {
    return simulateAsync(magasin.find((p) => p.slug === slug) ?? null);
  }

  async getById(id: string): Promise<Plat | null> {
    return simulateAsync(magasin.find((p) => p.id === id) ?? null);
  }

  async creer(data: PlatInput): Promise<string> {
    const id = `plat-${crypto.randomUUID()}`;
    magasin.push({ id, ...data });
    return simulateAsync(id);
  }

  async modifier(id: string, data: PlatInput): Promise<void> {
    const index = magasin.findIndex((p) => p.id === id);
    if (index >= 0) magasin[index] = { id, ...data };
    await simulateAsync(null);
  }

  async supprimer(id: string): Promise<void> {
    magasin = magasin.filter((p) => p.id !== id);
    await simulateAsync(null);
  }
}
