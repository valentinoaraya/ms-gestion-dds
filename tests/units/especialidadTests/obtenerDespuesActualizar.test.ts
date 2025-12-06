import { Especialidad } from "../../../src/models/Especialidad";
import { Facultad } from "../../../src/models/Facultad";
import { EspecialidadService } from "../../../src/services/EspecialidadService";
import { FacultadService } from "../../../src/services/FacultadService";
import { UniversidadService } from "../../../src/services/UniversidadService";
import { instanciaUniversidad } from "../../utils";

test("debería obtener una especialidad actualizada después de modificarla", async () => {
    const universidadCreada = await UniversidadService.crearUniversidad(instanciaUniversidad);
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
    );
    const facultadCreada = await FacultadService.crearFacultad(facultad);
    const especialidad = new Especialidad(
        "Ingeniería en Sistemas",
        facultadCreada.id!
    );
    const especialidadCreada = await EspecialidadService.crearEspecialidad(especialidad);

    const nuevosDatos = {
        nombre: "Ingeniería en Informática"
    };

    await EspecialidadService.actualizarEspecialidad(especialidadCreada.id!, nuevosDatos);
    const especialidadObtenida = await EspecialidadService.obtenerEspecialidadPorId(especialidadCreada.id!);

    expect(especialidadObtenida).toBeTruthy();
    expect(especialidadObtenida?.nombre).toBe(nuevosDatos.nombre);
})

