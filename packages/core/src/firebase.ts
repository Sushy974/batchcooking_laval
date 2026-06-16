import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

/**
 * Configuration Firebase (SDK Web).
 * Clés publiques côté client (NEXT_PUBLIC_) : normal — la sécurité repose sur
 * les Firestore Rules, pas sur le secret de ces clés. Voir `firestore.rules`.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Initialisation PARESSEUSE.
 * On n'initialise un service Firebase que lorsqu'on l'utilise réellement (et non
 * à l'import) : sinon, en environnement `mock` (dev) ou au build, des clés vides
 * feraient planter `getAuth()` (`auth/invalid-api-key`) alors qu'on ne s'en sert
 * même pas. Les Fake repositories ne touchent jamais à Firebase.
 */
function getFirebaseApp(): FirebaseApp {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export function getDb(): Firestore {
  return getFirestore(getFirebaseApp());
}

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
}

export function getFirebaseStorage(): FirebaseStorage {
  return getStorage(getFirebaseApp());
}
