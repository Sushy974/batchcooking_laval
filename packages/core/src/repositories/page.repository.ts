import type { Page } from "../schemas";

/** Classe mère (abstraite) du repository `pages`. */
export abstract class PageRepository {
  abstract getBySlug(slug: string): Promise<Page | null>;
}
