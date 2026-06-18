"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useUseCases } from "@batchcooking/core/client";
import type { ConfigGenerale } from "@batchcooking/core";

const INPUT =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm";

export function ConfigForm({ config }: { config: ConfigGenerale | null }) {
  const useCases = useUseCases();
  const router = useRouter();
  const [enCours, setEnCours] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [nom, setNom] = useState(config?.nom_societe ?? "");
  const [telephone, setTelephone] = useState(config?.telephone ?? "");
  const [email, setEmail] = useState(config?.email ?? "");
  const [zone, setZone] = useState(config?.zone_intervention ?? "");
  const [rayon, setRayon] = useState(config?.rayon_km?.toString() ?? "");
  const [communes, setCommunes] = useState(
    (config?.communes_couvertes ?? []).join(", "),
  );
  const [instagram, setInstagram] = useState(
    config?.reseaux_sociaux?.instagram ?? "",
  );
  const [logo, setLogo] = useState(config?.logo_url ?? "");
  const [banniereActive, setBanniereActive] = useState(
    config?.banniere_active ?? false,
  );
  const [banniereMessage, setBanniereMessage] = useState(
    config?.banniere_message ?? "",
  );
  const [seoTitre, setSeoTitre] = useState(config?.seo_defaut?.titre ?? "");
  const [seoDesc, setSeoDesc] = useState(config?.seo_defaut?.description ?? "");

  const soumettre = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setEnCours(true);
    const data: ConfigGenerale = {
      nom_societe: nom,
      telephone,
      email,
      zone_intervention: zone,
      rayon_km: Number(rayon) || 0,
      communes_couvertes: communes
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      reseaux_sociaux: { ...config?.reseaux_sociaux, instagram },
      logo_url: logo || undefined,
      banniere_active: banniereActive,
      banniere_message: banniereMessage || undefined,
      seo_defaut: { titre: seoTitre, description: seoDesc },
    };
    try {
      await useCases.modifierConfig.execute(data);
      setMessage("✅ Configuration enregistrée.");
      router.refresh();
    } catch (e) {
      console.error(e);
      setMessage("❌ Échec de l'enregistrement (connexion / droits ?).");
    } finally {
      setEnCours(false);
    }
  };

  return (
    <form onSubmit={soumettre} className="max-w-2xl space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Champ label="Nom de la société">
          <input className={INPUT} value={nom} onChange={(e) => setNom(e.target.value)} />
        </Champ>
        <Champ label="Téléphone">
          <input className={INPUT} value={telephone} onChange={(e) => setTelephone(e.target.value)} />
        </Champ>
        <Champ label="Email">
          <input className={INPUT} value={email} onChange={(e) => setEmail(e.target.value)} />
        </Champ>
        <Champ label="Instagram">
          <input className={INPUT} value={instagram} onChange={(e) => setInstagram(e.target.value)} />
        </Champ>
        <Champ label="Zone d'intervention">
          <input className={INPUT} value={zone} onChange={(e) => setZone(e.target.value)} />
        </Champ>
        <Champ label="Rayon (km)">
          <input type="number" className={INPUT} value={rayon} onChange={(e) => setRayon(e.target.value)} />
        </Champ>
      </div>

      <Champ label="Communes couvertes (séparées par des virgules)">
        <textarea className={INPUT} rows={2} value={communes} onChange={(e) => setCommunes(e.target.value)} />
      </Champ>
      <Champ label="Logo (URL)">
        <input className={INPUT} value={logo} onChange={(e) => setLogo(e.target.value)} />
      </Champ>

      <div className="rounded-xl border border-border p-4">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" checked={banniereActive} onChange={(e) => setBanniereActive(e.target.checked)} />
          Bannière active
        </label>
        <div className="mt-3">
          <Champ label="Message de la bannière">
            <input className={INPUT} value={banniereMessage} onChange={(e) => setBanniereMessage(e.target.value)} />
          </Champ>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Champ label="SEO — titre par défaut">
          <input className={INPUT} value={seoTitre} onChange={(e) => setSeoTitre(e.target.value)} />
        </Champ>
        <Champ label="SEO — description par défaut">
          <input className={INPUT} value={seoDesc} onChange={(e) => setSeoDesc(e.target.value)} />
        </Champ>
      </div>

      {message && <p className="text-sm">{message}</p>}

      <button
        type="submit"
        disabled={enCours}
        className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {enCours ? "Enregistrement…" : "Enregistrer"}
      </button>
    </form>
  );
}

function Champ({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm font-medium">
      <span className="mb-1 block">{label}</span>
      {children}
    </label>
  );
}
