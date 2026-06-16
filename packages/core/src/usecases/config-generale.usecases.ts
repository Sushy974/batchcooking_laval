import type { ConfigGeneraleRepository } from "../repositories/config-generale.repository";
import type { ConfigGenerale } from "../types/models";

/**
 * Use case : récupérer la configuration générale.
 * Dépend de l'ABSTRACTION du repository (classe mère), jamais d'une implémentation
 * concrète. C'est le conteneur (../container.ts) qui injecte le bon repo selon
 * la config de l'environnement lancé.
 */
export class GetConfigUseCase {
  constructor(private readonly repo: ConfigGeneraleRepository) {}

  execute(): Promise<ConfigGenerale | null> {
    return this.repo.get();
  }
}
