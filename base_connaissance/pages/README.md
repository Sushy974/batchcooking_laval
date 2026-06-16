# Spécifications par page (pour IA d'architecture / design)

Un fichier YAML par page de la **vitrine**, décrivant les **informations affichées**
(sections, éléments, sources de données, conditions, interactions, CTAs).
Objectif : permettre de **refaire les visuels** sans relire le code.

| Fichier | Page | Route |
|---|---|---|
| `_global-layout.yaml` | Gabarit commun (bandeau, en-tête, pied de page) | toutes |
| `accueil.yaml` | Accueil | `/` |
| `menu-plats.yaml` | Menu / catalogue + filtres | `/plats` |
| `plat-detail.yaml` | Détail d'un plat | `/plats/[slug]` |
| `formules.yaml` | Liste des formules | `/formules` |
| `formule-detail.yaml` | Détail d'une formule | `/formules/[slug]` |
| `comment-ca-marche.yaml` | Comment ça marche | `/comment-ca-marche` |
| `a-propos.yaml` | À propos | `/a-propos` |
| `faq.yaml` | FAQ | `/faq` |
| `contact.yaml` | Contact | `/contact` |
| `mentions-legales.yaml` | Mentions légales | `/mentions-legales` |
| `not-found.yaml` | Erreur 404 | toute route inconnue |

Notes :
- Les noms en `config.*`, `data_contenu.*`, `formule.*`, `plat.*` renvoient au
  modèle de données du [cahier des charges](../cahier_des_charges.md).
- `disposition_actuelle` décrit l'implémentation existante — l'IA design peut la
  repenser librement, l'essentiel est de conserver les **informations** listées.
- L'admin (`apps/admin`) n'est pas couvert ici (back-office, hors visuels publics).
