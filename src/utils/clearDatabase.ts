import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });

import { prisma } from "../lib/prisma"

const clearDatabase = async () => {
    try {
        console.log("Limpiando base de datos...")

        await prisma.especialidades.deleteMany({})
        await prisma.facultades.deleteMany({})
        await prisma.universidades.deleteMany({})

        console.log("Base de datos limpiada.")
    } catch (error) {
        console.error(error)
    }
}

clearDatabase()