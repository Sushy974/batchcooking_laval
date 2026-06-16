import Link from "next/link";

import { FormuleCard } from "@/components/formule-card";
import { Icon } from "@/components/icon";
import { PlatCard } from "@/components/plat-card";
import {
  getAccueil,
  getConfig,
  getFormulesDisponibles,
  getPlatsMisEnAvant,
} from "@/lib/queries";

// Vitrine : rendu serveur (SSR). On passera en ISR (revalidate) plus tard.
export const dynamic = "force-dynamic";

// UI → UseCase → Repository : la page ne connaît que les use cases (via queries),
// ni Firestore ni les repositories.
export default async function Home() {
  const [page, config, formules, plats] = await Promise.all([
    getAccueil(),
    getConfig(),
    getFormulesDisponibles(),
    getPlatsMisEnAvant(),
  ]);

  const contenu = page?.type_page === "accueil" ? page.data_contenu : null;
  const hero = contenu?.hero;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand/10 to-transparent">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            {hero?.titre ?? "Vos repas de la semaine, cuisinés chez vous"}
          </h1>
          {hero?.sous_titre && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              {hero.sous_titre}
            </p>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={hero?.cta_lien ?? "/formules"}
              className="rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
            >
              {hero?.cta_label ?? "Découvrir les formules"}
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-brand/30 px-6 py-3 text-sm font-medium text-brand transition-colors hover:bg-brand/5"
            >
              Me contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Arguments */}
      {contenu?.arguments && contenu.arguments.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-6 sm:grid-cols-3">
            {contenu.arguments.map((arg, i) => (
              <div
                key={i}
                className="rounded-2xl border border-black/5 bg-white p-6 text-center shadow-sm"
              >
                <Icon
                  name={arg.icone}
                  className="mx-auto size-8 text-brand"
                />
                <h3 className="mt-3 font-semibold">{arg.titre}</h3>
                <p className="mt-1 text-sm text-muted">{arg.texte}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Formules */}
      {contenu?.section_formules?.afficher && formules.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <SectionTitle
            title={contenu.section_formules.titre}
            href="/formules"
            linkLabel="Toutes les formules"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {formules.map((f) => (
              <FormuleCard key={f.id} formule={f} />
            ))}
          </div>
        </section>
      )}

      {/* Plats mis en avant */}
      {contenu?.section_plats?.afficher && plats.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <SectionTitle
            title={contenu.section_plats.titre}
            href="/plats"
            linkLabel="Voir le menu"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {plats.map((p) => (
              <PlatCard key={p.id} plat={p} />
            ))}
          </div>
        </section>
      )}

      {/* Zone d'intervention */}
      {contenu?.section_zone && (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="rounded-3xl bg-brand/5 p-8 text-center">
            <h2 className="text-2xl font-bold">{contenu.section_zone.titre}</h2>
            <p className="mt-2 text-muted">{contenu.section_zone.texte}</p>
            {config?.communes_couvertes?.length ? (
              <ul className="mt-4 flex flex-wrap justify-center gap-2">
                {config.communes_couvertes.map((c) => (
                  <li
                    key={c}
                    className="rounded-full bg-white px-3 py-1 text-sm shadow-sm"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      )}

      {/* CTA final */}
      {contenu?.cta_final && (
        <section className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold">{contenu.cta_final.titre}</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted">
            {contenu.cta_final.texte}
          </p>
          <Link
            href={contenu.cta_final.lien}
            className="mt-6 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
          >
            {contenu.cta_final.label}
          </Link>
        </section>
      )}
    </>
  );
}

function SectionTitle({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="mb-6 flex items-baseline justify-between">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Link href={href} className="text-sm text-brand hover:underline">
        {linkLabel} →
      </Link>
    </div>
  );
}
