import Link from "next/link";
import {
  Check,
  ChefHat,
  ShoppingBasket,
  Sparkles,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { Formule } from "@batchcooking/core";

const COURSES_LABEL: Record<Formule["courses"], string> = {
  incluses: "Courses incluses",
  non_incluses: "Vous faites les courses",
  en_option: "Courses en option",
};

/**
 * Palette d'accents par carte (cycle). On reste dans le thème chaud de la marque :
 * orange primaire, brun foncé, ambre. Les couleurs sont passées en `style` inline
 * pour ne pas dépendre du purge Tailwind sur des valeurs dynamiques.
 */
const ACCENTS = ["#e65f2b", "#2c1a11", "#c98a2b"] as const;
const ICONES: LucideIcon[] = [ChefHat, UtensilsCrossed, Sparkles, ShoppingBasket];

export function FormuleCard({
  formule,
  index = 0,
}: {
  formule: Formule;
  index?: number;
}) {
  const accent = ACCENTS[index % ACCENTS.length];
  const Icone = ICONES[index % ICONES.length];
  const populaire = formule.mis_en_avant;

  // Liste de prestations : on plafonne pour garder des cartes équilibrées.
  const prestations = formule.inclus.slice(0, 4);

  return (
    <Link
      href={`/formules/${formule.slug}`}
      aria-label={`Découvrir la formule ${formule.nom}`}
      className={`group relative block h-full transition duration-300 hover:-translate-y-1.5 ${
        populaire ? "lg:-translate-y-3 lg:hover:-translate-y-4" : ""
      }`}
    >
      {/* Coque colorée : laisse apparaître un liseré (épais à gauche) facon plan d'abonnement. */}
      <div
        className="relative h-full overflow-hidden rounded-[28px] shadow-sm transition-shadow duration-300 group-hover:shadow-lg"
        style={{ backgroundColor: accent }}
      >
        {populaire && (
          <span className="absolute right-4 top-4 z-10 rounded-full bg-background/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-foreground shadow-sm">
            ★ Populaire
          </span>
        )}

        {/* Carte blanche, décalée à gauche pour épaissir le rail coloré. */}
        <div className="m-1 ml-3 flex h-[calc(100%-0.5rem)] flex-col rounded-[22px] bg-background p-6 sm:p-7">
          {/* Prix */}
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-1">
              <span
                className="text-4xl font-extrabold tracking-tight sm:text-5xl"
                style={{ color: accent }}
              >
                {formule.prix}
              </span>
              <span className="text-2xl font-bold" style={{ color: accent }}>
                €
              </span>
            </div>
            <p className="mt-1 text-xs font-medium text-warm">
              {formule.nombre_repas} repas · {formule.nombre_personnes} pers. ·{" "}
              {formule.duree_heures} h
            </p>
          </div>

          {/* Liste des prestations, séparateurs pointillés */}
          <ul className="mt-6 flex flex-col gap-3 text-sm text-warm">
            {prestations.map((item, i) => (
              <li
                key={item}
                className={`flex items-start gap-2.5 ${
                  i < prestations.length - 1
                    ? "border-b border-dashed border-border pb-3"
                    : ""
                }`}
              >
                <Check
                  className="mt-0.5 size-4 shrink-0"
                  style={{ color: accent }}
                  aria-hidden
                />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>

          {/* Mention courses */}
          <span
            className="mt-5 inline-flex w-fit self-center rounded-full px-3 py-1 text-xs font-medium"
            style={{ backgroundColor: `${accent}1a`, color: accent }}
          >
            {COURSES_LABEL[formule.courses]}
          </span>

          {/* Pastille icône */}
          <div className="mt-6 flex justify-center">
            <span
              className="flex size-14 items-center justify-center rounded-full text-white shadow-sm transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: accent }}
            >
              <Icone className="size-6" aria-hidden />
            </span>
          </div>

          {/* Onglet nom de la formule */}
          <div className="mt-6 flex justify-center">
            <span
              className="rounded-xl border-2 bg-background px-5 py-2 text-sm font-bold"
              style={{ borderColor: accent, color: accent }}
            >
              {formule.nom}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
