"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUseCases } from "@batchcooking/core/client";

export function DeletePlatButton({ id, nom }: { id: string; nom: string }) {
  const useCases = useUseCases();
  const router = useRouter();
  const [enCours, setEnCours] = useState(false);

  const supprimer = async () => {
    if (!window.confirm(`Supprimer le plat « ${nom} » ?`)) return;
    setEnCours(true);
    try {
      await useCases.supprimerPlat.execute(id);
      router.refresh();
    } catch (e) {
      console.error(e);
      window.alert("Échec de la suppression.");
      setEnCours(false);
    }
  };

  return (
    <button
      type="button"
      onClick={supprimer}
      disabled={enCours}
      className="text-xs text-red-600 hover:underline disabled:opacity-50"
    >
      Supprimer
    </button>
  );
}
