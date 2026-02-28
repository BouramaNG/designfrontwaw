# Prompt design — Page Starlink (à donner à Claude)

Copie le bloc ci‑dessous et donne‑le à Claude pour qu’il conçoive la page Starlink (structure, contenu, design).

---

## Contexte

Tu travailles sur le site **WAW Telecom** (wawtelecom_refonte), une entreprise de télécoms au **Sénégal**. WAW est désormais **revendeur agréé Starlink**. Le site est en **React (Vite)** avec **Tailwind CSS** et **Framer Motion**. Il y a déjà une homepage avec un slide hero Starlink, une modale d’accueil Starlink et un lien vers une page « Communiqué de presse » (PDF). Le menu contient un item **Starlink** avec un badge « New » ; au clic, on doit arriver sur une **page dédiée Starlink**.

Cette page est implémentée dans **`src/pages/StarlinkPage.tsx`**. Elle reçoit une prop **`onNavigate: (page: PageType) => void`** pour la navigation (ex. vers `'contact'`, `'home2'`, `'starlink-press'`). Il n’y a pas de backend dédié : les CTA peuvent ouvrir la page Contact, un lien WhatsApp, ou la page du communiqué de presse.

## Objectif

Concevoir et décrire (puis si possible coder) la **page Starlink** pour qu’elle soit :
- **Belle** — esthétique soignée, cohérente avec le reste du site (couleurs WAW : waw-dark, waw-yellow, fonds clairs/dégradés).
- **Moderne** — typographie, espacements, cartes, icônes (Lucide), micro‑animations (Framer Motion) légères.
- **Fluide** — lecture facile, sections bien séparées, scroll agréable, transitions discrètes.
- **Attrayante** — visuels (images/placeholders Starlink), mise en avant des bénéfices, CTA visibles.
- **Professionnelle** — ton B2B, crédibilité revendeur Starlink, public cible : entreprises, sites stratégiques, organisations au Sénégal.

## Contraintes techniques

- **Stack** : React, TypeScript, Tailwind, Framer Motion, Lucide React.
- **Navigation** : utiliser `onNavigate('contact')` pour « Demander une étude », `onNavigate('starlink-press')` pour le communiqué, `onNavigate('home2')` pour l’accueil.
- **Responsive** : mobile-first, breakpoints Tailwind (sm, md, lg).
- **Accessibilité** : contrastes corrects, boutons/labels explicites, structure sémantique (main, sections, headings).
- **Pas de backend** : pas de formulaire côté serveur sur cette page ; les CTA mènent vers Contact ou liens externes (WhatsApp, PDF).

## Ce qu’on attend de cette page

1. **Hero / bannière**  
   Titre percutant (ex. « Connectivité Starlink » ou « Internet satellite haut débit »), sous-titre ou court texte, badge « Revendeur Autorisé Starlink », et un CTA principal (ex. « Demander une étude personnalisée » → Contact).

2. **Valeur ajoutée WAW**  
   Une section qui explique pourquoi passer par WAW : accompagnement local, étude sur mesure, déploiement, support. 2–3 points clés avec icônes ou courtes cartes.

3. **Bénéfices Starlink**  
   Pour qui ? (entreprises, sites isolés, événements, BTP, santé, éducation.) 3–4 bénéfices avec titres courts et une phrase chacun (débit, couverture, rapidité de déploiement, fiabilité).

4. **Preuve / confiance**  
   Lien vers le communiqué de presse officiel (bouton ou lien « Lire le communiqué de presse » → `onNavigate('starlink-press')`). Optionnel : courte phrase du type « Partenariat officiel Starlink ».

5. **CTA fin de page**  
   Rappel du CTA principal (étude personnalisée / contact) pour ceux qui scrollent jusqu’en bas.

6. **Cohérence visuelle**  
   Réutiliser les couleurs du projet (waw-dark, waw-yellow), le style des boutons (rounded-xl, font-semibold), et une structure de page similaire aux autres pages (pt-24 pour le header fixe, max-w-5xl ou 6xl, espacements généreux).

Tu peux proposer une structure en sections (titres H2), le contenu texte (titres + 1–2 phrases par bloc), les CTA et leurs actions, et si tu codes : le JSX de `StarlinkPage.tsx` avec Tailwind et Framer Motion pour des apparitions/transitions légères. Éviter les blocs de code trop longs ; privilégier des extraits clairs et modulables.

---

## Résumé — Ce qu’on attend de la page Starlink

| Élément | Attente |
|--------|--------|
| **Objectif principal** | Générer des leads (demandes d’étude / contact) et renforcer la crédibilité WAW en tant que revendeur Starlink. |
| **Public cible** | Entreprises, sites stratégiques, organisations au Sénégal (B2B). |
| **Parcours utilisateur** | Arrivée sur la page → compréhension rapide de l’offre Starlink + rôle de WAW → confiance (badge, communiqué) → clic sur « Demander une étude » ou Contact. |
| **Messages clés** | (1) WAW = revendeur agréé Starlink. (2) Connectivité satellite pour professionnels. (3) Étude personnalisée et accompagnement local. |
| **CTA principaux** | « Demander une étude personnalisée » (→ Contact), « Lire le communiqué de presse » (→ page PDF). |
| **Ton** | Professionnel, rassurant, orienté solution (pas trop technique, bénéfices business). |
| **Structure** | Hero → Valeur WAW → Bénéfices Starlink → Preuve (communiqué) → CTA final. |

Fin du prompt.
