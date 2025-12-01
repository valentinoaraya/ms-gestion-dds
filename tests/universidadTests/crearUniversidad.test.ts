import { UniversidadService } from "../../src/services/UniversidadService";
import { instanciaUniversidad as universidad } from "../utils";
import { prisma } from "../../src/lib/prisma";

test('deberia crear y guardar una universidad en la base de datos', async () => {

    const universidadCreada = await UniversidadService.crearUniversidad(universidad);

    const universidadBD = await prisma.universidades.findUnique({
        where: { id: universidadCreada.id },
    })

    expect(universidadBD).toBeTruthy()
    expect(universidadBD?.nombre).toBe(universidad.nombre)
    expect(universidadBD?.sigla).toBe(universidad.sigla)
})
