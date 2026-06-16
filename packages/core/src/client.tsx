"use client";

import { createContext, useContext, type ReactNode } from "react";

import { useCases as defaultUseCases, type UseCases } from "./container";

/**
 * Injection de dépendances côté CLIENT (Client Components).
 *
 * Équivalent Flutter : `Provider` / `InheritedWidget` + `context.read<T>()`.
 *  - `UseCasesProvider` = le `Provider` qu'on place haut dans l'arbre.
 *  - `useUseCases()`    = l'équivalent de `context.read<UseCases>()`.
 *
 * Par défaut, le contexte fournit le singleton câblé selon l'environnement.
 * On peut injecter une autre instance (ex. tout en "mock" pour un test, ou un
 * Storybook) via la prop `value` — exactement comme on override un Provider.
 *
 * ⚠️ Côté SERVEUR (vitrine SSR/ISR), pas besoin de ce contexte : on importe
 * directement `useCases` depuis "@batchcooking/core".
 */
const UseCasesContext = createContext<UseCases>(defaultUseCases);

export function UseCasesProvider({
  value = defaultUseCases,
  children,
}: {
  value?: UseCases;
  children: ReactNode;
}) {
  return (
    <UseCasesContext.Provider value={value}>{children}</UseCasesContext.Provider>
  );
}

export function useUseCases(): UseCases {
  return useContext(UseCasesContext);
}
