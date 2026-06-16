import type { Page } from "./schemas";
import type { ConfigGenerale, Formule, Plat } from "./types/models";

/**
 * Fausse base de données locale (environnement de développement).
 * Sert à développer la vitrine et l'admin SANS Firebase : on remplit ces
 * variables à la main. C'est la source consommée par `mock-source.ts`.
 */

export const fixtureConfig: ConfigGenerale = {
  nom_societe: "Le Batchcooking d'Emma",
  telephone: "06 12 34 56 78",
  email: "contact@batchcooking-emma.fr",
  zone_intervention: "Laval et 20 km alentour",
  rayon_km: 20,
  communes_couvertes: ["Laval", "Changé", "Bonchamp-lès-Laval", "Saint-Berthevin"],
  reseaux_sociaux: {
    instagram: "@emma_batchcooking",
    facebook: "",
    tiktok: "",
  },
  logo_url: "",
  banniere_active: true,
  banniere_message: "📅 Réservations ouvertes pour septembre !",
  seo_defaut: {
    titre: "Le Batchcooking d'Emma — Vos repas de la semaine cuisinés chez vous",
    description:
      "Emma vient cuisiner vos plats de la semaine à domicile, à Laval et alentour. Courses incluses en option.",
  },
};

export const fixturePlats: Plat[] = [
  {
    id: "plat-curry-poulet",
    nom: "Curry de poulet & riz basmati",
    slug: "curry-poulet-riz-basmati",
    categorie: "plat",
    cout_matiere_premiere_moyen: 3.5,
    prestation: { type: "fourchette", min: 4, max: 6, fixe: null },
    description:
      "Poulet mijoté au lait de coco, légumes de saison et épices douces, accompagné d'un riz basmati parfumé.",
    description_courte: "Mijoté crémeux, doux et parfumé.",
    image_principale: "",
    images: [],
    ingredients: ["Poulet", "Lait de coco", "Riz basmati", "Curry", "Oignon", "Carotte"],
    allergenes: ["soja"],
    regimes: ["sans_gluten"],
    valeurs_nutritionnelles: { calories: 540, proteines: 32, glucides: 48, lipides: 18 },
    conservation_jours: 4,
    mode_rechauffe: "Micro-ondes 2 min ou poêle 5 min",
    saison: ["automne", "hiver"],
    disponible: true,
    mis_en_avant: true,
    ordre: 1,
    tags: ["réconfortant", "best-seller"],
  },
  {
    id: "plat-buddha-bowl",
    nom: "Buddha bowl de saison",
    slug: "buddha-bowl-saison",
    categorie: "plat",
    cout_matiere_premiere_moyen: 2.8,
    prestation: { type: "fixe", fixe: 5, min: null, max: null },
    description:
      "Quinoa, légumes rôtis, pois chiches croustillants et sauce tahini. Coloré, complet et 100 % végétal.",
    description_courte: "Healthy, coloré et rassasiant.",
    image_principale: "",
    images: [],
    ingredients: ["Quinoa", "Pois chiches", "Patate douce", "Brocoli", "Tahini"],
    allergenes: ["sesame"],
    regimes: ["vegan", "vegetarien", "sans_gluten"],
    valeurs_nutritionnelles: { calories: 480, proteines: 18, glucides: 60, lipides: 16 },
    conservation_jours: 5,
    mode_rechauffe: "Se déguste froid ou tiédi 1 min au micro-ondes",
    saison: ["printemps", "ete"],
    disponible: true,
    mis_en_avant: true,
    ordre: 2,
    tags: ["végétal"],
  },
  {
    id: "plat-tarte-citron",
    nom: "Tarte au citron meringuée",
    slug: "tarte-citron-meringuee",
    categorie: "dessert",
    cout_matiere_premiere_moyen: 1.8,
    prestation: { type: "fixe", fixe: 3, min: null, max: null },
    description: "Pâte sablée maison, crème de citron acidulée et meringue dorée.",
    description_courte: "Acidulée et gourmande.",
    image_principale: "",
    images: [],
    ingredients: ["Citron", "Œufs", "Beurre", "Farine", "Sucre"],
    allergenes: ["gluten", "oeufs", "lait"],
    regimes: ["vegetarien"],
    valeurs_nutritionnelles: { calories: 320, proteines: 5, glucides: 42, lipides: 14 },
    conservation_jours: 3,
    mode_rechauffe: "À déguster froide",
    saison: ["printemps", "ete", "automne", "hiver"],
    disponible: true,
    mis_en_avant: false,
    ordre: 3,
    tags: ["dessert"],
  },
];

export const fixtureFormules: Formule[] = [
  {
    id: "formule-semaine-sereine",
    nom: "La Semaine Sereine",
    slug: "semaine-sereine",
    description:
      "Une demi-journée chez vous, et vos 5 dîners de la semaine sont prêts, étiquetés et prêts à réchauffer.",
    image_principale: "",
    prix: 120,
    duree_heures: 4,
    nombre_repas: 5,
    nombre_personnes: 4,
    courses: "en_option",
    mention_courses:
      "Si Emma réalise les courses, un supplément correspondant au montant des courses + le service est facturé en plus.",
    inclus: [
      "Élaboration du menu avec vous",
      "Cuisine sur place",
      "Mise en barquettes étiquetées",
      "Nettoyage du plan de travail",
    ],
    non_inclus: ["Le montant des courses si elles sont réalisées par Emma (facturé en supplément)"],
    disponible: true,
    mis_en_avant: true,
    ordre: 1,
  },
  {
    id: "formule-decouverte",
    nom: "La Découverte",
    slug: "decouverte",
    description: "Une première séance pour tester le batchcooking à domicile : 3 plats pour la semaine.",
    image_principale: "",
    prix: 75,
    duree_heures: 2.5,
    nombre_repas: 3,
    nombre_personnes: 2,
    courses: "non_incluses",
    mention_courses: "Vous réalisez vos courses vous-même à partir de la liste fournie par Emma.",
    inclus: ["Élaboration du menu", "Cuisine sur place", "Mise en barquettes étiquetées"],
    non_inclus: ["Les courses"],
    disponible: true,
    mis_en_avant: true,
    ordre: 2,
  },
];

