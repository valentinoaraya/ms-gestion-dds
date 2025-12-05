import { EspecialidadService } from "../../../src/services/EspecialidadService"
import { Facultad } from "../../../src/models/Facultad";
import { FacultadService } from "../../../src/services/FacultadService";
import { Especialidad } from "../../../src/models/Especialidad";
import { UniversidadService } from "../../../src/services/UniversidadService";
import { instanciaUniversidad } from "../../utils";

test("Deberia eliminar una especialidad por ID en la base de datos", async () => {
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

    await EspecialidadService.eliminarEspecialidad(especialidadCreada.id!);

    const especialidadBD = await EspecialidadService.obtenerEspecialidadPorId(especialidadCreada.id!)

    expect(especialidadBD).toBeFalsy();
})