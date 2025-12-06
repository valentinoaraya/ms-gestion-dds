import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });

import { prisma } from "../lib/prisma";

const seedDatabase = async () => {
    try {
        console.log("🌱 Iniciando seed de la base de datos...");

        const existingUniversidades = await prisma.universidades.count();
        if (existingUniversidades > 0) {
            console.log("⚠️  La base de datos ya tiene datos. Usa 'npm run clear-database' primero si quieres resetear.");
            return;
        }

        const utn = await prisma.universidades.create({
            data: {
                nombre: "Universidad Tecnológica Nacional",
                sigla: "UTN"
            }
        });

        const frsanrafael = await prisma.facultades.create({
            data: {
                nombre: "Facultad Regional de San Rafael",
                abreviatura: "FRSR",
                directorio: "San Rafael",
                sigla: "FRSR",
                ciudad: "San Rafael",
                codigoPostal: "5600",
                telefono: "0260-4498300",
                domicilio: "Av. Urquiza 314",
                email: "info@sanrafael.utn.edu.ar",
                contacto: "Secretaría Académica",
                universidadId: utn.id
            }
        });

        await prisma.especialidades.create({
            data: {
                nombre: "Ingeniería en Sistemas",
                facultadId: frsanrafael.id
            }
        });
        await prisma.especialidades.create({
            data: {
                nombre: "Ingeniería Electrónica",
                facultadId: frsanrafael.id
            }
        });
        await prisma.especialidades.create({
            data: {
                nombre: "Ingeniería Industrial",
                facultadId: frsanrafael.id
            }
        });

        const frbuenosaires = await prisma.facultades.create({
            data: {
                nombre: "Facultad Regional Buenos Aires",
                abreviatura: "FRBA",
                directorio: "Buenos Aires",
                sigla: "FRBA",
                ciudad: "Buenos Aires",
                codigoPostal: "1179",
                telefono: "011-4867-7500",
                domicilio: "Medrano 951",
                email: "info@frba.utn.edu.ar",
                contacto: "Secretaría",
                universidadId: utn.id
            }
        });

        await prisma.especialidades.create({
            data: {
                nombre: "Ingeniería Civil",
                facultadId: frbuenosaires.id
            }
        });
        await prisma.especialidades.create({
            data: {
                nombre: "Ingeniería Mecánica",
                facultadId: frbuenosaires.id
            }
        });

        const uba = await prisma.universidades.create({
            data: {
                nombre: "Universidad de Buenos Aires",
                sigla: "UBA"
            }
        });

        const fiuba = await prisma.facultades.create({
            data: {
                nombre: "Facultad de Ingeniería",
                abreviatura: "FIUBA",
                directorio: "Ingeniería",
                sigla: "FIUBA",
                ciudad: "Buenos Aires",
                codigoPostal: "1063",
                telefono: "011-5285-0800",
                domicilio: "Av. Paseo Colón 850",
                email: "info@fi.uba.ar",
                contacto: "Secretaría de Graduados",
                universidadId: uba.id
            }
        });

        await prisma.especialidades.create({
            data: {
                nombre: "Ingeniería Informática",
                facultadId: fiuba.id
            }
        });
        await prisma.especialidades.create({
            data: {
                nombre: "Ingeniería Química",
                facultadId: fiuba.id
            }
        });

        const unc = await prisma.universidades.create({
            data: {
                nombre: "Universidad Nacional de Córdoba",
                sigla: "UNC"
            }
        });

        const fcefyn = await prisma.facultades.create({
            data: {
                nombre: "Facultad de Ciencias Exactas, Físicas y Naturales",
                abreviatura: "FCEFyN",
                directorio: "Ciencias Exactas",
                sigla: "FCEFyN",
                ciudad: "Córdoba",
                codigoPostal: "5000",
                telefono: "0351-535-3800",
                domicilio: "Vélez Sarsfield 1611",
                email: "info@efn.uncor.edu",
                contacto: "Decanato",
                universidadId: unc.id
            }
        });

        await prisma.especialidades.create({
            data: {
                nombre: "Licenciatura en Computación",
                facultadId: fcefyn.id
            }
        });
        await prisma.especialidades.create({
            data: {
                nombre: "Licenciatura en Matemática",
                facultadId: fcefyn.id
            }
        });

        const universidades = await prisma.universidades.count();
        const facultades = await prisma.facultades.count();
        const especialidades = await prisma.especialidades.count();

        console.log("\n✅ Seed completado:");
        console.log(`   - ${universidades} universidades`);
        console.log(`   - ${facultades} facultades`);
        console.log(`   - ${especialidades} especialidades`);
        console.log("\n🎯 Ahora puedes ejecutar los tests de K6\n");

    } catch (error) {
        console.error("❌ Error en seed:", error);
    } finally {
        await prisma.$disconnect();
    }
};

seedDatabase();
