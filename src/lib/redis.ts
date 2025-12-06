import { createClient } from "redis";
import { REDIS_URL } from "../config/config";

export const localClient = createClient({
    url: REDIS_URL
});

let isConnecting = false;
let isConnected = false;

localClient.on('connect', () => {
    console.log('✅ Redis conectado');
    isConnected = true;
    isConnecting = false;
});

localClient.on('error', (err) => {
    console.error('❌ Error de Redis:', err);
    isConnected = false;
    isConnecting = false;
});

localClient.on('end', () => {
    console.log('🔌 Redis desconectado');
    isConnected = false;
    isConnecting = false;
});

export async function ensureRedisConnection() {
    if (isConnected) {
        return;
    }

    if (isConnecting) {
        await new Promise(resolve => setTimeout(resolve, 100));
        return ensureRedisConnection();
    }

    try {
        isConnecting = true;
        await localClient.connect();
    } catch (error: any) {
        isConnecting = false;
        if (!error.message?.includes('Socket already opened')) {
            throw error;
        }
        isConnected = true;
    }
}

ensureRedisConnection().catch(err => {
    console.error('⚠️  No se pudo conectar a Redis al iniciar:', err.message);
});

