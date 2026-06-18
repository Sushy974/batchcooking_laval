"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useUseCases } from "@batchcooking/core/client";

export default function LoginPage() {
  const useCases = useUseCases();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);

  const soumettre = async (e: FormEvent) => {
    e.preventDefault();
    setErreur(null);
    setEnCours(true);
    try {
      await useCases.connexion.execute(email, motDePasse);
      router.replace("/");
    } catch {
      setErreur("Identifiants invalides.");
    } finally {
      setEnCours(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <form
        onSubmit={soumettre}
        className="w-full max-w-sm rounded-2xl border border-border bg-background p-6 shadow-sm"
      >
        <h1 className="text-xl font-bold">Connexion admin</h1>
        <p className="mt-1 text-sm text-muted">Le Batchcooking d&apos;Emma</p>

        <label className="mt-6 block text-sm font-medium">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </label>

        <label className="mt-4 block text-sm font-medium">
          Mot de passe
          <input
            type="password"
            required
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </label>

        {erreur && <p className="mt-3 text-sm text-red-600">{erreur}</p>}

        <button
          type="submit"
          disabled={enCours}
          className="mt-6 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {enCours ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
