import { fixtureConfig } from "../fixtures";
import type { ConfigGenerale } from "../types/models";

import { ConfigGeneraleRepository } from "./config-generale.repository";
import { simulateAsync } from "./fake-helpers";

// Magasin mutable en mémoire (dev only).
let magasin: ConfigGenerale = structuredClone(fixtureConfig);

/** Implémentation de DÉVELOPPEMENT : fausse base en mémoire (lecture + écriture). */
export class FakeConfigGeneraleRepository extends ConfigGeneraleRepository {
  async get(): Promise<ConfigGenerale | null> {
    return simulateAsync(magasin);
  }

  async modifier(data: ConfigGenerale): Promise<void> {
    magasin = structuredClone(data);
    await simulateAsync(null);
  }
}
