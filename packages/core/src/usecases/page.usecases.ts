import type { PageRepository } from "../repositories/page.repository";
import type { Page } from "../schemas";

export class GetPageBySlugUseCase {
  constructor(private readonly repo: PageRepository) {}
  execute(slug: string): Promise<Page | null> {
    return this.repo.getBySlug(slug);
  }
}
