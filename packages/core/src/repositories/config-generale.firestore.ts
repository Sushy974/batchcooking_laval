import { doc, getDoc } from "firebase/firestore";

import { COLLECTIONS, CONFIG_DOC_ID } from "../constants";
import { getDb } from "../firebase";
import type { ConfigGenerale } from "../types/models";

import { ConfigGeneraleRepository } from "./config-generale.repository";

/** Implémentation STAGING / PRODUCTION : communique avec Firestore. */
export class FirestoreConfigGeneraleRepository extends ConfigGeneraleRepository {
  async get(): Promise<ConfigGenerale | null> {
    const snap = await getDoc(doc(getDb(), COLLECTIONS.config, CONFIG_DOC_ID));
    return snap.exists() ? (snap.data() as ConfigGenerale) : null;
  }
}
