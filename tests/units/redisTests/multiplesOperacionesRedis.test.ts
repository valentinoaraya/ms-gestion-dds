import { localClient } from "../../../src/lib/redis";

test("debería realizar múltiples operaciones en Redis correctamente", async () => {
    try {
        const clave1 = "clave1";
        const clave2 = "clave2";
        const valor1 = "valor1";
        const valor2 = "valor2";

        await localClient.set(clave1, valor1);
        await localClient.set(clave2, valor2);

        const valorObtenido1 = await localClient.get(clave1);
        const valorObtenido2 = await localClient.get(clave2);

        expect(valorObtenido1).toBe(valor1);
        expect(valorObtenido2).toBe(valor2);

        const existeClave1 = await localClient.exists(clave1);
        const existeClave2 = await localClient.exists(clave2);

        expect(existeClave1).toBe(1);
        expect(existeClave2).toBe(1);

        await localClient.del(clave1);
        await localClient.del(clave2);

        const existeClave1Despues = await localClient.exists(clave1);
        expect(existeClave1Despues).toBe(0);

    } catch (error) {
        throw new Error(`Error en las operaciones múltiples de redis: ${error}`)
    }
    finally {
        await localClient.flushAll()
        await localClient.quit();
    }
})

