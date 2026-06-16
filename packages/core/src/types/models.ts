import type {
  Allergene,
  Categorie,
  CoursesOption,
  Regime,
  Saison,
} from "../constants";
import type { Seo } from "../schemas";

// Les types de la collection `pages` (contenu variable) sont définis et validés
// via Zod dans ../schemas (Page, Seo).

// --- config_generale (document unique) ---------------------------------------
export interface ReseauxSociaux {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
}

export interface ConfigGenerale {
  nom_societe: string;
  telephone: string;
  email: string;
  zone_intervention: string;
  rayon_km: number;
  communes_couvertes: string[];
  reseaux_sociaux: ReseauxSociaux;
  logo_url?: string;
  banniere_active: boolean;
  banniere_message?: string;
  seo_defaut: Seo;
}

// --- plats -------------------------------------------------------------------
export interface ValeursNutritionnelles {
  calories?: number;
  proteines?: number;
  glucides?: number;
  lipides?: number;
}

/**
 * Prix du travail d'Emma pour un plat.
 * - `type: "fixe"`     → utiliser `fixe`.
 * - `type: "fourchette"` → utiliser `min` et `max`.
 */
export interface PrestationPrix {
  type: "fixe" | "fourchette";
  fixe?: number | null;
  min?: number | null;
  max?: number | null;
}

export interface Plat {
  id: string;
  nom: string;
  slug: string;
  categorie: Categorie;
  /** Coût matière première moyen (sert à estimer les courses si Emma les fait). */
  cout_matiere_premiere_moyen: number;
  /** Prix de prestation (le travail d'Emma), fixe ou en fourchette. */
  prestation: PrestationPrix;
  description: string;
  description_courte: string;
  image_principale?: string;
  images?: string[];
  ingredients: string[];
  allergenes: Allergene[];
  regimes: Regime[];
  valeurs_nutritionnelles?: ValeursNutritionnelles;
  conservation_jours?: number;
  mode_rechauffe?: string;
  saison?: Saison[];
  disponible: boolean;
  mis_en_avant: boolean;
  ordre: number;
  tags?: string[];
}

// --- formules ----------------------------------------------------------------
export interface Formule {
  id: string;
  nom: string;
  slug: string;
  description: string;
  image_principale?: string;
  /** Prix fixe du service (hors courses si réalisées par Emma). */
  prix: number;
  duree_heures: number;
  nombre_repas: number;
  nombre_personnes: number;
  courses: CoursesOption;
  /** Mention affichée expliquant le supplément courses + service. */
  mention_courses?: string;
  inclus: string[];
  non_inclus: string[];
  disponible: boolean;
  mis_en_avant: boolean;
  ordre: number;
}
