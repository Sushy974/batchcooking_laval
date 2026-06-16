import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getPage } from "@/lib/queries";

export const dynamic = "force-dynamic";

const SLUG = "a-propos";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage(SLUG);
  if (!page) return { title: "À propos" };
  return { title: page.seo.titre, description: page.seo.description };
}

export default async function AProposPage() {
  const page = await getPage(SLUG);
  if (!page || page.type_page !== "a_propos") notFound();

  const { portrait, intro, sections, citation } = page.data_contenu;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-10 flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        {portrait && (
          <div className="relative size-32 shrink-0 overflow-hidden rounded-full bg-stone-100">
            <Image
              src={portrait}
              alt={page.titre}
              fill
              sizes="128px"
              className="object-cover"
              priority
            />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{page.titre}</h1>
          {intro && <p className="mt-3 text-lg text-muted">{intro}</p>}
        </div>
      </header>

      <div className="space-y-8">
        {sections.map((section, i) => (
          <section key={i}>
            <h2 className="text-xl font-semibold">{section.titre}</h2>
            <p className="mt-2 whitespace-pre-line text-foreground/80">
              {section.texte}
            </p>
          </section>
        ))}
      </div>

      {citation && (
        <blockquote className="mt-12 border-l-4 border-brand pl-4 text-xl font-medium italic text-foreground/80">
          « {citation} »
        </blockquote>
      )}
    </div>
  );
}
