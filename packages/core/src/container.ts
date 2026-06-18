import { getDataSourceName, type DataSourceName } from "./env";

import {
  ConfigGeneraleRepository,
  FakeConfigGeneraleRepository,
  FirestoreConfigGeneraleRepository,
  FakePlatRepository,
  FirestorePlatRepository,
  PlatRepository,
  FakeFormuleRepository,
  FirestoreFormuleRepository,
  FormuleRepository,
  FakePageRepository,
  FirestorePageRepository,
  PageRepository,
  AuthRepository,
  FakeAuthRepository,
  FirebaseAuthRepository,
} from "./repositories";

import {
  GetConfigUseCase,
  ModifierConfigUseCase,
} from "./usecases/config-generale.usecases";
import {
  GetFormuleBySlugUseCase,
  GetFormulesUseCase,
} from "./usecases/formule.usecases";
import { GetPageBySlugUseCase, GetPagesUseCase } from "./usecases/page.usecases";
import {
  CreerPlatUseCase,
  GetPlatByIdUseCase,
  GetPlatBySlugUseCase,
  GetPlatsMisEnAvantUseCase,
  GetPlatsUseCase,
  ModifierPlatUseCase,
  SupprimerPlatUseCase,
} from "./usecases/plat.usecases";
import {
  ConnexionUseCase,
  DeconnexionUseCase,
  ObserverUtilisateurUseCase,
} from "./usecases/auth.usecases";

/**
 * Composition root (injection de dépendances).
 *
 * Flux d'architecture :  UI → UseCase → Repository
 *
 * 1. On choisit l'implémentation des repositories selon la config lancée
 *    (Fake en dev, Firestore en staging/prod).
 * 2. On injecte ces repositories dans les use cases.
 * 3. L'UI n'utilise QUE les use cases (jamais les repos, jamais Firestore).
 *
 * Équivalent Flutter : c'est le `get_it`/registre que tu configures au démarrage.
 * En TS, un module ES est un singleton (évalué une seule fois) → `useCases`
 * ci-dessous joue ce rôle, sans avoir besoin du contexte React côté serveur.
 */
function buildRepositories(source: DataSourceName) {
  const useFake = source === "mock";
  return {
    config: (useFake
      ? new FakeConfigGeneraleRepository()
      : new FirestoreConfigGeneraleRepository()) satisfies ConfigGeneraleRepository,
    plats: (useFake
      ? new FakePlatRepository()
      : new FirestorePlatRepository()) satisfies PlatRepository,
    formules: (useFake
      ? new FakeFormuleRepository()
      : new FirestoreFormuleRepository()) satisfies FormuleRepository,
    pages: (useFake
      ? new FakePageRepository()
      : new FirestorePageRepository()) satisfies PageRepository,
    auth: (useFake
      ? new FakeAuthRepository()
      : new FirebaseAuthRepository()) satisfies AuthRepository,
  };
}

/**
 * Construit l'ensemble des use cases avec leurs dépendances injectées.
 * `source` est paramétrable → pratique pour les tests (forcer "mock") ou pour
 * surcharger via le contexte React (voir ./client.tsx).
 */
export function createUseCases(source: DataSourceName = getDataSourceName()) {
  const repos = buildRepositories(source);
  return {
    getConfig: new GetConfigUseCase(repos.config),
    modifierConfig: new ModifierConfigUseCase(repos.config),
    getPlats: new GetPlatsUseCase(repos.plats),
    getPlatsMisEnAvant: new GetPlatsMisEnAvantUseCase(repos.plats),
    getPlatBySlug: new GetPlatBySlugUseCase(repos.plats),
    getPlatById: new GetPlatByIdUseCase(repos.plats),
    creerPlat: new CreerPlatUseCase(repos.plats),
    modifierPlat: new ModifierPlatUseCase(repos.plats),
    supprimerPlat: new SupprimerPlatUseCase(repos.plats),
    getFormules: new GetFormulesUseCase(repos.formules),
    getFormuleBySlug: new GetFormuleBySlugUseCase(repos.formules),
    getPage: new GetPageBySlugUseCase(repos.pages),
    getPages: new GetPagesUseCase(repos.pages),
    connexion: new ConnexionUseCase(repos.auth),
    deconnexion: new DeconnexionUseCase(repos.auth),
    observerUtilisateur: new ObserverUtilisateurUseCase(repos.auth),
  };
}

export type UseCases = ReturnType<typeof createUseCases>;

/**
 * Singleton par défaut. Les Server Components importent ceci directement :
 *   import { useCases } from "@batchcooking/core";
 *   const config = await useCases.getConfig.execute();
 */
export const useCases: UseCases = createUseCases();
