import { EspecialidadService } from "../../src/services/EspecialidadService"
import { instanciaEspecialidad as especialidad } from "../utils";
import { prisma } from "../../src/lib/prisma"

test("Deberia crear y guardad una especialidad en la base de datos", async () => {
    const especialidadCreada = await EspecialidadService.crearEspecialidad(especialidad);
    const especialidadBD = await prisma.especialidades.findUnique({
        where: { id: especialidadCreada.id },
    });

    expect(especialidadBD).toBeTruthy();
    expect(especialidadBD?.nombre).toBe(especialidad.nombre);
})