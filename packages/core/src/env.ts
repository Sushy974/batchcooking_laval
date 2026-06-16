export type DataSourceName = "mock" | "firestore";

/**
 * Sélection de la source de données selon l'environnement.
 *  - dev        → `mock`      (Fake repositories, fausse base locale)
 *  - staging    → `firestore` (Firestore de test, compte du dev)
 *  - production → `firestore` (Firestore du client)
 *
 * Pilotée par NEXT_PUBLIC_DATA_SOURCE. Par défaut : `firestore` en production,
 * `mock` sinon (filet de sécurité si la variable est absente).
 */
export function getDataSourceName(): DataSourceName {
  const explicit = process.env.NEXT_PUBLIC_DATA_SOURCE;
  if (explicit === "mock" || explicit === "firestore") return explicit;
  return process.env.NODE_ENV === "production" ? "firestore" : "mock";
}

/** Environnement applicatif courant (affichage / debug). */
export function getAppEnv(): string {
  return process.env.NEXT_PUBLIC_APP_ENV ?? process.env.NODE_ENV ?? "development";
}
