import { AtSign, Mail, MapPin, Phone } from "lucide-react";
import type { ConfigGenerale } from "@batchcooking/core";

export function SiteFooter({ config }: { config: ConfigGenerale | null }) {
  if (!config) return null;

  const instagram = config.reseaux_sociaux?.instagram?.replace(/^@/, "");

  return (
    <footer className="bg-dark text-dark-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3 sm:px-12">
        <div>
          <p className="font-headings text-base font-bold">
            {config.nom_societe}
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-cream">
            <MapPin className="size-4 shrink-0" aria-hidden />
            {config.zone_intervention}
          </p>
        </div>

        <div className="space-y-2 text-sm text-cream">
          <p className="font-semibold text-dark-foreground">Contact</p>
          {config.telephone && (
            <a
              href={`tel:${config.telephone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 hover:text-dark-foreground"
            >
              <Phone className="size-4 shrink-0" aria-hidden />
              {config.telephone}
            </a>
          )}
          {config.email && (
            <a
              href={`mailto:${config.email}`}
              className="flex items-center gap-2 hover:text-dark-foreground"
            >
              <Mail className="size-4 shrink-0" aria-hidden />
              {config.email}
            </a>
          )}
          {instagram && (
            <a
              href={`https://instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-dark-foreground"
            >
              <AtSign className="size-4 shrink-0" aria-hidden />@{instagram}
            </a>
          )}
        </div>

        <div className="text-sm text-cream sm:text-right">
          <p>© {config.nom_societe}</p>
          <p className="mt-1">
            <a
              href="/mentions-legales"
              className="underline-offset-2 hover:text-dark-foreground hover:underline"
            >
              Mentions légales
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
