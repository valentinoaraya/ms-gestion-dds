
import { Especialidad } from "../src/models/Especialidad";
import { Facultad } from "../src/models/Facultad";
import { Universidad } from "../src/models/Universidad";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const crearEntidadesPadre = async () => {
    const universidad = await prisma.universidades.create({
        data: {
            nombre: "Universidad Tecnológica Nacional",
            sigla: "UTN"
        }
    });

    const facultad = await prisma.facultades.create({
        data: {
            nombre: "Facultad Regional de San Rafael",
            abreviatura: "FRSR",
            directorio: "Facultad de ingeniería",
            sigla: "FRSR",
            codigoPostal: "5600",
            ciudad: "San Rafael",
            domicilio: "Urquiza 314",
            telefono: "02604421078",
            contacto: "Ing. Roberto D. Vilches",
            email: "rvilches@frsr.utn.edu.ar",
            universidadId: universidad.id
        }
    });

    const especialidad = await prisma.especialidades.create({
        data: {
            nombre: "Ingeniería en Sistemas",
        }
    });

    return { universidad, facultad, especialidad };
};

export const crearInstanciaFacultad = async () => {
    const { universidad } = await crearEntidadesPadre();
    return new Facultad(
        "Facultad Regional de San Rafael",
        "FRSR",
        "Facultad de ingeniería",
        "FRSR",
        "5600",
        "San Rafael",
        "Urquiza 314",
        "02604421078",
        "Ing. Roberto D. Vilches",
        "rvilches@frsr.utn.edu.ar",
        universidad.id
    );
};

export const instanciaFacultad = new Facultad(
    "Facultad Regional de San Rafael",
    "FRSR",
    "Facultad de ingeniería",
    "FRSR",
    "5600",
    "San Rafael",
    "Urquiza 314",
    "02604421078",
    "Ing. Roberto D. Vilches",
    "rvilches@frsr.utn.edu.ar"
)

export const instanciaUniversidad = new Universidad(
    "Universidad Tecnológica Nacional",
    "UTN"
)

export const instanciaEspecialidad = new Especialidad(
    "Ingeniería en Sistemas",
)
