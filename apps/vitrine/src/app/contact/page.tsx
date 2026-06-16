import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AtSign, Mail, MapPin, Phone } from "lucide-react";

import { getConfig, getPage } from "@/lib/queries";

export const dynamic = "force-dynamic";

const SLUG = "contact";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage(SLUG);
  if (!page) return { title: "Contact" };
  return { title: page.seo.titre, description: page.seo.description };
}

export default async function ContactPage() {
  const [page, config] = await Promise.all([getPage(SLUG), getConfig()]);
  if (!page || page.type_page !== "contact") notFound();

  const { intro, afficher_telephone, afficher_email, afficher_instagram } =
    page.data_contenu;
  const instagram = config?.reseaux_sociaux?.instagram?.replace(/^@/, "");

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{page.titre}</h1>
        {intro && <p className="mt-3 text-warm">{intro}</p>}
      </header>

      <div className="space-y-3">
        {afficher_telephone && config?.telephone && (
          <a
            href={`tel:${config.telephone.replace(/\s/g, "")}`}
            className="flex items-center gap-3 rounded-2xl border border-border bg-background p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <Phone className="size-5 text-primary" aria-hidden />
            <span>
              <span className="block text-xs text-warm">Téléphone</span>
              <span className="font-medium">{config.telephone}</span>
            </span>
          </a>
        )}

        {afficher_email && config?.email && (
          <a
            href={`mailto:${config.email}`}
            className="flex items-center gap-3 rounded-2xl border border-border bg-background p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <Mail className="size-5 text-primary" aria-hidden />
            <span>
              <span className="block text-xs text-warm">Email</span>
              <span className="font-medium">{config.email}</span>
            </span>
          </a>
        )}

        {afficher_instagram && instagram && (
          <a
            href={`https://instagram.com/${instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-border bg-background p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <AtSign className="size-5 text-primary" aria-hidden />
            <span>
              <span className="block text-xs text-warm">Instagram</span>
              <span className="font-medium">@{instagram}</span>
            </span>
          </a>
        )}

        {config?.zone_intervention && (
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-background p-5 shadow-sm">
            <MapPin className="size-5 text-primary" aria-hidden />
            <span>
              <span className="block text-xs text-warm">Zone d&apos;intervention</span>
              <span className="font-medium">{config.zone_intervention}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
