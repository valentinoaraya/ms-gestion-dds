import { FacultadService } from "../../../src/services/FacultadService";

test("debería retornar null al intentar obtener una facultad que no existe", async () => {
    const idInexistente = 99999;
    const facultadObtenida = await FacultadService.obtenerFacultadPorId(idInexistente);

    expect(facultadObtenida).toBeNull();
})

