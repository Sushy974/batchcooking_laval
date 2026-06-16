import { fixtureConfig } from "../fixtures";
import type { ConfigGenerale } from "../types/models";

import { ConfigGeneraleRepository } from "./config-generale.repository";
import { simulateAsync } from "./fake-helpers";

/** Implémentation de DÉVELOPPEMENT : lit la fausse base locale (fixtures). */
export class FakeConfigGeneraleRepository extends ConfigGeneraleRepository {
  async get(): Promise<ConfigGenerale | null> {
    return simulateAsync(fixtureConfig);
  }
}
