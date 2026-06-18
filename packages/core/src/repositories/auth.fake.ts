import type { Utilisateur } from "../types/models";

import { AuthRepository } from "./auth.repository";

/**
 * Auth de DÉVELOPPEMENT : accepte n'importe quels identifiants et simule une
 * session en mémoire (Emma). Permet de tester l'admin sans Firebase.
 */
export class FakeAuthRepository extends AuthRepository {
  private utilisateur: Utilisateur | null = null;
  private abonnes = new Set<(u: Utilisateur | null) => void>();

  private notifier() {
    for (const cb of this.abonnes) cb(this.utilisateur);
  }

  async connexion(email: string): Promise<Utilisateur> {
    this.utilisateur = { uid: "dev-emma", email };
    this.notifier();
    return this.utilisateur;
  }

  async deconnexion(): Promise<void> {
    this.utilisateur = null;
    this.notifier();
  }

  observer(callback: (u: Utilisateur | null) => void): () => void {
    this.abonnes.add(callback);
    callback(this.utilisateur);
    return () => this.abonnes.delete(callback);
  }
}
