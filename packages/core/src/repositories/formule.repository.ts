import type { Formule } from "../types/models";

export interface FormuleQuery {
  disponiblesUniquement?: boolean;
}

/** Classe mère (abstraite) du repository `formules`. */
export abstract class FormuleRepository {
  abstract getAll(query?: FormuleQuery): Promise<Formule[]>;
  abstract getBySlug(slug: string): Promise<Formule | null>;
}
