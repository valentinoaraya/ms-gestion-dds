import { EspecialidadService } from "../../src/services/EspecialidadService"
import { instanciaEspecialidad as especialidad } from "../utils";
import { prisma } from "../../src/lib/prisma";

test("Deberia eliminar una especialidad por ID en la base de datos", async () => {
    const especialidadBD = await EspecialidadService.crearEspecialidad(especialidad);

    await EspecialidadService.eliminarEspecialidad(especialidadBD.id as number);
    const especialidadBorrada = await prisma.especialidades.findUnique({
        where: { id: especialidadBD.id },
    });

    expect(especialidadBorrada).toBeFalsy();
})