"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import {
  VILLE_REFERENCE,
  geoDesCommunes,
  type CommuneGeo,
} from "@/lib/communes-geo";

// Leaflet manipule `window` : la carte est chargée uniquement côté client.
const ZoneCarteMap = dynamic(() => import("./zone-carte-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-cream text-sm text-warm">
      Chargement de la carte…
    </div>
  ),
});

export interface ZoneCarteProps {
  /** Noms des communes couvertes (depuis la config métier). */
  communes: string[];
  /** Rayon d'intervention en km (cercle tracé sur la carte). */
  rayonKm: number;
}

export function ZoneCarte({ communes, rayonKm }: ZoneCarteProps) {
  const geo = useMemo(() => geoDesCommunes(communes), [communes]);

  // Sélection par défaut : la ville de référence (Laval) si disponible.
  const defaut =
    geo.find((c) => c.nom === VILLE_REFERENCE) ?? geo[0] ?? null;
  const [selection, setSelection] = useState<CommuneGeo | null>(defaut);

  // Pas de coordonnées exploitables : on n'affiche pas la carte.
  if (!selection) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      {/* Sélecteur de communes */}
      <div className="flex flex-col gap-2">
        <span className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
          Choisissez votre commune
        </span>
        <ul className="flex flex-wrap gap-2 lg:flex-col">
          {geo.map((commune) => {
            const active = commune.nom === selection.nom;
            return (
              <li key={commune.nom}>
                <button
                  type="button"
                  onClick={() => setSelection(commune)}
                  aria-pressed={active}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors lg:w-full lg:text-left ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-cream hover:border-primary hover:text-primary"
                  }`}
                >
                  {commune.nom}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Carte */}
      <div className="h-[360px] overflow-hidden rounded-2xl border border-border shadow-sm sm:h-[420px]">
        <ZoneCarteMap
          communes={geo}
          selection={selection}
          rayonKm={rayonKm}
          onSelect={setSelection}
        />
      </div>
    </div>
  );
}
