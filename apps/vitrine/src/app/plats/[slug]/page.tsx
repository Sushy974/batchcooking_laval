import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Flame, Microwave } from "lucide-react";
import {
  LABELS_ALLERGENE,
  LABELS_CATEGORIE,
  LABELS_REGIME,
  type Saison,
} from "@batchcooking/core";

import { formatPrestation } from "@/lib/format";
import { getPlatBySlug } from "@/lib/queries";

export const dynamic = "force-dynamic";

const LABELS_SAISON: Record<Saison, string> = {
  printemps: "Printemps",
  ete: "Été",
  automne: "Automne",
  hiver: "Hiver",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const plat = await getPlatBySlug(slug);
  if (!plat) return { title: "Plat introuvable" };
  return {
    title: `${plat.nom} — Le menu`,
    description: plat.description_courte,
  };
}

export default async function PlatPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plat = await getPlatBySlug(slug);

  if (!plat) notFound();

  const prix = formatPrestation(plat.prestation);
  const vn = plat.valeurs_nutritionnelles;

  return (
    <article className="mx-auto max-w-5xl px-4 py-10">
      <Link
        href="/plats"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Retour au menu
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {/* Visuel */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-stone-100">
          {plat.image_principale ? (
            <Image
              src={plat.image_principale}
              alt={plat.nom}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-6xl">
              🍽️
            </div>
          )}
        </div>

        {/* Infos principales */}
        <div>
          <span className="text-sm font-medium text-brand">
            {LABELS_CATEGORIE[plat.categorie]}
          </span>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">{plat.nom}</h1>

          {prix && (
            <p className="mt-2 text-lg">
              <span className="text-muted">Prestation : </span>
              <span className="font-semibold text-brand">{prix}</span>
            </p>
          )}

          <p className="mt-4 text-foreground/80">{plat.description}</p>

          {plat.regimes.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {plat.regimes.map((r) => (
                <li
                  key={r}
                  className="rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand"
                >
                  {LABELS_REGIME[r]}
                </li>
              ))}
            </ul>
          )}

          {/* Conservation / réchauffe */}
          <div className="mt-6 space-y-2 text-sm">
            {plat.conservation_jours != null && (
              <p className="flex items-center gap-2 text-muted">
                <Clock className="size-4 shrink-0" aria-hidden />
                Se conserve {plat.conservation_jours} jours au réfrigérateur
              </p>
            )}
            {plat.mode_rechauffe && (
              <p className="flex items-center gap-2 text-muted">
                <Microwave className="size-4 shrink-0" aria-hidden />
                {plat.mode_rechauffe}
              </p>
            )}
          </div>

          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
          >
            Composer mon menu avec ce plat
          </Link>
        </div>
      </div>

      {/* Détails */}
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {plat.ingredients.length > 0 && (
          <DetailCard title="Ingrédients">
            <ul className="list-inside list-disc space-y-1 text-sm text-foreground/80">
              {plat.ingredients.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </DetailCard>
        )}

        {plat.allergenes.length > 0 && (
          <DetailCard title="Allergènes">
            <ul className="flex flex-wrap gap-2">
              {plat.allergenes.map((a) => (
                <li
                  key={a}
                  className="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-800"
                >
                  {LABELS_ALLERGENE[a]}
                </li>
              ))}
            </ul>
          </DetailCard>
        )}

        {vn && (
          <DetailCard title="Valeurs nutritionnelles">
            <dl className="space-y-1 text-sm">
              {vn.calories != null && (
                <Row icon label="Calories" value={`${vn.calories} kcal`} />
              )}
              {vn.proteines != null && (
                <Row label="Protéines" value={`${vn.proteines} g`} />
              )}
              {vn.glucides != null && (
                <Row label="Glucides" value={`${vn.glucides} g`} />
              )}
              {vn.lipides != null && (
                <Row label="Lipides" value={`${vn.lipides} g`} />
              )}
            </dl>
          </DetailCard>
        )}

        {plat.saison && plat.saison.length > 0 && (
          <DetailCard title="Saison">
            <ul className="flex flex-wrap gap-2">
              {plat.saison.map((s) => (
                <li
                  key={s}
                  className="rounded-full bg-stone-100 px-3 py-1 text-sm text-muted"
                >
                  {LABELS_SAISON[s]}
                </li>
              ))}
            </ul>
          </DetailCard>
        )}
      </div>
    </article>
  );
}

function DetailCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      <h2 className="mb-3 font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Row({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-black/5 py-1 last:border-0">
      <dt className="flex items-center gap-1.5 text-muted">
        {icon && <Flame className="size-3.5" aria-hidden />}
        {label}
      </dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
