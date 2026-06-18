"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useUseCases } from "@batchcooking/core/client";
import type { Utilisateur } from "@batchcooking/core";

interface EtatAuth {
  utilisateur: Utilisateur | null;
  pret: boolean;
}

const ContexteAuth = createContext<EtatAuth>({
  utilisateur: null,
  pret: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const useCases = useUseCases();
  const [etat, setEtat] = useState<EtatAuth>({ utilisateur: null, pret: false });

  useEffect(() => {
    return useCases.observerUtilisateur.execute((utilisateur) => {
      setEtat({ utilisateur, pret: true });
    });
  }, [useCases]);

  return <ContexteAuth.Provider value={etat}>{children}</ContexteAuth.Provider>;
}

export function useAuth(): EtatAuth {
  return useContext(ContexteAuth);
}
