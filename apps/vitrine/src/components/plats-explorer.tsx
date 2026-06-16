"use client";

import { useMemo, useState } from "react";
import {
  LABELS_ALLERGENE,
  LABELS_CATEGORIE,
  LABELS_REGIME,
  type Allergene,
  type Categorie,
  type Plat,
  type Regime,
} from "@batchcooking/core";

import { PlatCard } from "./plat-card";

type Facets = {
  categories: Categorie[];
  regimes: Regime[];
  allergenes: Allergene[];
};

export function PlatsExplorer({
  plats,
  facets,
}: {
  plats: Plat[];
  facets: Facets;
}) {
  const [categorie, setCategorie] = useState<Categorie | "all">("all");
  const [regimes, setRegimes] = useState<Regime[]>([]);
  const [exclusAllergenes, setExclusAllergenes] = useState<Allergene[]>([]);

  const toggle = <T,>(value: T, list: T[], set: (v: T[]) => void) =>
    set(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);

  const filtres = useMemo(
    () =>
      plats.filter(
        (p) =>
          (categorie === "all" || p.categorie === categorie) &&
          regimes.every((r) => p.regimes.includes(r)) &&
          !p.allergenes.some((a) => exclusAllergenes.includes(a)),
      ),
    [plats, categorie, regimes, exclusAllergenes],
  );

  const aDesFiltres =
    categorie !== "all" || regimes.length > 0 || exclusAllergenes.length > 0;

  const reset = () => {
    setCategorie("all");
    setRegimes([]);
    setExclusAllergenes([]);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      {/* Filtres */}
      <aside className="space-y-6">
        <FilterGroup label="Catégorie">
          <Pill active={categorie === "all"} onClick={() => setCategorie("all")}>
            Tout
          </Pill>
          {facets.categories.map((c) => (
            <Pill
              key={c}
              active={categorie === c}
              onClick={() => setCategorie(c)}
            >
              {LABELS_CATEGORIE[c]}
            </Pill>
          ))}
        </FilterGroup>

        {facets.regimes.length > 0 && (
          <FilterGroup label="Régime">
            {facets.regimes.map((r) => (
              <Pill
                key={r}
                active={regimes.includes(r)}
                onClick={() => toggle(r, regimes, setRegimes)}
              >
                {LABELS_REGIME[r]}
              </Pill>
            ))}
          </FilterGroup>
        )}

        {facets.allergenes.length > 0 && (
          <FilterGroup label="Sans allergène">
            {facets.allergenes.map((a) => (
              <Pill
                key={a}
                active={exclusAllergenes.includes(a)}
                onClick={() => toggle(a, exclusAllergenes, setExclusAllergenes)}
              >
                {LABELS_ALLERGENE[a]}
              </Pill>
            ))}
          </FilterGroup>
        )}

        {aDesFiltres && (
          <button
            onClick={reset}
            className="text-sm text-primary hover:underline"
          >
            Réinitialiser les filtres
          </button>
        )}
      </aside>

      {/* Résultats */}
      <div>
        <p className="mb-4 text-sm text-warm">
          {filtres.length} plat{filtres.length > 1 ? "s" : ""}
        </p>

        {filtres.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtres.map((p) => (
              <PlatCard key={p.id} plat={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-warm">
            <p>Aucun plat ne correspond à ces filtres.</p>
            <button
              onClick={reset}
              className="mt-3 text-sm font-medium text-primary hover:underline"
            >
              Réinitialiser
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">{label}</h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-3 py-1 text-sm transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "border border-border bg-background text-foreground/80 hover:border-primary/40"
      }`}
    >
      {children}
    </button>
  );
}
