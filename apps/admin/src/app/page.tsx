"use client";

import { useEffect, useState } from "react";
import { useUseCases } from "@batchcooking/core/client";
import type { ConfigGenerale } from "@batchcooking/core";

// Admin : Client Component. On récupère les use cases via le contexte
// (équivalent Flutter : context.read<UseCases>()).
export default function AdminHome() {
  const useCases = useUseCases();
  const [config, setConfig] = useState<ConfigGenerale | null>(null);

  useEffect(() => {
    useCases.getConfig.execute().then(setConfig);
  }, [useCases]);

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold">Back-office</h1>
      <p className="mt-2 text-sm text-gray-500">
        Société : {config?.nom_societe ?? "…"}
      </p>
    </main>
  );
}
