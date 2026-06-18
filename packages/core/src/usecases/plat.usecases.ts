import type { PlatQuery, PlatRepository } from "../repositories/plat.repository";
import type { PlatInput, Plat } from "../types/models";

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

export class GetPlatByIdUseCase {
  constructor(private readonly repo: PlatRepository) {}
  execute(id: string): Promise<Plat | null> {
    return this.repo.getById(id);
  }
}

export class CreerPlatUseCase {
  constructor(private readonly repo: PlatRepository) {}
  execute(data: PlatInput): Promise<string> {
    return this.repo.creer(data);
  }
}

export class ModifierPlatUseCase {
  constructor(private readonly repo: PlatRepository) {}
  execute(id: string, data: PlatInput): Promise<void> {
    return this.repo.modifier(id, data);
  }
}

export class SupprimerPlatUseCase {
  constructor(private readonly repo: PlatRepository) {}
  execute(id: string): Promise<void> {
    return this.repo.supprimer(id);
  }
}
