import Link from "next/link";
import { Clock, Users, UtensilsCrossed } from "lucide-react";
import type { Formule } from "@batchcooking/core";

const COURSES_LABEL: Record<Formule["courses"], string> = {
  incluses: "Courses incluses",
  non_incluses: "Vous faites les courses",
  en_option: "Courses en option",
};

export function FormuleCard({ formule }: { formule: Formule }) {
  return (
    <Link
      href={`/formules/${formule.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-background p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold">{formule.nom}</h3>
        <span className="shrink-0 text-lg font-bold text-primary">
          {formule.prix} €
        </span>
      </div>

      <p className="mt-2 text-sm text-warm">{formule.description}</p>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-warm">
        <li className="flex items-center gap-1">
          <UtensilsCrossed className="size-3.5" aria-hidden />
          {formule.nombre_repas} repas
        </li>
        <li className="flex items-center gap-1">
          <Users className="size-3.5" aria-hidden />
          {formule.nombre_personnes} pers.
        </li>
        <li className="flex items-center gap-1">
          <Clock className="size-3.5" aria-hidden />
          {formule.duree_heures} h
        </li>
      </ul>

      <span className="mt-4 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
        {COURSES_LABEL[formule.courses]}
      </span>
    </Link>
  );
}
