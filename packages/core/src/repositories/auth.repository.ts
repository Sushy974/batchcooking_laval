import type { Utilisateur } from "../types/models";

/** Classe mère (abstraite) du repository d'authentification. */
export abstract class AuthRepository {
  abstract connexion(email: string, motDePasse: string): Promise<Utilisateur>;
  abstract deconnexion(): Promise<void>;
  /** S'abonne aux changements d'état d'auth ; renvoie une fonction de désabonnement. */
  abstract observer(callback: (utilisateur: Utilisateur | null) => void): () => void;
}
