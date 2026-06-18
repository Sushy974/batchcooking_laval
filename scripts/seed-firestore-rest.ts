/**
 * Peuple un Firestore avec les fixtures via l'API REST, en utilisant un jeton
 * IAM (propriétaire du projet). Les écritures IAM ne passent PAS par les règles
 * de sécurité → inutile d'ouvrir les règles. Idempotent (PATCH = upsert).
 *
 * Usage :
 *   PROJECT_ID=batchcooking-laval-staging \
 *   GCLOUD_TOKEN="$(gcloud auth print-access-token)" \
 *   node --experimental-strip-types scripts/seed-firestore-rest.ts
 */
import {
  fixtureConfig,
  fixtureFormules,
  fixturePages,
  fixturePlats,
} from "../packages/core/src/fixtures.ts";

const PROJECT_ID = process.env.PROJECT_ID;
const TOKEN = process.env.GCLOUD_TOKEN;

if (!PROJECT_ID || !TOKEN) {
  throw new Error("PROJECT_ID et GCLOUD_TOKEN requis");
}

const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

type Valeur = Record<string, unknown>;

function versValeur(v: unknown): Valeur {
  if (v === null) return { nullValue: null };
  if (typeof v === "boolean") return { booleanValue: v };
  if (typeof v === "number") {
    return Number.isInteger(v)
      ? { integerValue: String(v) }
      : { doubleValue: v };
  }
  if (typeof v === "string") return { stringValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(versValeur) } };
  if (typeof v === "object") {
    return { mapValue: { fields: versChamps(v as Record<string, unknown>) } };
  }
  throw new Error(`Type non géré : ${typeof v}`);
}

function versChamps(obj: Record<string, unknown>): Record<string, Valeur> {
  const champs: Record<string, Valeur> = {};
  for (const [cle, valeur] of Object.entries(obj)) {
    if (valeur === undefined) continue;
    champs[cle] = versValeur(valeur);
  }
  return champs;
}

async function ecrire(
  collection: string,
  id: string,
  data: Record<string, unknown>,
): Promise<void> {
  const url = `${BASE}/${collection}/${encodeURIComponent(id)}`;
  const reponse = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields: versChamps(data) }),
  });
  if (!reponse.ok) {
    throw new Error(
      `${collection}/${id} : ${reponse.status} ${await reponse.text()}`,
    );
  }
}

async function seed() {
  console.log(`Seed du projet : ${PROJECT_ID}`);

  await ecrire("config_generale", "general", fixtureConfig);
  console.log("✓ config_generale/general");

  for (const plat of fixturePlats) {
    const { id, ...data } = plat;
    await ecrire("plats", id, data);
  }
  console.log(`✓ ${fixturePlats.length} plats`);

  for (const formule of fixtureFormules) {
    const { id, ...data } = formule;
    await ecrire("formules", id, data);
  }
  console.log(`✓ ${fixtureFormules.length} formules`);

  for (const page of fixturePages) {
    const { id, ...data } = page;
    await ecrire("pages", id, data);
  }
  console.log(`✓ ${fixturePages.length} pages`);

  console.log("✅ Seed terminé.");
}

seed()
  .then(() => process.exit(0))
  .catch((erreur) => {
    console.error("❌ Échec du seed :", erreur);
    process.exit(1);
  });
