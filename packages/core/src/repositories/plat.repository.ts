import type { PlatInput, Plat } from "../types/models";

export interface PlatQuery {
  disponiblesUniquement?: boolean;
}

/** Classe mère (abstraite) du repository `plats`. */
export abstract class PlatRepository {
  abstract getAll(query?: PlatQuery): Promise<Plat[]>;
  abstract getMisEnAvant(max?: number): Promise<Plat[]>;
  abstract getBySlug(slug: string): Promise<Plat | null>;
  abstract getById(id: string): Promise<Plat | null>;
  /** Crée un plat ; renvoie l'id généré. */
  abstract creer(data: PlatInput): Promise<string>;
  abstract modifier(id: string, data: PlatInput): Promise<void>;
  abstract supprimer(id: string): Promise<void>;
}
