// Point d'entrée PUBLIC (serveur-safe) du package partagé @batchcooking/core.
// Les apps importent depuis ici ; le contexte React client est dans "./client".

// Domaine & modèles
export * from "./constants";
export * from "./schemas"; // pageSchema, types Page & Seo
export * from "./types/models"; // ConfigGenerale, Plat, Formule, PrestationPrix...

// Environnement
export * from "./env";

// Use cases (ce dont dépend l'UI)
export * from "./usecases/config-generale.usecases";
export * from "./usecases/plat.usecases";
export * from "./usecases/formule.usecases";
export * from "./usecases/page.usecases";

// Conteneur d'injection : singleton `useCases` + fabrique + type
export { createUseCases, useCases, type UseCases } from "./container";

// Repositories (classes mères/enfants + types) — exposés pour les tests/extensions.
// L'UI ne devrait PAS les utiliser directement (passer par les use cases).
export * from "./repositories";

// Firebase brut (getters paresseux) — utile à l'admin pour l'authentification.
export { getDb, getFirebaseAuth, getFirebaseStorage } from "./firebase";
