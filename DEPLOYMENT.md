# Guide de Déploiement SENTERANGA Backend sur Render

## 📋 Prérequis

- Compte GitHub
- Compte Render (gratuit sur https://render.com)
- Repository GitHub avec le code du projet

## 🚀 Étapes de Déploiement

### 1. Préparation du Repository

1. **Créer un nouveau repository sur GitHub** :
   - Nom : `senteranga-backend`
   - Visibilité : Public (pour le plan gratuit Render)

2. **Pousser le code vers GitHub** :
   ```bash
   git init
   git add .
   git commit -m "Initial commit: SENTERANGA backend"
   git branch -M main
   git remote add origin https://github.com/VOTRE_USERNAME/senteranga-backend.git
   git push -u origin main
   ```

### 2. Configuration sur Render

1. **Connexion à Render** :
   - Aller sur https://render.com
   - Se connecter avec le compte GitHub

2. **Créer un nouveau Web Service** :
   - Cliquer sur "New +" → "Web Service"
   - Connecter le repository GitHub

3. **Configuration du Service** :
   - **Name**: `senteranga-backend`
   - **Region**: Europe (Frankfurt) [le plus proche du Sénégal]
   - **Branch**: `main`
   - **Root Directory**: (laisser vide)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Variables d'Environnement** :
   Ajouter les variables suivantes dans l'onglet "Environment" :

   ```
   NODE_ENV=production
   PORT=10000
   CORS_ORIGIN=*
   ```

### 3. Configuration des Ressources

Pour le plan gratuit Render :
- **Instance Type**: Free
- **Auto-Deploy**: Activé
- Le service se mettra en veille après 15 minutes d'inactivité

### 4. Déploiement

1. Cliquer sur "Create Web Service"
2. Render va automatiquement :
   - Cloner le repository
   - Installer les dépendances
   - Démarrer l'application
   - Vous fournir une URL publique

## 🔧 Configuration Post-Déploiement

### URL de l'API
Votre API sera disponible à l'adresse :
```
https://senteranga-backend.onrender.com
```

### Endpoints Disponibles
- **Racine**: `https://senteranga-backend.onrender.com/`
- **API JSON Server**: `https://senteranga-backend.onrender.com/api/`

### Exemples d'Endpoints
```bash
# Récupérer tous les utilisateurs
GET https://senteranga-backend.onrender.com/api/users

# Récupérer tous les produits
GET https://senteranga-backend.onrender.com/api/products

# Récupérer les régions
GET https://senteranga-backend.onrender.com/api/regions

# Créer un nouvel utilisateur
POST https://senteranga-backend.onrender.com/api/users
```

## 🔍 Surveillance et Logs

### Accès aux Logs
1. Aller sur le dashboard Render
2. Cliquer sur votre service
3. Onglet "Logs" pour voir les logs en temps réel

### Métriques
- Utilisation CPU/RAM
- Nombre de requêtes
- Temps de réponse
- Statut de santé du service

## 🛠️ Maintenance

### Redéploiement
- Automatique à chaque push sur la branche `main`
- Manuel via le bouton "Deploy" dans le dashboard

### Sauvegarde des Données
⚠️ **Important** : Les données dans `db.json` ne sont pas persistantes sur Render
- Pour la production, considérer une base de données (PostgreSQL, MongoDB)
- Utiliser les fonctionnalités de backup de Render

## 🔒 Sécurité Production

### Recommandations
1. **Changer les mots de passe** par défaut dans `db.json`
2. **Configurer CORS** pour les domaines autorisés seulement
3. **Ajouter l'authentification** si nécessaire
4. **Utiliser HTTPS** (activé automatiquement par Render)

### Variables d'Environnement Sécurisées
Toutes les variables sensibles doivent être configurées dans Render, jamais dans le code.

## 🐛 Dépannage

### Problèmes Courants

**Service ne démarre pas** :
- Vérifier les logs dans Render
- S'assurer que `npm start` fonctionne localement
- Vérifier les variables d'environnement

**Erreur 503 Service Unavailable** :
- Le service est en veille (plan gratuit)
- Premier accès peut prendre 30 secondes
- Vérifier l'endpoint de santé

**CORS Errors** :
- Vérifier la variable `CORS_ORIGIN`
- Ajuster selon les domaines frontend

### Commandes de Test Local
```bash
# Tester localement
npm install
npm start

# Tester les endpoints
curl http://localhost:3004/api/users
```

## 📞 Support

En cas de problème :
1. Consulter les logs Render
2. Vérifier la documentation json-server
3. Tester localement avant de redéployer

## ⚡ Maintenir le Serveur Actif (Éviter la Mise en Veille)

### 🐛 Problème du Plan Gratuit Render
Les services gratuits Render se mettent en veille après **15 minutes d'inactivité**. Pour garder votre serveur actif, vous avez **3 solutions** :

### Solution 1: UptimeRobot (RECOMMANDÉE) ⭐

**✅ Avantages :**
- 100% automatique et gratuit
- Fonctionne 24h/24 même si votre ordinateur est éteint
- Monitoring complet avec alertes
- Configuration en 5 minutes

**📖 Guide complet :** Voir `UPTIMEROBOT-GUIDE.md`

**Configuration rapide :**
1. Aller sur https://uptimerobot.com
2. Créer un compte gratuit
3. Ajouter un monitor HTTP(s)
4. URL: `https://senteranga-backend.onrender.com`
5. Intervalle: 5 minutes
6. Keyword: `SENTERANGA Backend API`

### Solution 2: Script Node.js

**Installation :**
```bash
npm install node-cron
```

**Utilisation :**
```bash
# Test unique
npm run keep-alive:test

# Démarrage continu
npm run keep-alive https://senteranga-backend.onrender.com

# En arrière-plan
nohup npm run keep-alive https://senteranga-backend.onrender.com &
```

### Solution 3: Script Bash

**Rendre exécutable :**
```bash
chmod +x keep-alive-simple.sh
```

**Utilisation :**
```bash
# Test unique
./keep-alive-simple.sh --test https://senteranga-backend.onrender.com

# Démarrage continu
./keep-alive-simple.sh https://senteranga-backend.onrender.com

# En arrière-plan
nohup ./keep-alive-simple.sh https://senteranga-backend.onrender.com &
```

## 🔍 Test du Maintien en Vie

**Script de test :**
```bash
chmod +x test-deployment.sh
./test-deployment.sh https://senteranga-backend.onrender.com
```

**Test manuel :**
```bash
curl https://senteranga-backend.onrender.com
# Doit retourner une réponse JSON
```

## 🚨 Comparaison des Solutions

| Solution | Coût | Complexité | Fiabilité | 24h/24 |
|----------|------|------------|-----------|---------|
| **UptimeRobot** | Gratuit | ⭐ | ⭐⭐⭐⭐⭐ | ✅ |
| **Script Node.js** | Gratuit | ⭐⭐ | ⭐⭐⭐ | ⚠️ |
| **Script Bash** | Gratuit | ⭐⭐ | ⭐⭐⭐ | ⚠️ |

## 💡 Recommandation Finale

**Utilisez UptimeRobot** pour une solution professionnelle et fiable :
- ✅ Aucune configuration technique complexe
- ✅ Fonctionne même avec l'ordinateur éteint
- ✅ Alertes automatiques en cas de problème
- ✅ Monitoring professionnel avec historique

## 🔄 Mise à Jour

Pour mettre à jour l'application :
1. Modifier le code localement
2. Tester en local
3. Commit et push vers GitHub
4. Render redéploie automatiquement
5. **Redémarrer le monitoring** si nécessaire

---

**URL Finale**: `https://senteranga-backend.onrender.com`
**Date de création**: 2025-12-06
**Solutions de maintien en vie**: ✅ Configurées