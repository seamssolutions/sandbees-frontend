# Sandbees Frontend

Ce dépôt contient le frontend de l'application Sandbees Dashboard, une interface utilisateur moderne pour la gestion d'entreprise avec intégration d'agents IA.

## Fonctionnalités

- Interface utilisateur moderne avec design en verre (glassmorphism)
- Tableau de bord avec métriques clés de performance
- Gestion des tâches
- Gestion financière
- Gestion des clients
- Assistant IA avec plusieurs agents spécialisés
- Intégration avec le backend déployé sur Railway

## Prérequis

- Node.js 16+
- npm ou yarn

## Installation

1. Cloner le dépôt
```bash
git clone https://github.com/votre-organisation/sandbees-frontend.git
cd sandbees-frontend
```

2. Installer les dépendances
```bash
npm install
```

3. Créer un fichier `.env` à la racine du projet avec le contenu suivant:
```
REACT_APP_API_URL=https://sandbees-dashboard-production.up.railway.app
REACT_APP_ENV=production
REACT_APP_VERSION=1.0.0
```

## Développement

Pour lancer l'application en mode développement:

```bash
npm start
```

L'application sera disponible à l'adresse [http://localhost:3000](http://localhost:3000).

## Build

Pour créer une version de production:

```bash
npm run build
```

Les fichiers de build seront générés dans le dossier `build`.

## Déploiement sur Railway

1. Connectez-vous à [Railway](https://railway.app/)
2. Créez un nouveau projet
3. Sélectionnez "Deploy from GitHub repo"
4. Sélectionnez ce dépôt
5. Railway détectera automatiquement qu'il s'agit d'une application React et la déploiera

## Structure du projet

```
sandbees-frontend/
├── public/                 # Fichiers statiques
├── src/                    # Code source
│   ├── components/         # Composants React
│   │   ├── AIAssistant/    # Composants pour l'assistant IA
│   │   ├── Dashboard/      # Composants pour le tableau de bord
│   │   ├── ...
│   ├── services/           # Services pour l'intégration API
│   ├── tests/              # Tests unitaires et d'intégration
│   ├── App.tsx             # Composant principal
│   └── index.tsx           # Point d'entrée
├── .env                    # Variables d'environnement
├── .gitignore              # Fichiers ignorés par Git
├── package.json            # Dépendances et scripts
├── tailwind.config.js      # Configuration Tailwind CSS
└── tsconfig.json           # Configuration TypeScript
```

## Communication avec le backend

Le frontend communique avec le backend déployé à l'adresse `https://sandbees-dashboard-production.up.railway.app` via le service `AIIntegrationService`. Ce service gère les requêtes API et fournit des données simulées en mode développement.

## Licence

MIT
