import {localClient} from "../../src/lib/redis";

test("deberia guardar y buscar un dato en redis", async () => {
    try {
        await localClient.connect();

        const clave = "clave de prueba";
        const valor = "valor de prueba";

        await localClient.set(clave, valor);
        const valorObtenido = await localClient.get(clave);

        expect(valorObtenido).toBe(valor);
        
        await localClient.del(clave);

    } catch (error) {
        throw new Error(`Error en la operacion de buscar en redis: ${error}`)
    }
    finally {
        await localClient.quit();
    }
})