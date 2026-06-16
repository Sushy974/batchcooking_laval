import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Clock, Info, Users, UtensilsCrossed, X } from "lucide-react";
import type { Formule } from "@batchcooking/core";

import { getFormuleBySlug } from "@/lib/queries";

export const dynamic = "force-dynamic";

const COURSES_LABEL: Record<Formule["courses"], string> = {
  incluses: "Courses incluses",
  non_incluses: "Vous faites les courses",
  en_option: "Courses en option",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const formule = await getFormuleBySlug(slug);
  if (!formule) return { title: "Formule introuvable" };
  return {
    title: `${formule.nom} — Les formules`,
    description: formule.description,
  };
}

export default async function FormulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const formule = await getFormuleBySlug(slug);

  if (!formule) notFound();

  return (
    <article className="mx-auto max-w-5xl px-4 py-10">
      <Link
        href="/formules"
        className="inline-flex items-center gap-1 text-sm text-warm hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Toutes les formules
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {/* Visuel */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-secondary">
          {formule.image_principale ? (
            <Image
              src={formule.image_principale}
              alt={formule.nom}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-6xl">
              🧑‍🍳
            </div>
          )}
        </div>

        {/* Infos principales */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{formule.nom}</h1>
          <p className="mt-2 text-2xl font-bold text-primary">{formule.prix} €</p>
          <p className="mt-4 text-foreground/80">{formule.description}</p>

          <ul className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
            <Fact icon={<UtensilsCrossed className="size-5" />} value={`${formule.nombre_repas}`} label="repas" />
            <Fact icon={<Users className="size-5" />} value={`${formule.nombre_personnes}`} label="personnes" />
            <Fact icon={<Clock className="size-5" />} value={`${formule.duree_heures} h`} label="sur place" />
          </ul>

          <span className="mt-6 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {COURSES_LABEL[formule.courses]}
          </span>

          {formule.mention_courses && (
            <p className="mt-3 flex gap-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
              <Info className="size-4 shrink-0" aria-hidden />
              {formule.mention_courses}
            </p>
          )}

          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Réserver cette formule
          </Link>
        </div>
      </div>

      {/* Inclus / non inclus */}
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {formule.inclus.length > 0 && (
          <section className="rounded-2xl border border-border bg-background p-6 shadow-sm">
            <h2 className="mb-3 font-semibold">Ce qui est inclus</h2>
            <ul className="space-y-2 text-sm">
              {formule.inclus.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {formule.non_inclus.length > 0 && (
          <section className="rounded-2xl border border-border bg-background p-6 shadow-sm">
            <h2 className="mb-3 font-semibold">Non inclus</h2>
            <ul className="space-y-2 text-sm text-warm">
              {formule.non_inclus.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <X className="mt-0.5 size-4 shrink-0 text-warm" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}

function Fact({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <li className="rounded-2xl border border-border bg-background p-3 shadow-sm">
      <span className="mx-auto flex justify-center text-primary">{icon}</span>
      <span className="mt-1 block font-bold">{value}</span>
      <span className="block text-xs text-warm">{label}</span>
    </li>
  );
}
