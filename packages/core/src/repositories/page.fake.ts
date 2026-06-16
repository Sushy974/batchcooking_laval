import { fixturePages } from "../fixtures";
import type { Page } from "../schemas";

import { simulateAsync } from "./fake-helpers";
import { PageRepository } from "./page.repository";

/** Implémentation de DÉVELOPPEMENT : lit la fausse base locale (fixtures). */
export class FakePageRepository extends PageRepository {
  async getBySlug(slug: string): Promise<Page | null> {
    return simulateAsync(fixturePages.find((p) => p.slug === slug) ?? null);
  }
}
