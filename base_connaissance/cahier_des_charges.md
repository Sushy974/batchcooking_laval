# 🍳 Projet Batchcooking Emma — Spécifications Techniques & Fonctionnelles

**Nature du projet :** Site **vitrine** d'un **service de batch cooking à domicile**. Emma se déplace chez ses clients pour cuisiner les repas de la semaine. Les courses peuvent être faites par le client lui-même **ou** par Emma.

**Le site ne vend rien en ligne et ne gère aucun paiement.** Il sert uniquement à **présenter les offres (formules), inspirer (répertoire de plats) et générer du contact**. Le paiement se fait **en personne** (espèces ou carte via les propres moyens d'Emma), hors du site.

**Objectif :** Une plateforme performante, sécurisée et dynamique (Vitrine + Admin), avec une seule techno front-end et une base Firebase, pour qu'Emma gère ses formules et son répertoire de plats en toute autonomie.

---

## 🛠️ 1. Architecture Technique & Choix Technologiques

### Front-End (Unique Techno) : Next.js (React) / TypeScript
*   **Pourquoi ?** Même écosystème pour l'interface publique (Vitrine) et le back-office (Admin).
*   **Performance Vitrine :** ISR (Incremental Static Regeneration) ou SSR de Next.js → chargement instantané, excellent SEO, et mise à jour dès qu'Emma modifie la base.

### Back-End & Base de données : Firebase Firestore
*   **Architecture :** Communication directe du Front vers Firestore (pas d'API intermédiaire → coûts limités). C'est **parfaitement adapté ici** puisqu'il n'y a ni paiement ni logique serveur sensible.
*   **Stockage des médias :** **Firebase Storage** pour les photos (plats, formules). On ne stocke jamais l'image dans Firestore : on stocke son **URL**. Documents légers, rendu rapide.
*   **Fichiers d'environnement :** Fichiers `.env.local` pour masquer les clés de configuration Firebase.
*   **Sécurité (Firestore Rules) :**
    *   `config_generale`, `pages`, `plats`, `formules` : **Lecture publique** (`allow read: if true;`), **Écriture réservée à Emma** (`allow write: if request.auth.uid == EMMA_UID;`).
    *   **Aucune écriture publique** : le site ne fait que **lire** (vitrine pure). Toute écriture passe par le compte d'Emma.
    *   Emma = **unique compte admin** (authentification Firebase).

---

## 📊 2. Modélisation des Données (Firestore)

### Collection `config_generale`
**Document unique** centralisant tout ce qu'Emma doit pouvoir changer sans toucher au code.

```json
{
  "nom_societe": "Le Batchcooking d'Emma",
  "telephone": "06XXXXXXXX",
  "email": "contact@batchcooking-emma.fr",
  "zone_intervention": "Laval et 20 km alentour",
  "rayon_km": 20,
  "communes_couvertes": ["Laval", "Changé", "Bonchamp"],
  "reseaux_sociaux": {
    "instagram": "@emma_batchcooking",
    "facebook": "",
    "tiktok": ""
  },
  "logo_url": "https://...",
  "banniere_active": true,
  "banniere_message": "📅 Réservations ouvertes pour septembre !",
  "seo_defaut": {
    "titre": "Le Batchcooking d'Emma — Vos repas de la semaine cuisinés chez vous",
    "description": "Emma vient cuisiner vos plats de la semaine à domicile. Courses incluses en option."
  }
}
```
**Pourquoi ces champs ?**
*   `zone_intervention` / `rayon_km` / `communes_couvertes` → c'est un **service à domicile** : la zone de déplacement est l'info n°1 que cherche un visiteur. La sortir du code = autonomie d'Emma.
*   `banniere_active` + `banniere_message` → annoncer disponibilités, congés ou promo sans dev.
*   `seo_defaut` → valeurs de repli pour les pages sans SEO propre (cohérence + référencement).

> ℹ️ J'ai **retiré** `frais_livraison`, `minimum_commande`, `jours_livraison` du modèle e-commerce précédent : ils n'ont plus de sens pour un service à domicile sans vente en ligne.

---

### Collection `plats`
**Répertoire ET unité de tarification.** Un plat n'a pas un simple "prix de vente" : il porte deux coûts distincts. **Un document = un plat.**
*   **`cout_matiere_premiere_moyen`** → ce que coûtent les ingrédients en moyenne. Sert à **chiffrer les courses quand c'est Emma qui les fait** et à calculer sa marge.
*   **`prestation`** → le prix du **travail d'Emma** pour ce plat, qui peut être **fixe** ou une **fourchette `min`/`max`** (la complexité ou la quantité font varier le temps passé).

C'est ce qui permet de **calculer le devis d'un menu** = somme des prestations des plats choisis (+ somme des coûts matière si Emma fait les courses).

```json
{
  "nom": "Curry de poulet & riz basmati",
  "slug": "curry-poulet-riz-basmati",
  "categorie": "plat",
  "cout_matiere_premiere_moyen": 3.5,
  "prestation": {
    "type": "fourchette",
    "min": 4,
    "max": 6,
    "fixe": null
  },
  "description": "Poulet mijoté au lait de coco, légumes de saison…",
  "description_courte": "Mijoté crémeux, doux et parfumé.",
  "image_principale": "https://...",
  "images": ["https://...", "https://..."],
  "ingredients": ["Poulet", "Lait de coco", "Riz basmati", "Curry", "Oignon"],
  "allergenes": ["fruits_a_coque", "soja"],
  "regimes": ["sans_gluten"],
  "valeurs_nutritionnelles": { "calories": 540, "proteines": 32, "glucides": 48, "lipides": 18 },
  "conservation_jours": 4,
  "mode_rechauffe": "Micro-ondes 2 min ou poêle 5 min",
  "saison": ["automne", "hiver"],
  "disponible": true,
  "mis_en_avant": false,
  "ordre": 10,
  "tags": ["réconfortant", "best-seller"]
}
```
**Pourquoi ces champs (les choix qui comptent) ?**
*   `cout_matiere_premiere_moyen` → **séparé du prix de prestation** car ce sont deux logiques différentes : la matière est répercutée au client uniquement si Emma fait les courses ; la prestation est sa rémunération. Les mélanger empêcherait de gérer le cas "le client fait ses courses lui-même".
*   `prestation.type` (`fixe` ou `fourchette`) → un plat simple peut avoir un prix **fixe** ; un plat dont le temps varie (grosse quantité, technique) a une **fourchette `min`/`max`**. On garde les deux champs et un `type` pour savoir lequel afficher (et afficher "à partir de X €" ou "X–Y €").
*   `slug` → page dédiée par plat (`/plats/curry-poulet-riz-basmati`) : URL propre, partageable, bonne pour le SEO.
*   `description_courte` vs `description` → la courte pour les cartes/listes (rapide, mise en page maîtrisée), la longue pour la page détail. On ne tronque pas du texte côté front.
*   `categorie` (entrée / plat / dessert / accompagnement) → organise le répertoire et permet de **composer un menu de prestation**.
*   `allergenes` → Emma cuisine pour des familles : c'est une **info de sécurité essentielle** (et obligation d'information). Codes normalisés → pictos + filtres.
*   `regimes` (végétarien, vegan, sans gluten…) → filtre clé (allergies, choix de vie) et argument de personnalisation.
*   `conservation_jours` + `mode_rechauffe` → **cœur du batch cooking** : ce sont des repas pour toute la semaine ; le client veut savoir combien de temps ça se garde et comment réchauffer.
*   `saison` → permet de proposer des menus de saison et de filtrer le répertoire.
*   `disponible` → masquer un plat sans le supprimer (garde l'historique et le SEO).
*   `mis_en_avant` + `ordre` → pilotage éditorial (vedettes de l'accueil, ordre manuel).

> 💡 Utiliser des **valeurs codées en `snake_case`** (`fruits_a_coque`, `sans_gluten`) pour `categorie`, `allergenes`, `regimes`, `saison`, et garder la liste autorisée dans des constantes. Évite les fautes de frappe qui casseraient les filtres.

---

### Collection `formules`
Les **offres de prestation** (cœur du modèle). **Un document = une formule.**
La variable centrale du métier : **les courses sont-elles incluses ?**

```json
{
  "nom": "La Semaine Sereine",
  "slug": "semaine-sereine",
  "description": "Une demi-journée chez vous, et vos 5 dîners de la semaine sont prêts.",
  "image_principale": "https://...",
  "prix": 120,
  "duree_heures": 4,
  "nombre_repas": 5,
  "nombre_personnes": 4,
  "courses": "en_option",
  "mention_courses": "Si Emma réalise les courses, un supplément correspondant au montant des courses + le service est facturé en plus.",
  "inclus": [
    "Élaboration du menu avec vous",
    "Cuisine sur place",
    "Mise en barquettes étiquetées",
    "Nettoyage du plan de travail"
  ],
  "non_inclus": ["Le montant des courses si elles sont réalisées par Emma (facturé en supplément)"],
  "disponible": true,
  "mis_en_avant": true,
  "ordre": 1
}
```
**Pourquoi ces champs ?**
*   `prix` → **prix fixe par formule** (forfait saisi par Emma, *décision actée*). C'est le prix du **service** affiché clairement ; il **ne comprend pas** le coût des courses si Emma les réalise.
*   `courses` (`incluses` / `non_incluses` / `en_option`) + `mention_courses` → **la distinction métier n°1** : soit le client fait ses courses lui-même (rien en plus), soit Emma s'en charge et **un supplément = montant des courses + service est facturé en plus**. On l'affiche en toutes lettres pour qu'il n'y ait aucune ambiguïté sur la facture finale.
*   `duree_heures` + `nombre_repas` + `nombre_personnes` → ce qui définit concrètement une prestation à domicile (combien de temps, combien de repas, pour combien de personnes).
*   `inclus` / `non_inclus` → lève les ambiguïtés → moins de questions, plus de confiance.
*   `mis_en_avant` + `ordre` → mettre en avant la formule phare et maîtriser l'ordre d'affichage.

> 💡 **Lien avec les `plats`** : le prix de formule est **fixe** (décision actée), donc *non* recalculé depuis les plats. En revanche, `cout_matiere_premiere_moyen` au niveau plat reste utile pour **estimer le montant des courses** à annoncer au client quand Emma s'en charge (le montant réel restant celui du ticket de caisse).

---

### Collection `pages`
Contenu éditorial modifiable par Emma (Accueil, À propos, FAQ, Mentions légales…). **Un document = une page**, identifié par `slug`.
Le champ **`type_page`** est un **enum** qui détermine **de quelle page il s'agit** (donc quel gabarit/structure le front affiche). Le champ **`data_contenu`** est un **objet variable** dont la forme dépend du `type_page`.

```json
{
  "slug": "a-propos",
  "type_page": "a_propos",
  "titre": "L'histoire d'Emma",
  "data_contenu": {
    "titre": "test1",
    "exemple_de_donnee": "test2"
  },
  "publie": true,
  "seo": { "titre": "À propos — Le Batchcooking d'Emma", "description": "Le parcours d'Emma." }
}
```
**Pourquoi cette structure ?**
*   `type_page` (enum) → le front sait **quel composant/gabarit** rendre (`accueil`, `a_propos`, `comment_ca_marche`, `faq`, `mentions_legales`, `contact`…). On évite un `if/else` fragile basé sur le `slug` : le type est explicite et contrôlé.
*   `data_contenu` (objet **variable**) → chaque type de page a des données différentes. Une FAQ porte une liste de questions/réponses ; un "Comment ça marche" porte des étapes ; l'accueil porte des sections. Un objet libre par type évite de créer des dizaines de champs inutiles communs à toutes les pages.
*   `titre` + `seo` restent **communs** à toutes les pages (toujours utiles pour l'affichage et le référencement), seul `data_contenu` varie.
*   `publie` → préparer une page avant sa mise en ligne.

> 💡 À chaque valeur de `type_page` correspond une **forme attendue de `data_contenu`** côté front. Ces "contrats" sont définis ci-dessous : un composant/gabarit dédié par type, et l'admin propose un formulaire adapté à chaque type.

#### Conventions communes à tous les contrats
*   Les **listes** sont des tableaux d'objets (`[]`) → permettent d'ajouter/réordonner/supprimer des éléments dans l'admin.
*   Les **images** sont des **URLs Firebase Storage** (jamais le binaire).
*   Les champs `icone` réfèrent un **nom d'icône** d'une bibliothèque front (ex. Lucide) — pas une image.
*   Les **listes d'objets venant d'autres collections** (formules/plats mis en avant) ne sont **pas** dupliquées ici : `data_contenu` ne porte que le **titre de section** et un **toggle d'affichage** ; le front va chercher les éléments dans `formules`/`plats`.

---

### Contrats de `data_contenu` par `type_page`

**`accueil`**
```json
{
  "hero": {
    "titre": "Emma cuisine vos repas de la semaine, chez vous",
    "sous_titre": "Le batchcooking à domicile, à Laval et alentour.",
    "image": "https://...",
    "cta_label": "Découvrir les formules",
    "cta_lien": "/formules"
  },
  "arguments": [
    { "icone": "clock", "titre": "Gagnez du temps", "texte": "Plus de corvée de cuisine le soir." },
    { "icone": "heart", "titre": "Fait maison", "texte": "Des plats sains, adaptés à vos goûts." }
  ],
  "section_formules": { "titre": "Mes formules", "afficher": true },
  "section_plats": { "titre": "Un aperçu de mes plats", "afficher": true },
  "section_zone": { "titre": "Où j'interviens", "texte": "Je me déplace à Laval et dans un rayon de 20 km." },
  "cta_final": { "titre": "Envie de tester ?", "texte": "Contactez-moi pour organiser votre première séance.", "label": "Me contacter", "lien": "/contact" }
}
```
*Pourquoi :* l'accueil est une suite de sections éditables. `section_formules`/`section_plats` ne stockent qu'un titre + un toggle car les éléments viennent des collections `formules`/`plats` (mis en avant).

**`comment_ca_marche`**
```json
{
  "intro": "Une prestation simple, en 4 étapes.",
  "etapes": [
    { "numero": 1, "icone": "list", "titre": "On choisit le menu ensemble", "texte": "Selon vos goûts et contraintes." },
    { "numero": 2, "icone": "shopping-cart", "titre": "Les courses", "texte": "Vous les faites, ou je m'en charge (montant + service en supplément)." },
    { "numero": 3, "icone": "chef-hat", "titre": "Je cuisine chez vous", "texte": "Une demi-journée, tout est préparé." },
    { "numero": 4, "icone": "utensils", "titre": "Vos repas sont prêts", "texte": "Étiquetés, prêts à réchauffer toute la semaine." }
  ]
}
```

**`faq`**
```json
{
  "intro": "Les questions qu'on me pose souvent.",
  "questions": [
    { "question": "Faut-il que j'aie du matériel particulier ?", "reponse": "Non, je cuisine avec ce que vous avez." },
    { "question": "Comment se passent les courses ?", "reponse": "Vous pouvez les faire vous-même ou me les confier." }
  ]
}
```

**`a_propos`**
```json
{
  "portrait": "https://...",
  "intro": "Bonjour, moi c'est Emma.",
  "sections": [
    { "titre": "Mon parcours", "texte": "..." },
    { "titre": "Ma cuisine", "texte": "..." }
  ],
  "citation": "Bien manger ne devrait jamais être une corvée."
}
```

**`contact`**
```json
{
  "intro": "Une question ? Envie de réserver une séance ? Écrivez-moi.",
  "afficher_telephone": true,
  "afficher_email": true,
  "afficher_instagram": true
}
```
*Pourquoi :* les coordonnées elles-mêmes vivent dans `config_generale` (source unique). Cette page ne porte qu'un texte d'intro et des **toggles** d'affichage. *(Le formulaire enregistré en base reste en V2.)*

**`mentions_legales`** *(et tout autre page de texte simple)*
```json
{
  "blocs": [
    { "titre": "Éditeur du site", "texte": "..." },
    { "titre": "Hébergement", "texte": "..." },
    { "titre": "Données personnelles", "texte": "..." }
  ]
}
```
*Pourquoi :* une structure générique `blocs[]` (titre + texte) sert pour toutes les pages purement textuelles à venir (CGV, politique de confidentialité…) sans créer de nouveau type à chaque fois.

> ⚠️ **Règle d'or** : le front doit **tolérer l'absence d'un champ** (afficher une valeur de repli plutôt que planter), car Emma édite librement. Idéalement, valider la forme de `data_contenu` par type via un schéma (ex. Zod) à la lecture.

---

> 🔮 **Pas de collection `demandes` / formulaire de réservation pour l'instant.** Le contact se fait directement (tel / email / Instagram). Un formulaire de demande de réservation enregistré en base (avec suivi des prospects dans l'admin) est repoussé en **V2**.

---

## 🖥️ 3. Vitrine Publique — Pages & Fonctionnalités
*   **Accueil** : hero + bannière promo (depuis `config`), promesse ("Emma cuisine chez vous"), formules mises en avant, plats vedettes, zone d'intervention, appel à l'action (appeler / contacter). *(Témoignages → Phase 2.)*
*   **Comment ça marche** : le **déroulé d'une prestation à domicile** (choix du menu → courses par vous ou par Emma → Emma cuisine chez vous → repas de la semaine prêts). C'est la page pédagogique clé d'un service.
*   **Les Formules** (`/formules/[slug]`) : détail, durée, nb de repas, **prix fixe**, **option courses** (avec la mention du supplément courses + service), ce qui est inclus.
*   **Le Répertoire de plats** : liste avec **filtres** (catégorie, régime, allergènes, saison) — inspiration pour composer son menu.
*   **Page plat** (`/plats/[slug]`) : photos, description, ingrédients, allergènes, nutrition, conservation.
*   **Zone d'intervention** : communes couvertes / rayon (depuis `config`).
*   **Contact** : tel / email / Instagram directs (liens `tel:` et `mailto:`). *Pas de formulaire enregistré en base pour l'instant (→ V2).*
*   **Pages éditoriales** : À propos, FAQ, Mentions légales (depuis `pages`).
*   **SEO** : `slug` propres, balises meta par page, `sitemap.xml`, données structurées Schema.org (`LocalBusiness` / `Service`) → important pour un service **local**.

---

## 🔐 4. Back-Office Admin (réservé à Emma)
*   **Authentification** Firebase (email/mot de passe), accès protégé par l'UID d'Emma.
*   **Gestion des plats** : CRUD complet, upload d'images (Firebase Storage), toggles `disponible` / `mis_en_avant`, réordonnancement (`ordre`).
*   **Gestion des formules** : CRUD, prix fixe, option courses, inclus/non-inclus.
*   **Gestion du contenu** : édition des `pages` et de `config_generale` (coordonnées, zone, bannière).

---

## 🗺️ 5. Phasage proposé
*   **Phase 1 (MVP)** : Vitrine complète (accueil, comment ça marche, formules, répertoire, plat, zone, contact direct) + Admin (plats, formules, pages, config). 100 % Firestore, **lecture seule côté public, sans aucun paiement**.
*   **Phase 2** : Formulaire de **demande de réservation** en base (`demandes`) + suivi des prospects dans l'admin, témoignages/avis, galerie de réalisations, newsletter.
*   **Phase 3** (si un jour besoin) : réservation de créneau en ligne, espace client. *Le paiement en ligne reste hors périmètre tant que ce n'est pas demandé.*

---

## ✅ 6. Décisions actées
1.  **Tarification** : **prix fixe par formule** (forfait saisi par Emma, pas de calcul automatique depuis les plats).
2.  **Option courses** : si Emma réalise les courses, un **supplément = montant des courses + service** est facturé en plus (mention explicite sur la formule). Sinon, le client fait ses courses lui-même, rien en plus.
3.  **Témoignages** : **pas en Phase 1** → reportés en Phase 2.
4.  **Aucun paiement ni écriture publique** : le site est une vitrine en lecture seule ; le contact se fait en direct (tel / email / Instagram).
