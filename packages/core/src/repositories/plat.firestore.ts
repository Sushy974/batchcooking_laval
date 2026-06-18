import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { COLLECTIONS } from "../constants";
import { getDb } from "../firebase";
import type { PlatInput, Plat } from "../types/models";

import { PlatRepository, type PlatQuery } from "./plat.repository";

/** Implémentation STAGING / PRODUCTION : communique avec Firestore. */
export class FirestorePlatRepository extends PlatRepository {
  async getAll(q: PlatQuery = {}): Promise<Plat[]> {
    const base = collection(getDb(), COLLECTIONS.plats);
    const ref = q.disponiblesUniquement
      ? query(base, where("disponible", "==", true), orderBy("ordre"))
      : query(base, orderBy("ordre"));
    const snap = await getDocs(ref);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Plat);
  }

  async getMisEnAvant(max = 4): Promise<Plat[]> {
    const ref = query(
      collection(getDb(), COLLECTIONS.plats),
      where("disponible", "==", true),
      where("mis_en_avant", "==", true),
      orderBy("ordre"),
      limit(max),
    );
    const snap = await getDocs(ref);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Plat);
  }

  async getBySlug(slug: string): Promise<Plat | null> {
    const snap = await getDocs(
      query(collection(getDb(), COLLECTIONS.plats), where("slug", "==", slug), limit(1)),
    );
    const d = snap.docs[0];
    return d ? ({ id: d.id, ...d.data() } as Plat) : null;
  }

  async getById(id: string): Promise<Plat | null> {
    const snap = await getDoc(doc(getDb(), COLLECTIONS.plats, id));
    return snap.exists() ? ({ id: snap.id, ...snap.data() } as Plat) : null;
  }

  async creer(data: PlatInput): Promise<string> {
    const ref = await addDoc(collection(getDb(), COLLECTIONS.plats), data);
    return ref.id;
  }

  async modifier(id: string, data: PlatInput): Promise<void> {
    await setDoc(doc(getDb(), COLLECTIONS.plats, id), data);
  }

  async supprimer(id: string): Promise<void> {
    await deleteDoc(doc(getDb(), COLLECTIONS.plats, id));
  }
}
