/**
 * Coordonnées GPS des communes de la zone d'intervention.
 *
 * Choix d'architecture : table statique côté présentation (vitrine). Les noms
 * de communes viennent de la config métier (`ConfigGenerale.communes_couvertes`),
 * mais leurs coordonnées sont un détail d'affichage de la carte — pas une donnée
 * métier — on ne pollue donc pas le modèle core ni Firestore.
 *
 * Pour ajouter une commune : ajoutez son nom dans la config ET une entrée ici
 * (la clé est le nom « normalisé », voir `normalise`).
 */

export interface CommuneGeo {
  nom: string;
  lat: number;
  lng: number;
}

/** Ville de référence : centre par défaut de la carte + centre du rayon. */
export const VILLE_REFERENCE = "Laval";

/** Coordonnées connues, indexées par nom normalisé (sans accents, en minuscules). */
const COORDONNEES: Record<string, { lat: number; lng: number }> = {
  laval: { lat: 48.0698, lng: -0.7686 },
  change: { lat: 48.1031, lng: -0.7547 },
  "bonchamp-les-laval": { lat: 48.0717, lng: -0.7128 },
  "saint-berthevin": { lat: 48.0681, lng: -0.8094 },
  // Communes voisines (≤ 20 km) — disponibles si ajoutées à la config :
  "louverne": { lat: 48.1133, lng: -0.7506 },
  "l-huisserie": { lat: 48.0269, lng: -0.7728 },
  "entrammes": { lat: 47.9844, lng: -0.7281 },
  "ahuille": { lat: 48.0331, lng: -0.8439 },
  "saint-jean-sur-mayenne": { lat: 48.1281, lng: -0.8208 },
  "argentre": { lat: 48.0631, lng: -0.6489 },
  "montflours": { lat: 48.1656, lng: -0.7972 },
};

/** Normalise un nom de commune pour servir de clé (accents, casse, séparateurs). */
function normalise(nom: string): string {
  return nom
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/['\s]+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Résout les coordonnées des communes fournies par la config.
 * Les communes sans coordonnées connues sont ignorées (dégradation propre).
 */
export function geoDesCommunes(communes: readonly string[]): CommuneGeo[] {
  return communes
    .map((nom) => {
      const coords = COORDONNEES[normalise(nom)];
      return coords ? { nom, ...coords } : null;
    })
    .filter((c): c is CommuneGeo => c !== null);
}
