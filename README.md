# SENTERANGA Backend - JSON Server

Backend API pour la plateforme SENTERANGA utilisant JSON Server.

## 🚀 Installation & Démarrage

### Local
```bash
# Installer dépendances
npm install

# Démarrer le serveur
npm start

# Dev avec auto-reload (nodemon)
npm run dev
```

Le serveur sera disponible à: `http://localhost:3004/api`

## 📦 Déploiement sur Render

### 1. Prérequis
- Compte Render (render.com)
- Ce repository en Git

### 2. Configuration Render
```
- Service Type: Web Service
- Runtime: Node
- Build Command: npm install
- Start Command: npm start
- Environment Variable: PORT=3004
```

### 3. Endpoints API

Une fois déployé, l'API sera accessible à:
```
https://votre-service-render.onrender.com/api
```

**Collections principales:**
- `/api/users` - Utilisateurs
- `/api/products` - Produits
- `/api/seeds` - Semences
- `/api/regions` - Régions du Sénégal
- `/api/notifications` - Notifications
- `/api/policies` - Politiques gouvernementales
- `/api/userTypes` - Types d'utilisateurs
- `/api/orders` - Commandes

### 4. Utilisation dans Angular

**data.service.ts:**
```typescript
private apiUrl = 'https://votre-service-render.onrender.com/api';
```

### 5. Notes Importantes
- ✅ CORS activé pour toutes les origins
- ✅ Support des méthodes: GET, POST, PUT, DELETE, PATCH
- ✅ Port dynamique depuis env variable PORT
- ✅ db.json persiste les données en développement

## 📝 Structure db.json

Le fichier `db.json` doit contenir toutes les collections:
- regions
- userTypes
- users
- clientTypes
- investorTypes
- ministries
- structures
- certifications
- products
- seeds
- seedOrders
- notifications
- policies
- agronomeAlerts
- orders

## 🔧 Troubleshooting

### Port déjà utilisé
```bash
# Linux/Mac
lsof -i :3004
kill -9 <PID>

# Windows
netstat -ano | findstr :3004
taskkill /PID <PID> /F
```

### Erreur CORS
Assurez-vous que le serveur inclut les headers CORS:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH
```

## 📚 Ressources
- [JSON Server Docs](https://github.com/typicode/json-server)
- [Render Docs](https://render.com/docs)
