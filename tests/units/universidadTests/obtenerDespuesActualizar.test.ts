import { UniversidadService } from "../../../src/services/UniversidadService";
import { instanciaUniversidad as universidad } from "../../utils";

test("debería obtener una universidad actualizada después de modificarla", async () => {
    const universidadCreada = await UniversidadService.crearUniversidad(universidad);

    const nuevosDatos = {
        nombre: "Universidad Nacional Tecnológica"
    };

    await UniversidadService.actualizarUniversidad(universidadCreada.id!, nuevosDatos);
    const universidadObtenida = await UniversidadService.obtenerUniversidadPorId(universidadCreada.id!);

    expect(universidadObtenida).toBeTruthy();
    expect(universidadObtenida?.nombre).toBe(nuevosDatos.nombre);
    expect(universidadObtenida?.sigla).toBe(universidad.sigla);
})

