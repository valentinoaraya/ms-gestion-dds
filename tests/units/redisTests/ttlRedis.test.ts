import { localClient } from "../../../src/lib/redis";

test("debería establecer un TTL (Time To Live) en una clave de Redis", async () => {
    try {
        const clave = "clave_con_ttl";
        const valor = "valor temporal";
        const ttlSegundos = 60;

        await localClient.set(clave, valor, { EX: ttlSegundos });
        const ttlObtenido = await localClient.ttl(clave);

        expect(ttlObtenido).toBeGreaterThan(0);
        expect(ttlObtenido).toBeLessThanOrEqual(ttlSegundos);

        await localClient.del(clave);

    } catch (error) {
        throw new Error(`Error en la operación de TTL en redis: ${error}`)
    }
    finally {
        await localClient.flushAll()
        await localClient.quit();
    }
})

