import type { PrestationPrix } from "@batchcooking/core";

export function formatPrestation(p: PrestationPrix): string {
  if (p.type === "fixe") return p.fixe != null ? `${p.fixe} €` : "—";
  if (p.min != null && p.max != null) return `${p.min} – ${p.max} €`;
  if (p.min != null) return `dès ${p.min} €`;
  return "—";
}

export function oui(value: boolean): string {
  return value ? "Oui" : "—";
}
