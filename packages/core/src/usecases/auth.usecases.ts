import type { AuthRepository } from "../repositories/auth.repository";
import type { Utilisateur } from "../types/models";

export class ConnexionUseCase {
  constructor(private readonly repo: AuthRepository) {}
  execute(email: string, motDePasse: string): Promise<Utilisateur> {
    return this.repo.connexion(email, motDePasse);
  }
}

export class DeconnexionUseCase {
  constructor(private readonly repo: AuthRepository) {}
  execute(): Promise<void> {
    return this.repo.deconnexion();
  }
}

export class ObserverUtilisateurUseCase {
  constructor(private readonly repo: AuthRepository) {}
  execute(callback: (utilisateur: Utilisateur | null) => void): () => void {
    return this.repo.observer(callback);
  }
}
