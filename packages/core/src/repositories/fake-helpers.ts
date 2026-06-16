/**
 * Outils communs aux Fake repositories (base de données émulée).
 * `simulateAsync` reproduit la latence + l'immutabilité d'une vraie base :
 * on renvoie une COPIE des fixtures pour éviter toute mutation accidentelle.
 */
export function simulateAsync<T>(value: T, ms = 30): Promise<T> {
  const copy = structuredClone(value);
  return new Promise((resolve) => setTimeout(() => resolve(copy), ms));
}

export const byOrdre = <T extends { ordre: number }>(a: T, b: T): number =>
  a.ordre - b.ordre;
