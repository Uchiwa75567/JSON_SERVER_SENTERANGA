# 🌾 SENTERANGA Backend API

> Backend API REST pour la plateforme SENTERANGA - Révolution numérique de l'agriculture sénégalaise

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![JSON Server](https://img.shields.io/badge/JSON--Server-0.17.3-blue.svg)](https://github.com/typicode/json-server)
[![Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7.svg)](https://render.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 Table des Matières

- [🌟 Vue d'ensemble](#-vue-densemble)
- [🚀 Installation & Démarrage](#-installation--démarrage)
- [📡 API Endpoints](#-api-endpoints)
- [🗄️ Structure des Données](#️-structure-des-données)
- [👥 Types d'Utilisateurs](#-types-dutilisateurs)
- [📦 Déploiement](#-déploiement)
- [🔧 Scripts de Maintien](#-scripts-de-maintien)
- [🧪 Tests & Validation](#-tests--validation)
- [🔍 Monitoring](#-monitoring)
- [🐛 Dépannage](#-dépannage)
- [📚 Ressources](#-ressources)

## 🌟 Vue d'ensemble

SENTERANGA est une plateforme digitale révolutionnaire qui connecte les agriculteurs sénégalais aux marchés locaux et internationaux. Ce backend fournit une API REST complète pour gérer :

- 👨‍🌾 **Agriculteurs** : Gestion des profils, produits et ventes
- 🛒 **Clients** : Achats de produits frais et locaux
- 💰 **Investisseurs** : Opportunités d'investissement agricole
- 👨‍🔬 **Agronomes** : Conseils et alertes agricoles
- 🏛️ **État** : Politiques et subventions
- 👑 **Administrateurs** : Gestion de la plateforme

### 🏗️ Architecture Technique

- **Framework** : JSON Server (Node.js)
- **Base de données** : JSON file (`db.json`)
- **CORS** : Activé pour toutes les origines
- **Port dynamique** : Support des variables d'environnement
- **Méthodes HTTP** : GET, POST, PUT, DELETE, PATCH

## 🚀 Installation & Démarrage

### Prérequis

- Node.js 18+
- npm ou yarn
- Git

### Installation Locale

```bash
# Cloner le repository
git clone https://github.com/votre-username/senteranga-backend.git
cd senteranga-backend

# Installer les dépendances
npm install

# Démarrer le serveur en mode développement (avec auto-reload)
npm run dev

# Ou démarrer en mode production
npm start
```

### 🌐 URLs d'Accès

| Environnement | URL | Statut |
|---------------|-----|--------|
| **Local** | `http://localhost:3004/api` | ✅ Développement |
| **Production** | `https://json-server-senteranga.onrender.com/api` | ✅ En ligne |

### 📊 Vérification du Démarrage

```bash
# Test de l'API racine
curl http://localhost:3004/

# Doit retourner :
{
  "message": "SENTERANGA Backend API",
  "version": "1.0.0",
  "endpoints": "http://localhost:3004/api/users, /api/products, /api/seeds, etc."
}
```

## 📡 API Endpoints

### 🔐 Authentification

**Note** : Cette version utilise une authentification basique. En production, implémentez JWT ou OAuth.

### 👥 Gestion des Utilisateurs

```http
# Récupérer tous les utilisateurs
GET /api/users

# Récupérer un utilisateur par ID
GET /api/users/{id}

# Créer un nouvel utilisateur
POST /api/users
Content-Type: application/json

{
  "email": "agriculteur@example.com",
  "password": "motdepasse",
  "userType": "agriculteur",
  "firstName": "Modou",
  "lastName": "Fall",
  "phone": "781234567",
  "region": "fatick",
  "department": "Fatick",
  "village": "Keur Massar"
}

# Mettre à jour un utilisateur
PUT /api/users/{id}

# Supprimer un utilisateur
DELETE /api/users/{id}
```

### 🛒 Produits Agricoles

```http
# Lister tous les produits
GET /api/products

# Produits par catégorie
GET /api/products?categorie=Légumes

# Produits par région
GET /api/products?region=fatick

# Produits disponibles uniquement
GET /api/products?statutDisponibilite=disponible

# Créer un produit
POST /api/products
Content-Type: application/json

{
  "agriculteurId": "user-123",
  "titre": "Tomates Bio",
  "description": "Tomates cultivées sans pesticides",
  "categorie": "Légumes",
  "quantite": 1000,
  "prix": 250000,
  "prixParUnite": 250,
  "unite": "kg",
  "localisation": "Fatick",
  "images": ["/images/products/tomatoes.jpg"],
  "statutValidation": "en_attente"
}
```

### 🌱 Semences

```http
# Catalogue des semences
GET /api/seeds

# Semences par catégorie
GET /api/seeds?category=cereales

# Semences certifiées
GET /api/seeds?certification=certifié

# Commander des semences
POST /api/seedOrders
Content-Type: application/json

{
  "userId": "user-123",
  "seedId": "1",
  "seedName": "Riz NERICA",
  "quantity": 50,
  "total": 250000
}
```

### 📍 Régions & Localisation

```http
# Toutes les régions
GET /api/regions

# Région spécifique
GET /api/regions/dakar

# Départements d'une région
GET /api/regions/thies
```

### 🔔 Notifications

```http
# Notifications d'un utilisateur
GET /api/notifications?userId=user-123

# Marquer comme lue
PUT /api/notifications/{id}
Content-Type: application/json

{
  "read": true
}
```

### 📋 Politiques & Subventions

```http
# Politiques gouvernementales
GET /api/policies

# Subventions disponibles
GET /api/subventions?status=active

# Opportunités d'investissement
GET /api/investmentOpportunities?status=active
```

### 🚨 Alertes Agronomes

```http
# Alertes actives
GET /api/agronomeAlerts

# Alertes par région
GET /api/agronomeAlerts?regions=Tambacounda

# Alertes par sévérité
GET /api/agronomeAlerts?severity=high
```

## 🗄️ Structure des Données

### Collections Principales

| Collection | Description | Clés |
|------------|-------------|------|
| `users` | Utilisateurs de la plateforme | `id`, `email`, `userType`, `region` |
| `products` | Produits agricoles | `id`, `agriculteurId`, `titre`, `categorie` |
| `seeds` | Catalogue de semences | `id`, `name`, `category`, `price` |
| `regions` | Régions administratives | `id`, `name`, `departements[]` |
| `notifications` | Notifications utilisateurs | `id`, `userId`, `type`, `read` |
| `policies` | Politiques gouvernementales | `id`, `title`, `category`, `date` |
| `agronomeAlerts` | Alertes agricoles | `id`, `title`, `regions[]`, `severity` |
| `orders` | Commandes de produits | `id`, `buyerId`, `products[]`, `status` |
| `seedOrders` | Commandes de semences | `id`, `userId`, `seedId`, `quantity` |

### Relations entre Collections

```
users (1) ──── (N) products
users (1) ──── (N) notifications
users (1) ──── (N) orders
regions (1) ──── (N) users
regions (1) ──── (N) products
```

## 👥 Types d'Utilisateurs

### 👨‍🌾 Agriculteur/Producteur
```json
{
  "userType": "agriculteur",
  "requiredFields": ["region", "departement", "village", "idCard"],
  "dashboard": "/dashboard-agriculteur"
}
```

### 🛒 Client Acheteur
```json
{
  "userType": "client",
  "requiredFields": ["clientType", "idCard"],
  "dashboard": "/dashboard-client"
}
```

### 👨‍🔬 Agronome/Conseiller
```json
{
  "userType": "agronome",
  "requiredFields": ["emailPro", "structure", "regionsIntervention", "idCard"],
  "dashboard": "/dashboard-agronome"
}
```

### 💰 Investisseur
```json
{
  "userType": "investisseur",
  "requiredFields": ["email", "investorType", "montantInvestissement"],
  "dashboard": "/dashboard-investisseur"
}
```

### 🏛️ État/Gouvernement
```json
{
  "userType": "etat",
  "requiredFields": ["governmentId", "ministry", "department"],
  "dashboard": "/dashboard-etat"
}
```

### 👑 Administrateur
```json
{
  "userType": "admin",
  "requiredFields": ["adminCode", "department"],
  "dashboard": "/dashboard-admin"
}
```

## 🔐 Informations de Connexion

### 👨‍🌾 **Agriculteur (Test)**
```json
{
  "phone": "785052217",
  "password": "123456",
  "userType": "agriculteur",
  "firstName": "Mamadou",
  "lastName": "DIAME"
}
```

### 👑 **Administrateur**
```json
{
  "email": "admin@senteranga.local",
  "password": "111111",
  "userType": "admin",
  "adminCode": "ADM001"
}
```

### 🏛️ **Institutionnel/État**
```json
{
  "phone": "768257601",
  "password": "111111",
  "userType": "etat",
  "governmentId": "MIN_AGR_001",
  "ministry": "agriculture"
}
```

### 📋 **Comptes de Test Disponibles**
- **Agriculteur** : `785052217` / `123456`
- **Admin** : `admin@senteranga.local` / `111111`
- **Institution** : `768257601` / `111111`

## � Déploiement

### 🚀 Déploiement sur Render (Recommandé)

1. **Créer un compte** sur [render.com](https://render.com)

2. **Connecter le repository GitHub**

3. **Configuration du service** :
   ```
   Service Type    : Web Service
   Runtime         : Node
   Build Command   : npm install
   Start Command   : npm start
   Environment     : NODE_ENV=production
   Port            : 10000 (ou PORT dynamique)
   ```

4. **Variables d'environnement** :
   ```bash
   NODE_ENV=production
   PORT=10000
   CORS_ORIGIN=*
   ```

### 🔄 Autres Options de Déploiement

- **Railway** : `railway init && railway up`
- **Fly.io** : `fly launch && fly deploy`
- **Vercel** : `npm install -g vercel && vercel --prod`

## 🔧 Scripts de Maintien

### 🐛 Problème du Plan Gratuit Render

Les services Render gratuits se mettent en veille après 15 minutes d'inactivité.

### ✅ Solutions Implémentées

#### 1. **UptimeRobot (RECOMMANDÉ)** ⭐
```bash
# Configuration automatique toutes les 5 minutes
# Fonctionne 24h/24 même ordinateur éteint
```

#### 2. **Script Node.js**
```bash
# Installation
npm install node-cron

# Démarrage du ping automatique
npm run keep-alive https://json-server-senteranga.onrender.com

# Test unique
npm run keep-alive:test https://json-server-senteranga.onrender.com
```

#### 3. **Script Bash**
```bash
# Rendre exécutable
chmod +x keep-alive-simple.sh

# Démarrage continu
./keep-alive-simple.sh https://json-server-senteranga.onrender.com

# Test unique
./keep-alive-simple.sh --test https://json-server-senteranga.onrender.com
```

## 🧪 Tests & Validation

### Tests Automatisés

```bash
# Test du déploiement
chmod +x test-deployment.sh
./test-deployment.sh https://json-server-senteranga.onrender.com
```

### Tests Manuels

```bash
# Test de l'API racine
curl https://json-server-senteranga.onrender.com/

# Test des utilisateurs
curl https://json-server-senteranga.onrender.com/api/users

# Test des produits
curl https://json-server-senteranga.onrender.com/api/products

# Test des régions
curl https://json-server-senteranga.onrender.com/api/regions
```

### Validation des Données

- ✅ **Utilisateurs** : Champs requis selon le type
- ✅ **Produits** : Validation des prix et quantités
- ✅ **Commandes** : Vérification des stocks
- ✅ **Régions** : Conformité géographique sénégalaise

## 🔍 Monitoring

### Métriques Disponibles

- **Uptime** : Temps de disponibilité
- **Response Time** : Latence des requêtes
- **Error Rate** : Taux d'erreurs
- **Active Users** : Utilisateurs connectés

### Logs Applicatifs

```bash
# Logs en temps réel
tail -f keep-alive.log

# Logs Render (dashboard)
# Aller dans : Dashboard → Service → Logs
```

### Alertes

- 🚨 **UptimeRobot** : Alertes email/SMS
- 📧 **Email** : Problèmes critiques
- 📱 **SMS** : Interruptions de service

## 🐛 Dépannage

### Problèmes Courants

#### Port Déjà Utilisé
```bash
# Linux/Mac
lsof -i :3004
kill -9 <PID>

# Windows
netstat -ano | findstr :3004
taskkill /PID <PID> /F
```

#### Erreur CORS
```javascript
// Vérifier server.js
server.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));
```

#### Service en Veille (Render)
```bash
# Test manuel
curl https://json-server-senteranga.onrender.com

# Redémarrer UptimeRobot
# Ou utiliser les scripts keep-alive
```

#### Données Non Persistantes
```json
// db.json doit être dans le repository
// Les modifications sont sauvegardées automatiquement
```

### Commandes de Debug

```bash
# Vérifier la santé du service
curl -I https://json-server-senteranga.onrender.com

# Test des endpoints principaux
curl https://json-server-senteranga.onrender.com/api/users | jq '.'

# Vérifier les logs
npm run dev  # Mode développement avec logs détaillés
```

## 📚 Ressources

### Documentation

- [📖 JSON Server Docs](https://github.com/typicode/json-server)
- [🚀 Render Documentation](https://render.com/docs)
- [🔧 Node.js Guide](https://nodejs.org/en/docs/)

### Outils Recommandés

- **Postman** : Test des API REST
- **Insomnia** : Alternative à Postman
- **UptimeRobot** : Monitoring 24h/24
- **GitHub Actions** : CI/CD automatisé

### Liens Utiles

- 🌐 **API Live** : https://json-server-senteranga.onrender.com
- 📊 **Dashboard Render** : https://dashboard.render.com
- 🔍 **UptimeRobot** : https://uptimerobot.com
- 📱 **GitHub Repository** : https://github.com/votre-username/senteranga-backend

---

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

- 📧 **Email** : support@senteranga.sn
- 🐛 **Issues** : [GitHub Issues](https://github.com/votre-username/senteranga-backend/issues)
- 💬 **Discord** : [SENTERANGA Community](https://discord.gg/senteranga)

---

**🎯 SENTERANGA** - Connecter l'agriculture sénégalaise au monde numérique ! 🌾🇸🇳
