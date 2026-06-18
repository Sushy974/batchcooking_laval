import type { ConfigGenerale } from "../types/models";

/**
 * Classe mère (abstraite) du repository `config_generale`.
 * Définit le contrat ; les enfants (Fake / Firestore) fournissent l'implémentation.
 */
export abstract class ConfigGeneraleRepository {
  /** Récupère le document de configuration unique. */
  abstract get(): Promise<ConfigGenerale | null>;
  /** Remplace le document de configuration unique. */
  abstract modifier(data: ConfigGenerale): Promise<void>;
}
