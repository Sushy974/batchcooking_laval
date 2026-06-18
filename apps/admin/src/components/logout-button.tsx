"use client";

import { useRouter } from "next/navigation";
import { useUseCases } from "@batchcooking/core/client";

import { useAuth } from "./auth-provider";

export function LogoutButton() {
  const useCases = useUseCases();
  const { utilisateur } = useAuth();
  const router = useRouter();

  const deconnexion = async () => {
    await useCases.deconnexion.execute();
    router.replace("/login");
  };

  if (!utilisateur) return null;

  return (
    <div className="mt-auto border-t border-border p-3 text-xs">
      <p className="truncate text-muted" title={utilisateur.email ?? ""}>
        {utilisateur.email}
      </p>
      <button
        type="button"
        onClick={deconnexion}
        className="mt-1 text-primary hover:underline"
      >
        Déconnexion
      </button>
    </div>
  );
}
