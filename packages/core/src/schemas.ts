import { z } from "zod";
import { TYPES_PAGE } from "./constants";

/**
 * Schémas Zod pour la collection `pages`.
 *
 * Le contenu d'une page (`data_contenu`) est VARIABLE selon son `type_page`.
 * On valide donc sa forme à la lecture (règle d'or du cahier des charges :
 * tolérer l'absence d'un champ, ne jamais planter). Chaque variante correspond
 * au contrat documenté dans base_connaissance/cahier_des_charges.md.
 */

export const seoSchema = z.object({
  titre: z.string(),
  description: z.string(),
});

// --- Contrats `data_contenu` par `type_page` ---------------------------------

const accueilContenu = z.object({
  hero: z
    .object({
      titre: z.string(),
      sous_titre: z.string().optional(),
      image: z.string().optional(),
      cta_label: z.string().optional(),
      cta_lien: z.string().optional(),
    })
    .partial({ titre: true })
    .optional(),
  arguments: z
    .array(
      z.object({
        icone: z.string().optional(),
        titre: z.string(),
        texte: z.string(),
      }),
    )
    .default([]),
  section_formules: z
    .object({ titre: z.string(), afficher: z.boolean() })
    .optional(),
  section_plats: z
    .object({ titre: z.string(), afficher: z.boolean() })
    .optional(),
  section_zone: z.object({ titre: z.string(), texte: z.string() }).optional(),
  cta_final: z
    .object({
      titre: z.string(),
      texte: z.string(),
      label: z.string(),
      lien: z.string(),
    })
    .optional(),
});

const commentCaMarcheContenu = z.object({
  intro: z.string().optional(),
  etapes: z
    .array(
      z.object({
        numero: z.number().optional(),
        icone: z.string().optional(),
        titre: z.string(),
        texte: z.string(),
      }),
    )
    .default([]),
});

const faqContenu = z.object({
  intro: z.string().optional(),
  questions: z
    .array(z.object({ question: z.string(), reponse: z.string() }))
    .default([]),
});

const aProposContenu = z.object({
  portrait: z.string().optional(),
  intro: z.string().optional(),
  sections: z
    .array(z.object({ titre: z.string(), texte: z.string() }))
    .default([]),
  citation: z.string().optional(),
});

const contactContenu = z.object({
  intro: z.string().optional(),
  afficher_telephone: z.boolean().default(true),
  afficher_email: z.boolean().default(true),
  afficher_instagram: z.boolean().default(true),
});

// Structure générique réutilisable (mentions légales, CGV, confidentialité…).
const blocsContenu = z.object({
  blocs: z
    .array(z.object({ titre: z.string(), texte: z.string() }))
    .default([]),
});

// --- Page (union discriminée sur `type_page`) --------------------------------

const pageBase = {
  slug: z.string(),
  titre: z.string(),
  publie: z.boolean().default(false),
  seo: seoSchema,
};

export const pageSchema = z.discriminatedUnion("type_page", [
  z.object({ ...pageBase, type_page: z.literal("accueil"), data_contenu: accueilContenu }),
  z.object({ ...pageBase, type_page: z.literal("comment_ca_marche"), data_contenu: commentCaMarcheContenu }),
  z.object({ ...pageBase, type_page: z.literal("faq"), data_contenu: faqContenu }),
  z.object({ ...pageBase, type_page: z.literal("a_propos"), data_contenu: aProposContenu }),
  z.object({ ...pageBase, type_page: z.literal("contact"), data_contenu: contactContenu }),
  z.object({ ...pageBase, type_page: z.literal("mentions_legales"), data_contenu: blocsContenu }),
]);

// Garde-fou : la liste des variantes du schéma doit suivre l'enum TYPES_PAGE.
void TYPES_PAGE;

/** Page validée + son identifiant Firestore. */
export type Page = z.infer<typeof pageSchema> & { id: string };
export type Seo = z.infer<typeof seoSchema>;
