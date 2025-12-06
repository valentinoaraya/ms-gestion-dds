import { EspecialidadService } from "../../../src/services/EspecialidadService";

test("debería retornar null al intentar obtener una especialidad que no existe", async () => {
    const idInexistente = 99999;
    const especialidadObtenida = await EspecialidadService.obtenerEspecialidadPorId(idInexistente);

    expect(especialidadObtenida).toBeNull();
})

