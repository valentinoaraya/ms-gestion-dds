import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });

import { prisma } from "../lib/prisma"

const clearDatabase = async () => {
    try {
        console.log("Limpiando base de datos...")

        // Eliminar datos
        await prisma.especialidades.deleteMany({})
        await prisma.facultades.deleteMany({})
        await prisma.universidades.deleteMany({})

        // Resetear secuencias de autoincrement para que los IDs empiecen en 1
        await prisma.$executeRaw`ALTER SEQUENCE "Especialidades_id_seq" RESTART WITH 1;`
        await prisma.$executeRaw`ALTER SEQUENCE "Facultades_id_seq" RESTART WITH 1;`
        await prisma.$executeRaw`ALTER SEQUENCE "Universidades_id_seq" RESTART WITH 1;`

        console.log("Base de datos limpiada.")
    } catch (error) {
        console.error(error)
    } finally {
        await prisma.$disconnect()
    }
}

clearDatabase()