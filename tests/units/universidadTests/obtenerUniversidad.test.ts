import { UniversidadService } from "../../../src/services/UniversidadService";
import { instanciaUniversidad as universidad } from "../../utils";

test("debería obtener una universidad por ID de la base de datos", async () => {
    const universidadCreada = await UniversidadService.crearUniversidad(universidad);
    const universidadObtenida = await UniversidadService.obtenerUniversidadPorId(universidadCreada.id!);

    expect(universidadObtenida).toBeTruthy();
    expect(universidadObtenida?.id).toBe(universidadCreada.id);
    expect(universidadObtenida?.nombre).toBe(universidad.nombre);
    expect(universidadObtenida?.sigla).toBe(universidad.sigla);
})

