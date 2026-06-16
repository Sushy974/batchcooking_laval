import Link from "next/link";
import Image from "next/image";
import { LABELS_REGIME, type Plat } from "@batchcooking/core";

export function PlatCard({ plat }: { plat: Plat }) {
  return (
    <Link
      href={`/plats/${plat.slug}`}
      className="group overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] bg-secondary">
        {plat.image_principale ? (
          <Image
            src={plat.image_principale}
            alt={plat.nom}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl">
            🍽️
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold">{plat.nom}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-warm">
          {plat.description_courte}
        </p>

        {plat.regimes.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {plat.regimes.map((r) => (
              <li
                key={r}
                className="rounded-full bg-secondary px-2 py-0.5 text-xs text-warm"
              >
                {LABELS_REGIME[r]}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}
