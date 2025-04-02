# API de Gestion de Profils
Une API RESTful pour gérer des profils utilisateurs avec leurs expériences, compétences et relations, développée avec Express.js et MongoDB.

Table des matières

- Fonctionnalités
- Prérequis
- Installation
- Configuration
- Lancement
- Documentation API

### Fonctionnalités

- Gestion complète des profils utilisateurs (CRUD)
- Gestion des expériences professionnelles
- Gestion des compétences
- Relations entre profils (amis)
- Recherche avancée par compétences, localisation ou nom
- Documentation API interactive avec Swagger
- Interface utilisateur simple pour explorer l'API
- Déploiement avec Docker

### Prérequis

- Node.js (v14+)
- MongoDB
- npm ou yarn
- Docker et Docker Compose

### Installation

Clonez le dépôt :

```
git clone https://github.com/salimskander/no-sql
```
Installez les dépendances :
```
npm install
```

### Configuration

Créez un fichier .env à la racine du projet avec les variables suivantes :
Si vous utilisez Docker, ces variables sont déjà configurées dans le fichier docker-compose.yml.

### Lancement
Méthode 1 : Avec Node.js
----
Pour lancer le serveur en mode développement (avec nodemon) :
```
npm run dev
```
Pour lancer le serveur en mode production :
```
npm start
```

Méthode 2 : Avec Docker Compose
----
Pour lancer l'application et la base de données MongoDB dans des conteneurs Docker :
```
docker-compose up
```
Pour exécuter en arrière-plan :
```
docker-compose up -d
```
Pour arrêter les conteneurs :
```
docker-compose down
```

### Documentation API

Une fois le serveur démarré, vous pouvez accéder à :

Interface principale : [interface de base](http://localhost:3000)

Documentation Swagger : [swagger](http://localhost:3000/api-docs)

La documentation Swagger vous permet de tester tous les endpoints directement depuis votre navigateur.