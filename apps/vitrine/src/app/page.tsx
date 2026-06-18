import Link from "next/link";
import Image from "next/image";

import { FormuleCard } from "@/components/formule-card";
import { Icon } from "@/components/icon";
import { PlatCard } from "@/components/plat-card";
import { Reveal } from "@/components/reveal";
import { ZoneCarte } from "@/components/zone-carte";
import {
  getAccueil,
  getConfig,
  getFormulesDisponibles,
  getPlatsMisEnAvant,
} from "@/lib/queries";

// Vitrine : rendu serveur (SSR). On passera en ISR (revalidate) plus tard.
export const dynamic = "force-dynamic";

// UI → UseCase → Repository : la page ne connaît que les use cases (via queries).
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
      {/* Hero — animations en transform uniquement (opacité = 1) pour préserver le LCP. */}
      <section className="grid items-stretch gap-8 lg:grid-cols-2">
        <div className="animate-hero-in flex flex-col justify-center gap-6 px-6 py-16 sm:px-12 lg:py-20">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Batch cooking à domicile
            </span>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              {hero?.titre ?? "Cuisinons ensemble, profitez toute la semaine"}
            </h1>
          </div>
          {hero?.sous_titre && (
            <p className="max-w-md text-lg leading-relaxed text-warm">
              {hero.sous_titre}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={hero?.cta_lien ?? "/formules"}
              className="rounded-lg bg-primary px-7 py-3 text-base font-semibold text-primary-foreground transition duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg active:scale-95"
            >
              {hero?.cta_label ?? "Voir les formules"}
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-primary bg-transparent px-7 py-3 text-base font-semibold text-primary transition duration-200 hover:-translate-y-0.5 hover:bg-primary/5 active:scale-95"
            >
              Me contacter
            </Link>
          </div>
        </div>

        <div className="relative min-h-64 overflow-hidden bg-secondary lg:min-h-0">
          {/* Image fixe du hero : apps/vitrine/public/hero.webp (compressée).
              Repli automatique sur l'image définie en base si elle existe un jour. */}
          <Image
            src={hero?.image || "/hero.webp"}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="animate-zoom-in object-cover"
            priority
          />
          {/* Dégradé : fond l'image dans le bloc texte (bord gauche). */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, var(--color-background) 0%, transparent 20%)",
            }}
          />
          {/* Badge flottant décoratif. */}
          <span
            aria-hidden
            className="animate-float absolute bottom-6 right-6 rounded-full bg-background/90 px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur"
          >
            🥕 100% fait maison
          </span>
        </div>
      </section>

      {/* Arguments */}
      {contenu?.arguments && contenu.arguments.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-14 sm:px-12">
          <div className="grid gap-6 sm:grid-cols-3">
            {contenu.arguments.map((arg, i) => (
              <Reveal key={i} delayMs={i * 120}>
                <div className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-background p-6 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon name={arg.icone} className="size-5" />
                  </span>
                  <h3 className="text-base font-semibold">{arg.titre}</h3>
                  <p className="text-sm leading-relaxed text-warm">
                    {arg.texte}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Formules */}
      {contenu?.section_formules?.afficher && formules.length > 0 && (
        <section className="bg-secondary py-14">
          <div className="mx-auto max-w-6xl px-6 sm:px-12">
            <SectionTitle
              title={contenu.section_formules.titre}
              href="/formules"
              linkLabel="Toutes les formules"
            />
            <Reveal>
              <div className="-mx-1 flex gap-6 overflow-x-auto px-1 pb-4 pt-8">
                {formules.map((f, i) => (
                  <div key={f.id} className="w-72 shrink-0">
                    <FormuleCard formule={f} index={i} />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Plats mis en avant */}
      {contenu?.section_plats?.afficher && plats.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-14 sm:px-12">
          <SectionTitle
            title={contenu.section_plats.titre}
            href="/plats"
            linkLabel="Voir le menu complet"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plats.map((p, i) => (
              <Reveal key={p.id} delayMs={i * 80}>
                <PlatCard plat={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Zone d'intervention */}
      {contenu?.section_zone && (
        <section className="bg-secondary py-14">
          <div className="mx-auto max-w-6xl px-6 sm:px-12">
            <Reveal>
              <h2 className="mb-3 text-3xl font-bold">
                {contenu.section_zone.titre}
              </h2>
              <p className="mb-8 max-w-2xl leading-relaxed text-warm">
                {contenu.section_zone.texte}
              </p>
              {config?.communes_couvertes?.length ? (
                <ZoneCarte
                  communes={config.communes_couvertes}
                  rayonKm={config.rayon_km}
                />
              ) : null}
            </Reveal>
          </div>
        </section>
      )}

      {/* CTA final */}
      {contenu?.cta_final && (
        <section className="bg-dark px-6 py-20 text-center">
          <Reveal className="mx-auto flex max-w-xl flex-col items-center gap-5">
            <h2 className="text-4xl font-bold leading-tight text-dark-foreground">
              {contenu.cta_final.titre}
            </h2>
            <p className="max-w-md leading-relaxed text-cream">
              {contenu.cta_final.texte}
            </p>
            <Link
              href={contenu.cta_final.lien}
              className="rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg active:scale-95"
            >
              {contenu.cta_final.label}
            </Link>
          </Reveal>
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
    <div className="mb-8 flex items-center justify-between gap-4">
      <h2 className="text-3xl font-bold">{title}</h2>
      <Link
        href={href}
        className="group shrink-0 text-sm font-semibold text-primary"
      >
        {linkLabel}{" "}
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  );
}
