# Widget Projet LaSuite pour Grist

Widget Grist centré sur la gestion de tâches avec :

- Kanban
- Gantt
- Équipe
- Paramètres

Design adapté à l'identité visuelle LaSuite.coop.

## Fichiers nécessaires

| Fichier | Rôle |
|---|---|
| `index.html` | Interface du widget |
| `widget.js` | Logique Grist, Kanban, Gantt, équipe et paramètres |
| `vercel.json` | Optionnel, utile seulement pour un déploiement Vercel |

## Déploiement GitHub Pages

1. Créer un nouveau dépôt GitHub.
2. Ajouter les fichiers de ce dossier à la racine du dépôt.
3. Activer GitHub Pages sur la branche `main`, dossier `/`.
4. Copier l'URL GitHub Pages dans une vue personnalisée Grist.
5. Donner au widget un accès complet au document.

## Note

Ce dossier est la version propre destinée au déploiement client. Le dossier d'origine téléchargé depuis la communauté Grist reste une source de référence.
