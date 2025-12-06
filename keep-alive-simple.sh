#!/bin/bash

# Script de maintien en vie simple pour SENTERANGA Backend
# Ping automatique toutes les 10 minutes pour éviter la mise en veille Render
#
# Utilisation: ./keep-alive-simple.sh [URL_DU_SERVEUR]
# Exemple en arrière-plan: nohup ./keep-alive-simple.sh https://senteranga-backend.onrender.com &

# Configuration par défaut
DEFAULT_URL="https://senteranga-backend.onrender.com"
SERVER_URL="${1:-$DEFAULT_URL}"
LOG_FILE="keep-alive.log"
INTERVAL=600  # 10 minutes en secondes

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction de logging
log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

# Fonction de logging d'erreur
error_log() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1" | tee -a "$LOG_FILE"
}

# Fonction de ping
ping_server() {
    local url="$1"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    # Test de connectivité avec curl
    if curl -f -s --max-time 10 "$url" > /dev/null 2>&1; then
        log "✅ Ping réussi - $url"
        return 0
    else
        error_log "❌ Ping échoué - $url"
        return 1
    fi
}

# Fonction pour afficher l'aide
show_help() {
    echo -e "${BLUE}Script de maintien en vie pour SENTERANGA Backend${NC}"
    echo ""
    echo "Usage:"
    echo "  $0 [URL]                    # Ping automatique toutes les 10 minutes"
    echo "  $0 --test [URL]            # Test unique"
    echo "  $0 --help                  # Afficher cette aide"
    echo ""
    echo "Exemples:"
    echo "  $0 https://senteranga-backend.onrender.com"
    echo "  $0 --test https://senteranga-backend.onrender.com"
    echo "  nohup $0 https://senteranga-backend.onrender.com &"
    echo ""
    echo "Configuration:"
    echo "  URL par défaut: $DEFAULT_URL"
    echo "  Intervalle: 10 minutes ($INTERVAL secondes)"
    echo "  Log: $LOG_FILE"
}

# Fonction de test unique
test_once() {
    local url="$1"
    echo -e "${BLUE}🧪 Test unique du serveur: $url${NC}"
    echo "─" $(printf '%.0s-' {1..50})
    
    if ping_server "$url"; then
        echo -e "${GREEN}✅ Test réussi !${NC}"
        return 0
    else
        echo -e "${RED}❌ Test échoué !${NC}"
        return 1
    fi
}

# Fonction principale de ping continu
start_keep_alive() {
    local url="$1"
    local ping_count=0
    local failed_count=0
    
    echo -e "${BLUE}🚀 Démarrage du service de maintien en vie${NC}"
    echo -e "${BLUE}🎯 URL cible:${NC} $url"
    echo -e "${BLUE}⏰ Intervalle:${NC} 10 minutes"
    echo -e "${BLUE}📋 Log:${NC} $LOG_FILE"
    echo "─" $(printf '%.0s-' {1..50})
    
    # Premier ping immédiat
    ping_count=$((ping_count + 1))
    if ping_server "$url"; then
        failed_count=0
    else
        failed_count=$((failed_count + 1))
    fi
    
    # Boucle principale
    while true; do
        sleep $INTERVAL
        
        ping_count=$((ping_count + 1))
        log "🔄 Ping #$ping_count"
        
        if ping_server "$url"; then
            failed_count=0
            log "📊 Statut: OK (Échecs consécutifs: $failed_count)"
        else
            failed_count=$((failed_count + 1))
            error_log "📊 Statut: ÉCHEC (Échecs consécutifs: $failed_count)"
            
            # Alerte si trop d'échecs consécutifs
            if [ $failed_count -ge 5 ]; then
                error_log "🚨 ALERTE: 5 échecs consécutifs détectés !"
                error_log "🔍 Vérifiez: URL, connectivité réseau, statut du serveur Render"
            fi
        fi
        
        # Reset du compteur d'échecs après un succès
        if ping_server "$url"; then
            failed_count=0
        fi
        
        # Affichage périodique du statut (toutes les heures)
        if [ $((ping_count % 6)) -eq 0 ]; then
            log "📈 Résumé: $ping_count pings effectués"
        fi
    done
}

# Gestion de l'interruption Ctrl+C
trap 'echo -e "\n${YELLOW}🛑 Interruption détectée. Arrêt du service...${NC}"; exit 0' INT

# Gestion des arguments
case "${1:-}" in
    --help|-h)
        show_help
        exit 0
        ;;
    --test)
        test_once "${2:-$DEFAULT_URL}"
        exit $?
        ;;
    *)
        if [ -n "$1" ] && [[ ! "$1" =~ ^-- ]]; then
            SERVER_URL="$1"
        fi
        
        log "🎯 Démarrage avec l'URL: $SERVER_URL"
        start_keep_alive "$SERVER_URL"
        ;;
esac