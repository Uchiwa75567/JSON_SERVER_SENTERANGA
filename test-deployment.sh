#!/bin/bash

# Script de test pour le déploiement SENTERANGA Backend
# Utilisation: ./test-deployment.sh https://your-app.onrender.com

if [ -z "$1" ]; then
    echo "❌ Usage: $0 <RENDER_APP_URL>"
    echo "Exemple: $0 https://json-server-senteranga.onrender.com"
    exit 1
fi

BASE_URL="$1"
API_URL="$BASE_URL/api"

echo "🧪 Test du déploiement SENTERANGA Backend"
echo "========================================"
echo ""

# Test de l'endpoint racine
echo "1. Test de l'endpoint racine..."
response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/")
if [ "$response" = "200" ]; then
    echo "✅ Endpoint racine OK (HTTP $response)"
else
    echo "❌ Endpoint racine échoué (HTTP $response)"
fi

# Test de l'API users
echo "2. Test de l'API /api/users..."
response=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/users")
if [ "$response" = "200" ]; then
    echo "✅ API Users OK (HTTP $response)"
    # Afficher le nombre d'utilisateurs
    user_count=$(curl -s "$API_URL/users" | grep -o '"id"' | wc -l)
    echo "   📊 Nombre d'utilisateurs: $user_count"
else
    echo "❌ API Users échoué (HTTP $response)"
fi

# Test de l'API products
echo "3. Test de l'API /api/products..."
response=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/products")
if [ "$response" = "200" ]; then
    echo "✅ API Products OK (HTTP $response)"
    # Afficher le nombre de produits
    product_count=$(curl -s "$API_URL/products" | grep -o '"id"' | wc -l)
    echo "   📊 Nombre de produits: $product_count"
else
    echo "❌ API Products échoué (HTTP $response)"
fi

# Test de l'API regions
echo "4. Test de l'API /api/regions..."
response=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/regions")
if [ "$response" = "200" ]; then
    echo "✅ API Regions OK (HTTP $response)"
    # Afficher le nombre de régions
    region_count=$(curl -s "$API_URL/regions" | grep -o '"id"' | wc -l)
    echo "   📊 Nombre de régions: $region_count"
else
    echo "❌ API Regions échoué (HTTP $response)"
fi

echo ""
echo "🎯 Test terminé!"
echo "📍 URL de base: $BASE_URL"
echo "🔗 API: $API_URL"

# Afficher quelques endpoints utiles
echo ""
echo "📚 Endpoints utiles:"
echo "   - Racine: $BASE_URL/"
echo "   - Users: $API_URL/users"
echo "   - Products: $API_URL/products"
echo "   - Regions: $API_URL/regions"
echo "   - Seeds: $API_URL/seeds"
echo "   - Notifications: $API_URL/notifications"