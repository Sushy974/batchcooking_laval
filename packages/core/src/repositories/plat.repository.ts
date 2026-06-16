import type { Plat } from "../types/models";

export interface PlatQuery {
  disponiblesUniquement?: boolean;
}

/** Classe mère (abstraite) du repository `plats`. */
export abstract class PlatRepository {
  abstract getAll(query?: PlatQuery): Promise<Plat[]>;
  abstract getMisEnAvant(max?: number): Promise<Plat[]>;
  abstract getBySlug(slug: string): Promise<Plat | null>;
}
