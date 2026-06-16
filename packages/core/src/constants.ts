/**
 * Valeurs codées (snake_case) partagées par toute l'app.
 * Centralisées ici pour éviter les fautes de frappe qui casseraient les filtres,
 * et pour fournir les libellés affichés à l'utilisateur.
 */

// --- Catégories de plats -----------------------------------------------------
export const CATEGORIES = ["entree", "plat", "dessert", "accompagnement"] as const;
export type Categorie = (typeof CATEGORIES)[number];
export const LABELS_CATEGORIE: Record<Categorie, string> = {
  entree: "Entrée",
  plat: "Plat",
  dessert: "Dessert",
  accompagnement: "Accompagnement",
};

// --- Allergènes (14 allergènes réglementaires — règlement INCO) ---------------
export const ALLERGENES = [
  "gluten",
  "crustaces",
  "oeufs",
  "poissons",
  "arachides",
  "soja",
  "lait",
  "fruits_a_coque",
  "celeri",
  "moutarde",
  "sesame",
  "sulfites",
  "lupin",
  "mollusques",
] as const;
export type Allergene = (typeof ALLERGENES)[number];
export const LABELS_ALLERGENE: Record<Allergene, string> = {
  gluten: "Gluten",
  crustaces: "Crustacés",
  oeufs: "Œufs",
  poissons: "Poissons",
  arachides: "Arachides",
  soja: "Soja",
  lait: "Lait",
  fruits_a_coque: "Fruits à coque",
  celeri: "Céleri",
  moutarde: "Moutarde",
  sesame: "Sésame",
  sulfites: "Anhydride sulfureux / sulfites",
  lupin: "Lupin",
  mollusques: "Mollusques",
};

// --- Régimes alimentaires ----------------------------------------------------
export const REGIMES = [
  "vegetarien",
  "vegan",
  "sans_gluten",
  "sans_lactose",
] as const;
export type Regime = (typeof REGIMES)[number];
export const LABELS_REGIME: Record<Regime, string> = {
  vegetarien: "Végétarien",
  vegan: "Vegan",
  sans_gluten: "Sans gluten",
  sans_lactose: "Sans lactose",
};

// --- Saisons -----------------------------------------------------------------
export const SAISONS = ["printemps", "ete", "automne", "hiver"] as const;
export type Saison = (typeof SAISONS)[number];

// --- Option "courses" d'une formule ------------------------------------------
export const COURSES_OPTIONS = ["incluses", "non_incluses", "en_option"] as const;
export type CoursesOption = (typeof COURSES_OPTIONS)[number];

// --- Types de page éditoriale ------------------------------------------------
export const TYPES_PAGE = [
  "accueil",
  "comment_ca_marche",
  "faq",
  "a_propos",
  "contact",
  "mentions_legales",
] as const;
export type TypePage = (typeof TYPES_PAGE)[number];

// --- Identifiants Firestore --------------------------------------------------
export const COLLECTIONS = {
  config: "config_generale",
  plats: "plats",
  formules: "formules",
  pages: "pages",
} as const;

/** Document unique de la collection `config_generale`. */
export const CONFIG_DOC_ID = "general";
