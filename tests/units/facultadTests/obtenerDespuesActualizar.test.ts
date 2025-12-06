import { FacultadService } from "../../../src/services/FacultadService";
import { crearInstanciaFacultad } from "../../utils";

test("debería obtener una facultad actualizada después de modificarla", async () => {
    const facultad = await crearInstanciaFacultad();
    const facultadCreada = await FacultadService.crearFacultad(facultad);

    const nuevosDatos = {
        ciudad: "Mendoza"
    };

    await FacultadService.actualizarFacultad(facultadCreada.id!, nuevosDatos);
    const facultadObtenida = await FacultadService.obtenerFacultadPorId(facultadCreada.id!);

    expect(facultadObtenida).toBeTruthy();
    expect(facultadObtenida?.ciudad).toBe(nuevosDatos.ciudad);
    expect(facultadObtenida?.nombre).toBe(facultad.nombre);
})

