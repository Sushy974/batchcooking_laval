import type { PlatQuery, PlatRepository } from "../repositories/plat.repository";
import type { Plat } from "../types/models";

export class GetPlatsUseCase {
  constructor(private readonly repo: PlatRepository) {}
  execute(query?: PlatQuery): Promise<Plat[]> {
    return this.repo.getAll(query);
  }
}

export class GetPlatsMisEnAvantUseCase {
  constructor(private readonly repo: PlatRepository) {}
  execute(max?: number): Promise<Plat[]> {
    return this.repo.getMisEnAvant(max);
  }
}

export class GetPlatBySlugUseCase {
  constructor(private readonly repo: PlatRepository) {}
  execute(slug: string): Promise<Plat | null> {
    return this.repo.getBySlug(slug);
  }
}