export const fixturePages: Page[] = [
  {
    id: "page-accueil",
    slug: "accueil",
    type_page: "accueil",
    titre: "Accueil",
    publie: true,
    seo: fixtureConfig.seo_defaut,
    data_contenu: {
      hero: {
        titre: "Emma cuisine vos repas de la semaine, chez vous",
        sous_titre: "Le batchcooking à domicile, à Laval et alentour.",
        image: "",
        cta_label: "Découvrir les formules",
        cta_lien: "/formules",
      },
      arguments: [
        { icone: "clock", titre: "Gagnez du temps", texte: "Plus de corvée de cuisine le soir." },
        { icone: "heart", titre: "Fait maison", texte: "Des plats sains, adaptés à vos goûts." },
        { icone: "leaf", titre: "De saison", texte: "Des produits frais et de saison." },
      ],
      section_formules: { titre: "Mes formules", afficher: true },
      section_plats: { titre: "Un aperçu de mes plats", afficher: true },
      section_zone: {
        titre: "Où j'interviens",
        texte: "Je me déplace à Laval et dans un rayon de 20 km.",
      },
      cta_final: {
        titre: "Envie de tester ?",
        texte: "Contactez-moi pour organiser votre première séance.",
        label: "Me contacter",
        lien: "/contact",
      },
    },
  },
  {
    id: "page-comment-ca-marche",
    slug: "comment-ca-marche",
    type_page: "comment_ca_marche",
    titre: "Comment ça marche",
    publie: true,
    seo: {
      titre: "Comment ça marche — Le Batchcooking d'Emma",
      description: "Le déroulé d'une prestation de batchcooking à domicile, en 4 étapes.",
    },
    data_contenu: {
      intro: "Une prestation simple, en 4 étapes.",
      etapes: [
        { numero: 1, icone: "list", titre: "On choisit le menu ensemble", texte: "Selon vos goûts et contraintes." },
        { numero: 2, icone: "shopping-cart", titre: "Les courses", texte: "Vous les faites, ou je m'en charge (montant + service en supplément)." },
        { numero: 3, icone: "chef-hat", titre: "Je cuisine chez vous", texte: "Une demi-journée, tout est préparé." },
        { numero: 4, icone: "utensils", titre: "Vos repas sont prêts", texte: "Étiquetés, prêts à réchauffer toute la semaine." },
      ],
    },
  },
  {
    id: "page-faq",
    slug: "faq",
    type_page: "faq",
    titre: "FAQ",
    publie: true,
    seo: { titre: "FAQ — Le Batchcooking d'Emma", description: "Les questions fréquentes." },
    data_contenu: {
      intro: "Les questions qu'on me pose souvent.",
      questions: [
        { question: "Faut-il que j'aie du matériel particulier ?", reponse: "Non, je cuisine avec ce que vous avez." },
        { question: "Comment se passent les courses ?", reponse: "Vous pouvez les faire vous-même ou me les confier." },
        { question: "Combien de temps se conservent les plats ?", reponse: "En général de 3 à 5 jours au réfrigérateur ; c'est indiqué sur chaque plat." },
      ],
    },
  },
  {
    id: "page-a-propos",
    slug: "a-propos",
    type_page: "a_propos",
    titre: "À propos",
    publie: true,
    seo: { titre: "À propos — Le Batchcooking d'Emma", description: "Le parcours d'Emma." },
    data_contenu: {
      portrait: "",
      intro: "Bonjour, moi c'est Emma.",
      sections: [
        { titre: "Mon parcours", texte: "Passionnée de cuisine depuis toujours, j'ai décidé d'aider les familles à mieux manger sans y passer leurs soirées." },
        { titre: "Ma cuisine", texte: "Des produits frais, de saison, et des recettes adaptées à vos goûts et contraintes." },
      ],
      citation: "Bien manger ne devrait jamais être une corvée.",
    },
  },
  {
    id: "page-contact",
    slug: "contact",
    type_page: "contact",
    titre: "Contact",
    publie: true,
    seo: { titre: "Contact — Le Batchcooking d'Emma", description: "Contactez Emma." },
    data_contenu: {
      intro: "Une question ? Envie de réserver une séance ? Écrivez-moi.",
      afficher_telephone: true,
      afficher_email: true,
      afficher_instagram: true,
    },
  },
  {
    id: "page-mentions-legales",
    slug: "mentions-legales",
    type_page: "mentions_legales",
    titre: "Mentions légales",
    publie: true,
    seo: { titre: "Mentions légales", description: "Mentions légales du site." },
    data_contenu: {
      blocs: [
        { titre: "Éditeur du site", texte: "Le Batchcooking d'Emma — à compléter." },
        { titre: "Hébergement", texte: "À compléter." },
        { titre: "Données personnelles", texte: "À compléter." },
      ],
    },
  },
];
