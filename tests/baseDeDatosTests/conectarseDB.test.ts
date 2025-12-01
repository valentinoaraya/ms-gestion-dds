import { prisma } from "../../src/lib/prisma";

test("debería conectarse a la base de datos sin errores", async () => {

    try {
        await prisma.$connect();
        expect(true).toBe(true);

    } catch (error) {
        throw new Error(`Error de conexión: ${error}`);

    } finally {
        await prisma.$disconnect();
    }
})