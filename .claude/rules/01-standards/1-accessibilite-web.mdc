---
description: RESPECTER l'accessibilité (ARIA valide, contraste AA, liens distinguables) LORS de l'écriture de composants UI web
globs: **/*.tsx, **/*.jsx, **/components/**/*
alwaysApply: true
---

Objectif : viser Lighthouse Accessibilité ≥ 95.

## ARIA valide
- ❌ Pas d'`aria-label`/`aria-*` sur un élément générique sans rôle (ex. `<div aria-label="5 étoiles">`) → « prohibited ARIA attributes ».
- ✅ Sur un visuel décoratif/informatif (notation étoiles, icône porteuse de sens), ajouter `role="img"` **avec** `aria-label`, ou utiliser un élément sémantique.
- ✅ Icônes purement décoratives : `aria-hidden="true"`.

## Liens distinguables (pas par la couleur seule)
- ❌ Lien inline dans un paragraphe distingué **uniquement par la couleur** (ex. `text-primary` sans soulignement) → « links rely on color ».
- ✅ Souligner les liens inline en continu (pas seulement au `hover`), ou ajouter un autre indicateur visuel. (Les liens de nav/boutons isolés sont OK.)

## Contraste (WCAG AA)
- ✅ Texte normal : ratio ≥ **4.5:1** ; gros texte (≥ 24px ou 18.66px bold) : ≥ **3:1**.
- ⚠️ Attention au **texte blanc sur boutons de couleur de marque** (verts/jaunes clairs) : souvent < 4.5:1. Vérifier et, si besoin, foncer la couleur, grossir/mettre en gras le texte, ou ajuster le texte.
- ✅ Vérifier le contraste des `muted-foreground` sur fond sombre.

## Bases
- ✅ Un seul `<h1>`, hiérarchie de titres logique.
- ✅ `alt` pertinent sur les images de contenu ; `alt=""` sur les décoratives.
- ✅ Labels associés aux champs de formulaire ; focus visible.

## Vérification
- ✅ Lancer Lighthouse (ou axe) avant livraison ; viser 0 erreur a11y bloquante.
