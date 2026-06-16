import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Icon } from "@/components/icon";
import { getPage } from "@/lib/queries";

export const dynamic = "force-dynamic";

const SLUG = "comment-ca-marche";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage(SLUG);
  if (!page) return { title: "Comment ça marche" };
  return { title: page.seo.titre, description: page.seo.description };
}

export default async function CommentCaMarchePage() {
  const page = await getPage(SLUG);
  if (!page || page.type_page !== "comment_ca_marche") notFound();

  const { intro, etapes } = page.data_contenu;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{page.titre}</h1>
        {intro && <p className="mt-3 text-muted">{intro}</p>}
      </header>

      <ol className="space-y-6">
        {etapes.map((etape, i) => (
          <li
            key={i}
            className="flex gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
              {etape.icone ? (
                <Icon name={etape.icone} className="size-6" />
              ) : (
                <span className="font-bold">{etape.numero ?? i + 1}</span>
              )}
            </div>
            <div>
              <h2 className="font-semibold">
                {etape.numero != null && (
                  <span className="text-muted">{etape.numero}. </span>
                )}
                {etape.titre}
              </h2>
              <p className="mt-1 text-sm text-muted">{etape.texte}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
