import { createClient } from "redis";
import { REDIS_URL } from "../config/config";

// Crear cliente de Redis (singleton)
export const localClient = createClient({
    url: REDIS_URL
});

// Estado de conexión
let isConnecting = false;
let isConnected = false;

// Manejar eventos de conexión
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

// Función helper para asegurar conexión
export async function ensureRedisConnection() {
    if (isConnected) {
        return; // Ya está conectado
    }
    
    if (isConnecting) {
        // Ya se está conectando, esperar
        await new Promise(resolve => setTimeout(resolve, 100));
        return ensureRedisConnection(); // Reintentar
    }
    
    try {
        isConnecting = true;
        await localClient.connect();
    } catch (error: any) {
        isConnecting = false;
        // Si el error es "Socket already opened", ignorar (ya está conectado)
        if (!error.message?.includes('Socket already opened')) {
            throw error;
        }
        isConnected = true;
    }
}

// Conectar al iniciar el módulo (solo una vez)
ensureRedisConnection().catch(err => {
    console.error('⚠️  No se pudo conectar a Redis al iniciar:', err.message);
});

