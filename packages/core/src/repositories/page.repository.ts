import type { Page } from "../schemas";

/** Classe mère (abstraite) du repository `pages`. */
export abstract class PageRepository {
  abstract getAll(): Promise<Page[]>;
  abstract getBySlug(slug: string): Promise<Page | null>;
}
