import { UniversidadService } from "../../../src/services/UniversidadService";

test("debería retornar null al intentar obtener una universidad que no existe", async () => {
    const idInexistente = 99999;
    const universidadObtenida = await UniversidadService.obtenerUniversidadPorId(idInexistente);

    expect(universidadObtenida).toBeNull();
})

