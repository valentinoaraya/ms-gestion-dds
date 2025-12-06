import { FacultadService } from "../../../src/services/FacultadService";
import { crearInstanciaFacultad } from "../../utils";

test("debería obtener una facultad por ID de la base de datos", async () => {
    const facultad = await crearInstanciaFacultad();
    const facultadCreada = await FacultadService.crearFacultad(facultad);
    const facultadObtenida = await FacultadService.obtenerFacultadPorId(facultadCreada.id!);

    expect(facultadObtenida).toBeTruthy();
    expect(facultadObtenida?.id).toBe(facultadCreada.id);
    expect(facultadObtenida?.nombre).toBe(facultad.nombre);
    expect(facultadObtenida?.abreviatura).toBe(facultad.abreviatura);
    expect(facultadObtenida?.sigla).toBe(facultad.sigla);
})

