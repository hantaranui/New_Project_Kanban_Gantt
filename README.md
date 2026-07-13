# Widget Gestion de Projet pour Grist

Widget personnalisé Grist pour la gestion de tâches en équipe : Kanban, Gantt, gestion d'équipe et paramètres avancés. Développé pour LaSuite.coop, réutilisable sur n'importe quel document Grist.

## Fonctionnalités

- **Kanban** : colonnes de statut personnalisables (couleur, emoji), regroupement par statut/priorité/projet, tri, glisser-déposer, archivage.
- **Gantt** : vues mois/plage personnalisée, sous-tâches et jalons, dépendances visuelles, export PDF.
- **Sous-tâches** : liste par tâche, assignés multiples, dates, priorité, statut, récurrence.
- **RACI** (optionnel) : rôles Responsable / Approbateur / Consulté / Informé par tâche.
- **Catégories & Tags** : gestion inline (nom + couleur) depuis les Paramètres, synchronisée avec les colonnes Grist natives (Choice / Choice List).
- **Assignés** : plusieurs personnes par tâche, colonne Grist Reference List vers la table Utilisateurs.
- **Commentaires & pièces jointes** par tâche.
- **Suivi du temps** : chronomètre par tâche + saisie manuelle, total et moyenne par tâche.
- **Récurrence** : génération d'occurrences (jour/semaine/mois/...) et enchaînement automatique à la complétion.
- **Notifications** : boîte de réception in-app (cloche) pour les personnes concernées par une tâche (création, modification, commentaire) — pas de journalisation, la notification disparaît une fois consultée.
- **Automatisations** : règles déclenchées par changement de statut/priorité/assignation ou échéance, avec notification de l'assigné, du responsable projet ou d'une personne précise.
- **Projets** : couleur, statut, responsable, filtre "Mes projets".
- **Équipe** : utilisateurs, groupes, rôles (avec gestion des rôles personnalisés).
- **Sécurité** : génération de règles d'accès (ACL) Grist pour protéger les tables du widget.
- **Configuration avancée** : mapping des tables/colonnes pour réutiliser des tables Grist existantes plutôt que les tables par défaut.

## Architecture

Le code source vit dans `src/` en modules ES, regroupés par domaine fonctionnel, et est bundlé en un unique fichier `widget.js` (IIFE) via [esbuild](https://esbuild.github.io/) — c'est `widget.js` que Grist charge réellement, `index.html` n'importe rien d'autre.

```
src/
├── main.js                   # Point d'entrée : bootstrap, imports, exposition window.*
├── store.js                  # État partagé (state.*) et noms de table par défaut
├── config.js                 # Noms de table côté client (français) et libellés UI
├── i18n.js                    # Traductions (français)
├── bootstrap/
│   └── ensure-tables.js       # Création/migration des tables Grist au premier lancement
├── domains/                   # Un fichier par domaine fonctionnel (tasks, kanban, gantt,
│                               # subtasks, team, notifications, categories, tags, etc.)
├── ui/                        # Onglets, modales de confirmation, toasts
└── utils/                     # Dates, labels, sanitisation HTML
```

## Développement

```bash
npm install          # installe esbuild + vitest
npm run dev          # rebuild widget.js à chaque modification (watch)
npm run build        # build unique de production
npm test             # tests unitaires (vitest)
```

Après toute modification dans `src/`, il faut relancer `npm run build` (ou garder `npm run dev` ouvert) : `widget.js` est un artefact généré, il ne doit jamais être édité à la main.

## Déploiement (GitHub Pages)

1. Pousser ce dépôt sur GitHub.
2. Activer GitHub Pages sur la branche `main`, dossier `/`.
3. Dans Grist, ajouter une vue personnalisée pointant vers l'URL GitHub Pages du widget.
4. Autoriser le widget en **accès complet** au document (nécessaire pour créer/modifier les tables et lire l'e-mail de l'utilisateur connecté).

`vercel.json` est fourni pour un déploiement alternatif sur Vercel (mêmes en-têtes CORS/iframe nécessaires à l'intégration Grist).

## Tables Grist utilisées

Le widget crée automatiquement ses tables au premier chargement (préfixe `PM_*` par défaut : `PM_Tasks`, `PM_Users`, `PM_Groups`, `PM_Subtasks`, `PM_Comments`, `PM_TimeEntries`, `PM_Projects`, `PM_Config`, `PM_Settings`, `PM_Notifications`, `PM_Attachments`, `PM_UserInfo`). Si le document utilise déjà les noms français (`Taches`, `Utilisateurs`, `Equipes`, `Sous_taches`, `Commentaires`, `Suivi_temps`, `Projets`, `Configuration_widget`, `Parametres_widget`, `Notifications`, `Pieces_jointes`, `Infos_utilisateurs`), le widget les détecte et les utilise directement. Les catégories, tags et statuts Kanban personnalisés ne sont pas stockés dans des tables séparées : ce sont des listes (nom + couleur) persistées dans `Parametres_widget`/`PM_Settings` et synchronisées en écriture seule vers les colonnes Grist natives (Choice / Choice List) pour un affichage natif correct.

La **Configuration avancée** (onglet Paramètres) permet de mapper ces tables/colonnes vers des tables déjà existantes dans le document, si l'on préfère réutiliser des données existantes plutôt que laisser le widget créer les siennes.

## Note

Ce dépôt est la version propre destinée au déploiement client, construite à partir d'un widget communautaire Grist puis largement réécrite (migration en modules ES, RACI, notifications, automatisations, sécurité ACL, etc.).
