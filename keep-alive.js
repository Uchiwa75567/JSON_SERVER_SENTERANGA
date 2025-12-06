#!/usr/bin/env node

/**
 * Script de maintien en vie du serveur SENTERANGA Backend
 * Exécute un ping toutes les 10 minutes pour éviter la mise en veille Render
 * 
 * Utilisation: node keep-alive.js [URL_DU_SERVEUR]
 */

const cron = require('node-cron');
const https = require('https');
const http = require('http');

// Configuration
const DEFAULT_URL = process.env.RENDER_URL || 'https://json-server-senteranga.onrender.com';
const PING_INTERVAL = '*/10 * * * *'; // Toutes les 10 minutes
const TIMEOUT = 10000; // 10 secondes

class KeepAliveService {
    constructor(url) {
        this.url = url;
        this.isRunning = false;
        this.pingCount = 0;
        this.lastPingTime = null;
    }

    /**
     * Effectue un ping vers le serveur
     */
    async pingServer() {
        const urlObj = new URL(this.url);
        const client = urlObj.protocol === 'https:' ? https : http;
        
        return new Promise((resolve, reject) => {
            const startTime = Date.now();
            
            const req = client.get(this.url, (res) => {
                const responseTime = Date.now() - startTime;
                const statusCode = res.statusCode;
                
                if (statusCode === 200) {
                    this.pingCount++;
                    this.lastPingTime = new Date();
                    
                    console.log(`✅ Ping ${this.pingCount} - ${this.url} (${responseTime}ms)`);
                    resolve({ success: true, responseTime, statusCode });
                } else {
                    console.warn(`⚠️ Ping ${this.pingCount} - Statut HTTP: ${statusCode}`);
                    reject(new Error(`HTTP ${statusCode}`));
                }
            });

            req.on('error', (err) => {
                console.error(`❌ Erreur ping ${this.pingCount + 1}:`, err.message);
                reject(err);
            });

            req.setTimeout(TIMEOUT, () => {
                req.destroy();
                reject(new Error('Timeout'));
            });
        });
    }

    /**
     * Démarre le service de ping automatique
     */
    start() {
        if (this.isRunning) {
            console.log('⚠️ Le service est déjà en cours d\'exécution');
            return;
        }

        this.isRunning = true;
        console.log(`🚀 Démarrage du service de maintien en vie`);
        console.log(`🎯 URL cible: ${this.url}`);
        console.log(`⏰ Intervalle: toutes les 10 minutes`);
        console.log(`📅 Prochaine exécution: ${new Date(Date.now() + 600000).toLocaleString('fr-FR')}`);
        console.log('─'.repeat(50));

        // Premier ping immédiat
        this.pingServer().catch(err => {
            console.error('Erreur premier ping:', err.message);
        });

        // Configuration de la tâche cron
        cron.schedule(PING_INTERVAL, async () => {
            try {
                await this.pingServer();
            } catch (error) {
                console.error('Erreur ping programmé:', error.message);
            }
        });

        // Affichage du statut toutes les heures
        setInterval(() => {
            if (this.lastPingTime) {
                console.log(`📊 Statut - Dernier ping: ${this.lastPingTime.toLocaleString('fr-FR')}`);
            }
        }, 3600000); // 1 heure
    }

    /**
     * Arrête le service
     */
    stop() {
        this.isRunning = false;
        console.log('🛑 Arrêt du service de maintien en vie');
    }

    /**
     * Test manuel du ping
     */
    async test() {
        console.log(`🧪 Test manuel de ${this.url}...`);
        try {
            const result = await this.pingServer();
            console.log('✅ Test réussi:', result);
        } catch (error) {
            console.error('❌ Test échoué:', error.message);
        }
    }
}

// Gestion des arguments en ligne de commande
const args = process.argv.slice(2);
const url = args[0] || DEFAULT_URL;

// Gestion de l'interruption Ctrl+C
process.on('SIGINT', () => {
    console.log('\n🛑 Interruption détectée. Arrêt du service...');
    process.exit(0);
});

// Démarrage du service
const keepAlive = new KeepAliveService(url);

if (args.includes('--test')) {
    // Mode test unique
    keepAlive.test().then(() => process.exit(0));
} else {
    // Mode service continu
    keepAlive.start();
    
    // Message d'aide
    console.log('\n💡 Utilisation:');
    console.log('   node keep-alive.js [URL]     # Démarre le service');
    console.log('   node keep-alive.js --test    # Test unique');
    console.log('   Ctrl+C                       # Arrête le service');
    console.log('\n🔄 Le service maintient votre serveur Render actif!');
}