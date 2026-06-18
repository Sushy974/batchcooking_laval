"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useUseCases } from "@batchcooking/core/client";
import {
  ALLERGENES,
  CATEGORIES,
  LABELS_ALLERGENE,
  LABELS_CATEGORIE,
  LABELS_REGIME,
  REGIMES,
  SAISONS,
  type Allergene,
  type Categorie,
  type Plat,
  type PlatInput,
  type Regime,
  type Saison,
} from "@batchcooking/core";

const LABELS_SAISON: Record<Saison, string> = {
  printemps: "Printemps",
  ete: "Été",
  automne: "Automne",
  hiver: "Hiver",
};

const nombreOuNull = (v: string): number | null => {
  if (v.trim() === "") return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
};

export function PlatForm({ plat }: { plat?: Plat }) {
  const useCases = useUseCases();
  const router = useRouter();
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  const [nom, setNom] = useState(plat?.nom ?? "");
  const [slug, setSlug] = useState(plat?.slug ?? "");
  const [categorie, setCategorie] = useState<Categorie>(
    plat?.categorie ?? "plat",
  );
  const [descriptionCourte, setDescriptionCourte] = useState(
    plat?.description_courte ?? "",
  );
  const [description, setDescription] = useState(plat?.description ?? "");
  const [imagePrincipale, setImagePrincipale] = useState(
    plat?.image_principale ?? "",
  );
  const [coutMatiere, setCoutMatiere] = useState(
    plat ? String(plat.cout_matiere_premiere_moyen) : "",
  );
  const [prestationType, setPrestationType] = useState<"fixe" | "fourchette">(
    plat?.prestation.type ?? "fixe",
  );
  const [fixe, setFixe] = useState(plat?.prestation.fixe?.toString() ?? "");
  const [min, setMin] = useState(plat?.prestation.min?.toString() ?? "");
  const [max, setMax] = useState(plat?.prestation.max?.toString() ?? "");
  const [ingredients, setIngredients] = useState(
    (plat?.ingredients ?? []).join("\n"),
  );
  const [allergenes, setAllergenes] = useState<string[]>(plat?.allergenes ?? []);
  const [regimes, setRegimes] = useState<string[]>(plat?.regimes ?? []);
  const [saison, setSaison] = useState<string[]>(plat?.saison ?? []);
  const [calories, setCalories] = useState(
    plat?.valeurs_nutritionnelles?.calories?.toString() ?? "",
  );
  const [proteines, setProteines] = useState(
    plat?.valeurs_nutritionnelles?.proteines?.toString() ?? "",
  );
  const [glucides, setGlucides] = useState(
    plat?.valeurs_nutritionnelles?.glucides?.toString() ?? "",
  );
  const [lipides, setLipides] = useState(
    plat?.valeurs_nutritionnelles?.lipides?.toString() ?? "",
  );
  const [conservation, setConservation] = useState(
    plat?.conservation_jours?.toString() ?? "",
  );
  const [modeRechauffe, setModeRechauffe] = useState(plat?.mode_rechauffe ?? "");
  const [tags, setTags] = useState((plat?.tags ?? []).join(", "));
  const [disponible, setDisponible] = useState(plat?.disponible ?? true);
  const [misEnAvant, setMisEnAvant] = useState(plat?.mis_en_avant ?? false);
  const [ordre, setOrdre] = useState(plat?.ordre?.toString() ?? "0");

  const construire = (): PlatInput => {
    const nutrition = {
      calories: nombreOuNull(calories),
      proteines: nombreOuNull(proteines),
      glucides: nombreOuNull(glucides),
      lipides: nombreOuNull(lipides),
    };
    const aNutrition = Object.values(nutrition).some((v) => v !== null);

    return {
      nom,
      slug,
      categorie,
      cout_matiere_premiere_moyen: nombreOuNull(coutMatiere) ?? 0,
      prestation: {
        type: prestationType,
        fixe: prestationType === "fixe" ? nombreOuNull(fixe) : null,
        min: prestationType === "fourchette" ? nombreOuNull(min) : null,
        max: prestationType === "fourchette" ? nombreOuNull(max) : null,
      },
      description,
      description_courte: descriptionCourte,
      image_principale: imagePrincipale || undefined,
      ingredients: ingredients
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean),
      allergenes: allergenes as Allergene[],
      regimes: regimes as Regime[],
      valeurs_nutritionnelles: aNutrition
        ? {
            calories: nutrition.calories ?? undefined,
            proteines: nutrition.proteines ?? undefined,
            glucides: nutrition.glucides ?? undefined,
            lipides: nutrition.lipides ?? undefined,
          }
        : undefined,
      conservation_jours: nombreOuNull(conservation) ?? undefined,
      mode_rechauffe: modeRechauffe || undefined,
      saison: saison.length ? (saison as Saison[]) : undefined,
      disponible,
      mis_en_avant: misEnAvant,
      ordre: nombreOuNull(ordre) ?? 0,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
  };

  const soumettre = async (e: FormEvent) => {
    e.preventDefault();
    setErreur(null);
    setEnCours(true);
    try {
      const data = construire();
      if (plat) {
        await useCases.modifierPlat.execute(plat.id, data);
      } else {
        await useCases.creerPlat.execute(data);
      }
      router.push("/plats");
      router.refresh();
    } catch (e) {
      console.error(e);
      setErreur("Échec de l'enregistrement. Vérifiez votre connexion / droits.");
      setEnCours(false);
    }
  };

  return (
    <form onSubmit={soumettre} className="max-w-2xl space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Champ label="Nom">
          <input className={INPUT} value={nom} onChange={(e) => setNom(e.target.value)} required />
        </Champ>
        <Champ label="Slug">
          <input className={INPUT} value={slug} onChange={(e) => setSlug(e.target.value)} required />
        </Champ>
        <Champ label="Catégorie">
          <select className={INPUT} value={categorie} onChange={(e) => setCategorie(e.target.value as Categorie)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{LABELS_CATEGORIE[c]}</option>
            ))}
          </select>
        </Champ>
        <Champ label="Ordre d'affichage">
          <input type="number" className={INPUT} value={ordre} onChange={(e) => setOrdre(e.target.value)} />
        </Champ>
      </div>

      <Champ label="Description courte">
        <input className={INPUT} value={descriptionCourte} onChange={(e) => setDescriptionCourte(e.target.value)} />
      </Champ>
      <Champ label="Description">
        <textarea className={INPUT} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
      </Champ>
      <Champ label="Image principale (URL)">
        <input className={INPUT} value={imagePrincipale} onChange={(e) => setImagePrincipale(e.target.value)} />
      </Champ>

      <div className="grid gap-4 sm:grid-cols-2">
        <Champ label="Coût matière première moyen (€)">
          <input type="number" step="0.1" className={INPUT} value={coutMatiere} onChange={(e) => setCoutMatiere(e.target.value)} />
        </Champ>
        <Champ label="Type de prestation">
          <select className={INPUT} value={prestationType} onChange={(e) => setPrestationType(e.target.value as "fixe" | "fourchette")}>
            <option value="fixe">Prix fixe</option>
            <option value="fourchette">Fourchette</option>
          </select>
        </Champ>
        {prestationType === "fixe" ? (
          <Champ label="Prix prestation (€)">
            <input type="number" step="0.1" className={INPUT} value={fixe} onChange={(e) => setFixe(e.target.value)} />
          </Champ>
        ) : (
          <>
            <Champ label="Prestation min (€)">
              <input type="number" step="0.1" className={INPUT} value={min} onChange={(e) => setMin(e.target.value)} />
            </Champ>
            <Champ label="Prestation max (€)">
              <input type="number" step="0.1" className={INPUT} value={max} onChange={(e) => setMax(e.target.value)} />
            </Champ>
          </>
        )}
      </div>

      <Champ label="Ingrédients (un par ligne)">
        <textarea className={INPUT} rows={4} value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
      </Champ>

      <GroupeCases label="Allergènes" options={ALLERGENES.map((a) => ({ valeur: a, libelle: LABELS_ALLERGENE[a] }))} valeurs={allergenes} set={setAllergenes} />
      <GroupeCases label="Régimes" options={REGIMES.map((r) => ({ valeur: r, libelle: LABELS_REGIME[r] }))} valeurs={regimes} set={setRegimes} />
      <GroupeCases label="Saisons" options={SAISONS.map((s) => ({ valeur: s, libelle: LABELS_SAISON[s] }))} valeurs={saison} set={setSaison} />

      <div className="grid gap-4 sm:grid-cols-4">
        <Champ label="Calories"><input type="number" className={INPUT} value={calories} onChange={(e) => setCalories(e.target.value)} /></Champ>
        <Champ label="Protéines (g)"><input type="number" className={INPUT} value={proteines} onChange={(e) => setProteines(e.target.value)} /></Champ>
        <Champ label="Glucides (g)"><input type="number" className={INPUT} value={glucides} onChange={(e) => setGlucides(e.target.value)} /></Champ>
        <Champ label="Lipides (g)"><input type="number" className={INPUT} value={lipides} onChange={(e) => setLipides(e.target.value)} /></Champ>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Champ label="Conservation (jours)"><input type="number" className={INPUT} value={conservation} onChange={(e) => setConservation(e.target.value)} /></Champ>
        <Champ label="Mode de réchauffe"><input className={INPUT} value={modeRechauffe} onChange={(e) => setModeRechauffe(e.target.value)} /></Champ>
      </div>
      <Champ label="Tags (séparés par des virgules)">
        <input className={INPUT} value={tags} onChange={(e) => setTags(e.target.value)} />
      </Champ>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={disponible} onChange={(e) => setDisponible(e.target.checked)} /> Disponible
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={misEnAvant} onChange={(e) => setMisEnAvant(e.target.checked)} /> Mis en avant
        </label>
      </div>

      {erreur && <p className="text-sm text-red-600">{erreur}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={enCours} className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60">
          {enCours ? "Enregistrement…" : plat ? "Enregistrer" : "Créer le plat"}
        </button>
        <button type="button" onClick={() => router.push("/plats")} className="rounded-lg border border-border px-5 py-2 text-sm">
          Annuler
        </button>
      </div>
    </form>
  );
}

const INPUT =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm";

function Champ({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm font-medium">
      <span className="mb-1 block">{label}</span>
      {children}
    </label>
  );
}

function GroupeCases({
  label,
  options,
  valeurs,
  set,
}: {
  label: string;
  options: { valeur: string; libelle: string }[];
  valeurs: string[];
  set: (v: string[]) => void;
}) {
  const toggle = (v: string) =>
    set(valeurs.includes(v) ? valeurs.filter((x) => x !== v) : [...valeurs, v]);
  return (
    <fieldset>
      <legend className="mb-1 text-sm font-medium">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o.valeur}
            className={`cursor-pointer rounded-full border px-3 py-1 text-xs ${
              valeurs.includes(o.valeur)
                ? "border-primary bg-primary/10 text-primary"
                : "border-border"
            }`}
          >
            <input
              type="checkbox"
              className="sr-only"
              checked={valeurs.includes(o.valeur)}
              onChange={() => toggle(o.valeur)}
            />
            {o.libelle}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
