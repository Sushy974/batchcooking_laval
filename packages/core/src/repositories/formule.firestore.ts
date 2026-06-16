import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";

import { COLLECTIONS } from "../constants";
import { getDb } from "../firebase";
import type { Formule } from "../types/models";

import { FormuleRepository, type FormuleQuery } from "./formule.repository";

/** Implémentation STAGING / PRODUCTION : communique avec Firestore. */
export class FirestoreFormuleRepository extends FormuleRepository {
  async getAll(q: FormuleQuery = {}): Promise<Formule[]> {
    const base = collection(getDb(), COLLECTIONS.formules);
    const ref = q.disponiblesUniquement
      ? query(base, where("disponible", "==", true), orderBy("ordre"))
      : query(base, orderBy("ordre"));
    const snap = await getDocs(ref);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Formule);
  }

  async getBySlug(slug: string): Promise<Formule | null> {
    const snap = await getDocs(
      query(collection(getDb(), COLLECTIONS.formules), where("slug", "==", slug), limit(1)),
    );
    const d = snap.docs[0];
    return d ? ({ id: d.id, ...d.data() } as Formule) : null;
  }
}
