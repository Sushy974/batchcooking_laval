"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { useAuth } from "./auth-provider";

/** Garde d'authentification : redirige vers /login si non connecté. */
export function Protege({ children }: { children: ReactNode }) {
  const { utilisateur, pret } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (pret && !utilisateur) router.replace("/login");
  }, [pret, utilisateur, router]);

  if (!pret) {
    return <div className="p-8 text-sm text-muted">Chargement…</div>;
  }
  if (!utilisateur) return null;

  return <>{children}</>;
}
