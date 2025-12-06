# Guide UptimeRobot - Maintien en Vie Automatique

## 🎯 Introduction

UptimeRobot est un service de monitoring gratuit qui peut maintenir votre serveur Render actif en envoyant des requêtes automatiques. Cette solution est **idéale** car elle ne nécessite aucun script local et fonctionne 24h/24.

## 📊 Avantages UptimeRobot

✅ **100% gratuit**  
✅ **Monitoring 24h/24**  
✅ **Aucune installation locale**  
✅ **Alertes par email/SMS**  
✅ **Tableau de bord complet**  
✅ **Fonctionne même si votre ordinateur est éteint**  

## 🚀 Configuration Étape par Étape

### 1. Création du Compte

1. Aller sur **https://uptimerobot.com**
2. Cliquer sur **"Sign Up Free"**
3. Se connecter avec Google, Microsoft ou email
4. Vérifier l'email de confirmation

### 2. Ajout du Premier Monitor

1. **Dashboard UptimeRobot** → **"Add New Monitor"**

2. **Type de Monitor** : **"HTTP(s)"**

3. **URL** : `https://senteranga-backend.onrender.com`

4. **Monitoring Interval** : **"5 Minutes"** ⚠️ **Important pour Render**

5. **Timeout** : **30 seconds**

6. **Keyword Monitoring** :
   - Cocher **"Keyword Monitoring"**
   - Keyword: `SENTERANGA Backend API`
   - Location: `anywhere`

7. **Notifications** :
   - Email: Votre adresse email
   - SMS: Si configuré

### 3. Configuration Avancée

```
Monitor Settings:
├── Monitor Type: HTTP(s)
├── URL: https://senteranga-backend.onrender.com
├── Monitoring Interval: 5 minutes
├── Timeout: 30 seconds
├── HTTP Method: GET
├── Keyword to Monitor: "SENTERANGA Backend API"
└── Default Keyword Location: anywhere
```

### 4. Ajout de Monitors Supplémentaires

**API Endpoints à monitorer :**

1. **Monitor Principal** :
   - URL: `https://senteranga-backend.onrender.com`
   - Keyword: `SENTERANGA Backend API`

2. **Monitor API Users** :
   - URL: `https://senteranga-backend.onrender.com/api/users`
   - Keyword: `[`

3. **Monitor API Products** :
   - URL: `https://senteranga-backend.onrender.com/api/products`
   - Keyword: `[`

## 📱 Configuration des Alertes

### Types d'Alertes Disponibles

1. **Email** (Gratuit)
2. **SMS** (500 SMS/mois gratuit)
3. **Push Notification** (Mobile app)
4. **Webhook** (API calls)

### Configuration Email

```
Alert Contacts:
├── Primary: Votre email
├── Format: Digest (weekly summary)
└── Response: Immediate
```

### Configuration SMS (Optionnel)

1. Aller dans **"My Settings"** → **"Alert Contacts"**
2. Cliquer **"Add New Alert Contact"** → **"SMS"**
3. Entrer le numéro avec code pays
4. Confirmer par SMS

## 📊 Dashboard et Monitoring

### Métriques Disponibles

- **Uptime** : Pourcentage de disponibilité
- **Response Time** : Temps de réponse moyen
- **Downtime** : Temps d'indisponibilité total
- **Alerts** : Historique des alertes

### Rapport Hebdomadaire

UptimeRobot envoie automatiquement un résumé :
- Statut de tous les monitors
- Temps de réponse moyen
- Nombre d'incidents
- Pourcentage de disponibilité

## 🔧 Configuration Avancée

### Multiple Endpoints

Pour une surveillance complète, ajouter ces monitors :

```
Monitors List:
1. Root: https://senteranga-backend.onrender.com
2. API: https://senteranga-backend.onrender.com/api/
3. Users: https://senteranga-backend.onrender.com/api/users
4. Products: https://senteranga-backend.onrender.com/api/products
5. Regions: https://senteranga-backend.onrender.com/api/regions
```

### Paramètres Recommandés

```
Global Settings:
├── Default Interval: 5 minutes
├── Default Timeout: 30 seconds
├── Log Retention: 90 days
└── Status Page: Public
```

## 🎛️ Configuration via API (Optionnel)

Pour automatiser la configuration :

```bash
# Créer un monitor via API
curl -X POST "https://api.uptimerobot.com/v2/newMonitor" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "api_key=VOTRE_API_KEY&format=json&type=1&url=https://senteranga-backend.onrender.com&keyword=API&interval=300"
```

## 🔍 Test et Validation

### 1. Vérification du Monitor

1. Aller dans **"Monitors"**
2. Cliquer sur votre monitor
3. Vérifier le statut : **"Up"**

### 2. Test des Alertes

1. **Arrêter temporairement** votre serveur local
2. Attendre 5-15 minutes
3. Vérifier qu'une alerte est envoyée

### 3. Dashboard Verification

```bash
# Test manuel avec curl
curl https://senteranga-backend.onrender.com
# Doit retourner la réponse de l'API
```

## 💰 Plans et Limites

### Plan Gratuit
- ✅ 50 monitors
- ✅ Intervalle minimum 5 minutes
- ✅ 500 alertes SMS/mois
- ✅ 9 mois d'historique

### Plan Personal ($9/mois)
- ✅ Monitors illimités
- ✅ Intervalle minimum 1 minute
- ✅ Alertes SMS illimitées
- ✅ 2 ans d'historique

## 🚨 Dépannage

### Monitor En Erreur

1. **Vérifier l'URL** :
   ```bash
   curl -I https://senteranga-backend.onrender.com
   ```

2. **Vérifier le Keyword** :
   - Le keyword doit exister dans la réponse
   - Tester avec différents mots-clés

3. **Vérifier les timeouts** :
   - Augmenter à 60 secondes si nécessaire

### Alertes Non Reçues

1. **Vérifier les contacts d'alerte**
2. **Vérifier le dossier spam**
3. **Tester les alertes manuellement**

## 📈 Bonnes Pratiques

### 1. Multiple Monitors
- Monitorer plusieurs endpoints
- Différents types de requêtes

### 2. Alertes Appropriées
- Email pour problèmes majeurs
- SMS pour urgence uniquement

### 3. Vérification Régulière
- Tester le monitoring chaque semaine
- Vérifier la précision des alertes

### 4. Documentation
- Noter la configuration dans un document
- Partager avec l'équipe si nécessaire

## 🔗 Liens Utiles

- **Site UptimeRobot** : https://uptimerobot.com
- **API Documentation** : https://uptimerobot.com/api/
- **Mobile App** : iOS/Android stores
- **Status Page** : Créer une page publique de statut

## 📞 Support

- **Documentation** : https://uptimerobot.com/help/
- **Community Forum** : https://community.uptimerobot.com/
- **Contact** : support@uptimerobot.com

---

**🎯 Résultat Final** : Votre serveur Render restera actif 24h/24 grâce au monitoring automatique UptimeRobot !