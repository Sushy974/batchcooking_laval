import { collection, getDocs, limit, query, where } from "firebase/firestore";

import { COLLECTIONS } from "../constants";
import { getDb } from "../firebase";
import { pageSchema, type Page } from "../schemas";

import { PageRepository } from "./page.repository";

/** Implémentation STAGING / PRODUCTION : communique avec Firestore. */
export class FirestorePageRepository extends PageRepository {
  async getAll(): Promise<Page[]> {
    const snap = await getDocs(collection(getDb(), COLLECTIONS.pages));
    const pages: Page[] = [];
    for (const d of snap.docs) {
      const parsed = pageSchema.safeParse(d.data());
      if (parsed.success) {
        pages.push({ id: d.id, ...parsed.data } as Page);
      } else {
        console.error(`Page "${d.id}" : data_contenu invalide`, parsed.error.issues);
      }
    }
    return pages;
  }

  async getBySlug(slug: string): Promise<Page | null> {
    const snap = await getDocs(
      query(collection(getDb(), COLLECTIONS.pages), where("slug", "==", slug), limit(1)),
    );
    const d = snap.docs[0];
    if (!d) return null;

    // Règle d'or : data_contenu est variable → on valide, on ne plante pas.
    const parsed = pageSchema.safeParse(d.data());
    if (!parsed.success) {
      console.error(`Page "${slug}" : data_contenu invalide`, parsed.error.issues);
      return null;
    }
    return { id: d.id, ...parsed.data } as Page;
  }
}
