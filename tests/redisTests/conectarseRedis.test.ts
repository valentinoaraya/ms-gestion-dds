import { localClient } from "../../src/lib/redis";


test("debería conectarse a redis sin errores", async () => {

    try {
        await localClient.connect();
        expect(true).toBe(true);

    } catch (error) {
        throw new Error(`Error en la conexión: ${error}`)

    }finally {
        await localClient.quit();
    }
})