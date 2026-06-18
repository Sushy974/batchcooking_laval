import { cache } from "react";
import { useCases } from "@batchcooking/core";

/**
 * Lectures de l'admin : passent par les use cases (UI → UseCase → Repository).
 * Contrairement à la vitrine, l'admin affiche TOUT (y compris les éléments non
 * disponibles / non publiés). Lecture seule pour l'instant — les écritures
 * (CRUD) viendront enrichir les repositories et les use cases.
 */
export const getConfig = cache(() => useCases.getConfig.execute());

export const getAllPlats = cache(() => useCases.getPlats.execute());

export const getPlatById = cache((id: string) =>
  useCases.getPlatById.execute(id),
);

export const getAllFormules = cache(() => useCases.getFormules.execute());

export const getAllPages = cache(() => useCases.getPages.execute());
