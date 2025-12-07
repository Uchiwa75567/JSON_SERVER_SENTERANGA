#!/usr/bin/env node

/**
 * Script de maintien en vie du serveur SENTERANGA sur Render
 * Envoie un ping HTTP toutes les 5 minutes pour éviter la mise en veille
 * 
 * Utilisation:
 *   node keep-render-alive.js                                    # Ping toutes les 5 minutes
 *   node keep-render-alive.js https://your-render-url.com       # Avec URL personnalisée
 *   node keep-render-alive.js --test https://your-render-url    # Test unique
 */

const https = require('https');
const http = require('http');
const cron = require('node-cron');

// Configuration
const RENDER_URL = process.env.RENDER_URL || process.argv[2] || 'https://json-server-senteranga.onrender.com';
const PING_INTERVAL = '*/5 * * * *'; // Toutes les 5 minutes
const TIMEOUT = 15000; // 15 secondes
const LOG_PREFIX = '🔄 KEEP-ALIVE';

class RenderKeepAlive {
    constructor(url) {
        this.url = url;
        this.pingCount = 0;
        this.successCount = 0;
        this.errorCount = 0;
        this.lastPingTime = null;
        this.lastErrorTime = null;
    }

    /**
     * Effectue un ping vers le serveur
     */
    async ping() {
        return new Promise((resolve, reject) => {
            const urlObj = new URL(this.url);
            const client = urlObj.protocol === 'https:' ? https : http;
            const startTime = Date.now();

            const req = client.get(this.url, (res) => {
                const responseTime = Date.now() - startTime;
                
                if (res.statusCode >= 200 && res.statusCode < 400) {
                    this.successCount++;
                    resolve({
                        success: true,
                        statusCode: res.statusCode,
                        responseTime
                    });
                } else {
                    this.errorCount++;
                    reject(new Error(`HTTP ${res.statusCode}`));
                }
            });

            req.on('error', (error) => {
                this.errorCount++;
                reject(error);
            });

            req.setTimeout(TIMEOUT, () => {
                req.destroy();
                this.errorCount++;
                reject(new Error('Timeout'));
            });
        });
    }

    /**
     * Formate l'heure pour le log
     */
    getTimestamp() {
        return new Date().toLocaleString('fr-FR');
    }

    /**
     * Affiche un message de log
     */
    log(message, type = 'info') {
        const timestamp = this.getTimestamp();
        const icons = {
            success: '✅',
            error: '❌',
            info: 'ℹ️',
            warning: '⚠️'
        };
        console.log(`[${timestamp}] ${icons[type] || type} ${LOG_PREFIX}: ${message}`);
    }

    /**
     * Lance un ping et gère la réponse
     */
    async executePing() {
        this.pingCount++;
        
        try {
            const result = await this.ping();
            this.lastPingTime = new Date();
            
            const message = `Ping #${this.pingCount} réussi (${result.responseTime}ms - HTTP ${result.statusCode})`;
            this.log(message, 'success');
            
            return true;
        } catch (error) {
            this.lastErrorTime = new Date();
            const message = `Ping #${this.pingCount} échoué: ${error.message}`;
            this.log(message, 'error');
            
            return false;
        }
    }

    /**
     * Affiche les statistiques
     */
    showStats() {
        const successRate = this.pingCount > 0 
            ? ((this.successCount / this.pingCount) * 100).toFixed(1) 
            : '0.0';
        
        console.log('\n' + '='.repeat(60));
        console.log('📊 STATISTIQUES KEEP-ALIVE');
        console.log('='.repeat(60));
        console.log(`Total de pings: ${this.pingCount}`);
        console.log(`✅ Réussis: ${this.successCount}`);
        console.log(`❌ Échoués: ${this.errorCount}`);
        console.log(`📈 Taux de succès: ${successRate}%`);
        
        if (this.lastPingTime) {
            console.log(`⏰ Dernier succès: ${this.lastPingTime.toLocaleString('fr-FR')}`);
        }
        if (this.lastErrorTime) {
            console.log(`⚠️ Dernier erreur: ${this.lastErrorTime.toLocaleString('fr-FR')}`);
        }
        console.log('='.repeat(60) + '\n');
    }

    /**
     * Démarre le service de keep-alive
     */
    start() {
        console.clear();
        this.log('Service de maintien en vie démarré', 'info');
        console.log(`\n🎯 Configuration:`);
        console.log(`   URL: ${this.url}`);
        console.log(`   Intervalle: 5 minutes`);
        console.log(`   Timeout: ${TIMEOUT}ms`);
        console.log(`   Heure actuelle: ${this.getTimestamp()}`);
        console.log(`\n💡 Le serveur Render restera actif 24h/24 🚀\n`);

        // Premier ping immédiat
        this.executePing();

        // Tâche cron toutes les 5 minutes
        cron.schedule(PING_INTERVAL, () => {
            this.executePing();
        });

        // Affichage des stats toutes les 30 minutes
        setInterval(() => {
            this.showStats();
        }, 30 * 60 * 1000);

        // Gestion Ctrl+C
        process.on('SIGINT', () => {
            console.log('\n');
            this.log('Arrêt du service demandé', 'warning');
            this.showStats();
            process.exit(0);
        });
    }

    /**
     * Mode test: un seul ping
     */
    async test() {
        this.log(`Test de ${this.url}...`, 'info');
        const success = await this.executePing();
        
        if (success) {
            this.log('Test réussi!', 'success');
            process.exit(0);
        } else {
            this.log('Test échoué!', 'error');
            process.exit(1);
        }
    }
}

// === POINT D'ENTRÉE ===
const args = process.argv.slice(2);
let url = RENDER_URL;
let testMode = false;

// Parser les arguments
for (let i = 0; i < args.length; i++) {
    if (args[i] === '--test' || args[i] === '-t') {
        testMode = true;
        if (args[i + 1] && !args[i + 1].startsWith('-')) {
            url = args[i + 1];
        }
    } else if (!args[i].startsWith('-') && !testMode) {
        url = args[i];
    }
}

// Créer et lancer le service
const keepAlive = new RenderKeepAlive(url);

if (testMode) {
    keepAlive.test();
} else {
    keepAlive.start();
}
