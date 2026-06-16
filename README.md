# Le Batchcooking d'Emma — Monorepo

Site **vitrine** d'un service de **batchcooking à domicile** (Laval).
Emma se déplace chez ses clients pour cuisiner leurs repas de la semaine.
Le site **affiche** les offres ; **aucun paiement / aucune vente en ligne**.

> 📋 Spécifications complètes : [`base_connaissance/cahier_des_charges.md`](base_connaissance/cahier_des_charges.md)
> 🧭 Journal de travaux (handoff) : [`claude/travaux/`](claude/travaux)

## Structure (npm workspaces)

```
apps/vitrine/      Next.js public (SSR/ISR) — port 3000
apps/admin/        Next.js back-office       — port 3001
packages/core/     @batchcooking/core — domaine partagé
```

`packages/core` contient TOUT le domaine : types, schémas Zod, repositories,
use cases, conteneur d'injection, init Firebase. Les apps le transpilent
(`transpilePackages`).

## Architecture : Clean Architecture

Flux strict, à sens unique :

```
UI → UseCase → Repository (abstrait) → Fake (dev) | Firestore (staging/prod)
```

- L'UI ne touche jamais Firestore ni les repositories : elle passe par les **use cases**.
- Chaque entité a **3 classes** : mère abstraite + `Fake…` + `Firestore…`.
- Le **conteneur** (`packages/core/src/container.ts`) choisit l'implémentation selon
  `NEXT_PUBLIC_DATA_SOURCE` et expose le singleton `useCases`.
- Injection côté client : `@batchcooking/core/client` (`UseCasesProvider`, `useUseCases`).

## Environnements

| Env | Données | Clés | Lancer |
|---|---|---|---|
| development | `mock` (fixtures locales) | aucune | `npm run dev:vitrine` / `npm run dev:admin` |
| staging | Firestore test | `apps/<app>/.env.staging.local` | `npm run dev:staging -w vitrine` |
| production | Firestore client | `apps/<app>/.env.production.local` | `npm run build:production -w vitrine` |

En **dev**, tout tourne hors-ligne avec de fausses données ; vitrine et admin ne
partagent pas leur état (normal : chaque app a ses fixtures en mémoire).

## Démarrer

```bash
npm install
npm run dev:vitrine   # http://localhost:3000
npm run dev:admin     # http://localhost:3001
```

VS Code : 6 configurations dans `.vscode/launch.json`
(`vitrine_dev/stg/prod`, `admin_dev/stg/prod`).

## Scripts (racine)

```bash
npm run typecheck     # tsc sur tous les workspaces
npm run lint          # eslint sur tous les workspaces
npm run build:vitrine
npm run build:admin
```

## Brancher Firebase (plus tard)

1. Créer un projet Firebase (Firestore + Storage + Auth).
2. Remplir `apps/<app>/.env.staging.local` (puis `.env.production.local`).
3. Mettre l'UID d'Emma dans [`firestore.rules`](firestore.rules) et déployer les règles.
4. Configurer `images.remotePatterns` dans les `next.config.ts` pour les images Storage.
