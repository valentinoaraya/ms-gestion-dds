import { Especialidad } from "../../../src/models/Especialidad"
import { UniversidadService } from "../../../src/services/UniversidadService"
import { instanciaUniversidad } from "../../utils"
import { EspecialidadService } from "../../../src/services/EspecialidadService"
import { Facultad } from "../../../src/models/Facultad"
import { FacultadService } from "../../../src/services/FacultadService"

test("Deberia crear una especialidad en la base de datos y luego actualizar su campo letra", async () => {
    const universidadCreada = await UniversidadService.crearUniversidad(instanciaUniversidad)
    const facultad = new Facultad(
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
        universidadCreada.id!
    )
    const facultadCreada = await FacultadService.crearFacultad(facultad)
    const especialidad = new Especialidad(
        "Ingeniería en Sistemas",
        facultadCreada.id!
    )
    const especialidadCreada = await EspecialidadService.crearEspecialidad(especialidad);

    const nuevosDatosEspecialidad = {
        nombre: "Nueva Especialidad",
    }
    const especialidadActualizada = await EspecialidadService.actualizarEspecialidad(especialidadCreada.id as number, nuevosDatosEspecialidad)

    expect(especialidadActualizada).toBeTruthy()
    expect(especialidadActualizada?.id).toBe(especialidadCreada.id)
    expect(especialidadActualizada?.nombre).toBe(nuevosDatosEspecialidad.nombre)
})