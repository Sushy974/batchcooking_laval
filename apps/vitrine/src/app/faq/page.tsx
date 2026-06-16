import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPage } from "@/lib/queries";

export const dynamic = "force-dynamic";

const SLUG = "faq";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage(SLUG);
  if (!page) return { title: "FAQ" };
  return { title: page.seo.titre, description: page.seo.description };
}

export default async function FaqPage() {
  const page = await getPage(SLUG);
  if (!page || page.type_page !== "faq") notFound();

  const { intro, questions } = page.data_contenu;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{page.titre}</h1>
        {intro && <p className="mt-3 text-muted">{intro}</p>}
      </header>

      <div className="space-y-3">
        {questions.map((q, i) => (
          <details
            key={i}
            className="group rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
          >
            <summary className="cursor-pointer list-none font-medium marker:content-none">
              <span className="flex items-center justify-between gap-4">
                {q.question}
                <span className="text-brand transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm text-muted">{q.reponse}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
