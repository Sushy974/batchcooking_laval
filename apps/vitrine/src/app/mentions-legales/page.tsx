import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPage } from "@/lib/queries";

export const dynamic = "force-dynamic";

const SLUG = "mentions-legales";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage(SLUG);
  if (!page) return { title: "Mentions légales" };
  return { title: page.seo.titre, description: page.seo.description };
}

export default async function MentionsLegalesPage() {
  const page = await getPage(SLUG);
  if (!page || page.type_page !== "mentions_legales") notFound();

  const { blocs } = page.data_contenu;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">{page.titre}</h1>

      <div className="mt-8 space-y-8">
        {blocs.map((bloc, i) => (
          <section key={i}>
            <h2 className="text-lg font-semibold">{bloc.titre}</h2>
            <p className="mt-2 whitespace-pre-line text-foreground/80">
              {bloc.texte}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
