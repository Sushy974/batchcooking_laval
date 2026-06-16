import { AtSign, Mail, MapPin, Phone } from "lucide-react";
import type { ConfigGenerale } from "@batchcooking/core";

export function SiteFooter({ config }: { config: ConfigGenerale | null }) {
  if (!config) return null;

  const instagram = config.reseaux_sociaux?.instagram?.replace(/^@/, "");

  return (
    <footer className="mt-16 border-t border-black/5 bg-white/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="text-base font-semibold">{config.nom_societe}</p>
          <p className="mt-2 flex items-center gap-2 text-sm text-muted">
            <MapPin className="size-4" aria-hidden />
            {config.zone_intervention}
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-medium">Contact</p>
          {config.telephone && (
            <a
              href={`tel:${config.telephone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-muted hover:text-foreground"
            >
              <Phone className="size-4" aria-hidden />
              {config.telephone}
            </a>
          )}
          {config.email && (
            <a
              href={`mailto:${config.email}`}
              className="flex items-center gap-2 text-muted hover:text-foreground"
            >
              <Mail className="size-4" aria-hidden />
              {config.email}
            </a>
          )}
          {instagram && (
            <a
              href={`https://instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted hover:text-foreground"
            >
              <AtSign className="size-4" aria-hidden />@{instagram}
            </a>
          )}
        </div>

        <div className="text-sm text-muted sm:text-right">
          <p>
            © {config.nom_societe}
          </p>
          <p className="mt-1">
            <a href="/mentions-legales" className="hover:text-foreground">
              Mentions légales
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
