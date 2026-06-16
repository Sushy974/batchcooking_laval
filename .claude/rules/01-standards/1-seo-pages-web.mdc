---
description: GARANTIR le SEO de chaque page (metadata unique, canonical, JSON-LD, sitemap, contenu unique) LORS de la création de pages web
globs: **/app/**/page.tsx, **/app/**/layout.tsx, **/sitemap.*, **/robots.*, **/lib/seo.*, **/lib/schema.*
alwaysApply: true
---

Objectif : viser Lighthouse SEO = 100 et un référencement local solide.

## Metadata (par page)
- ✅ `title` **unique** et keyword-first (ex. « Service à Ville | Marque »).
- ✅ `meta description` **unique** par page (≠ d'une page à l'autre).
- ✅ `canonical` **auto-référencé** par page, cohérent avec `trailingSlash` (slash final ou non — pareil partout, sitemap inclus).
- ✅ Factoriser via un helper `pageMetadata({title, description, canonical})`.

## Données structurées (JSON-LD)
- ✅ `Organization`/`LocalBusiness` **global** (layout) : NAP réel, `areaServed` cohérent avec l'adresse (ne pas y empiler des villes sans établissement → signal local brouillé).
- ✅ Schema **dédié par page** : `Service`, `Product`, `Article`, `FAQPage`… avec son propre `areaServed`/contexte.

## Sitemap & indexabilité
- ✅ `sitemap` **data-driven** : dérivé des tableaux de données (jamais d'URL en dur). **Quand on ajoute un type de page dynamique, mettre à jour le sitemap.**
- ✅ Un seul `<h1>` par page ; mot-clé présent dans `title`, `h1`, intro et JSON-LD.
- ✅ Maillage interne (footer/nav) vers les pages importantes.

## Anti near-duplicate (pages géo / templatisées)
- ❌ Ne pas générer N pages ville/produit quasi identiques (seul le nom change) → risque « doorway pages » / « page dupliquée » → désindexation.
- ✅ Prévoir du **contenu unique** par page (≥ ~150 mots spécifiques : contexte local, secteurs, cas d'usage).

## Positionnement local multi-villes
- ✅ Garder la ville/zone principale (la plus forte) ancrée sur la home ; créer des **pages dédiées** par ville secondaire plutôt que tout diluer.
- ⚠️ Le **pack local (carte Google)** exige une fiche Google Business + adresse réelle ; les pages visent le SEO **organique**.
