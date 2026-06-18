import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { getFirebaseAuth } from "../firebase";
import type { Utilisateur } from "../types/models";

import { AuthRepository } from "./auth.repository";

/** Auth STAGING / PRODUCTION : Firebase Authentication (email / mot de passe). */
export class FirebaseAuthRepository extends AuthRepository {
  async connexion(email: string, motDePasse: string): Promise<Utilisateur> {
    const { user } = await signInWithEmailAndPassword(
      getFirebaseAuth(),
      email,
      motDePasse,
    );
    return { uid: user.uid, email: user.email };
  }

  async deconnexion(): Promise<void> {
    await signOut(getFirebaseAuth());
  }

  observer(callback: (u: Utilisateur | null) => void): () => void {
    return onAuthStateChanged(getFirebaseAuth(), (user) => {
      callback(user ? { uid: user.uid, email: user.email } : null);
    });
  }
}
