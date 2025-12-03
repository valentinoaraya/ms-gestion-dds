import { UniversidadService } from "../../src/services/UniversidadService";
import { instanciaUniversidad as universidad } from "../utils";
import { PrismaClient } from "@prisma/client";

test('deberia eliminar una universidad por ID de la base de datos', async () => {
    const universidadDB = await UniversidadService.crearUniversidad(universidad);

    await UniversidadService.eliminarUniversidad(universidadDB.id as number);

    
    const prisma = new PrismaClient();

    const universidadBorrada = await prisma.universidades.findUnique({
        where: { id: universidadDB.id }
    });

    expect(universidadBorrada).toBeFalsy();
});

