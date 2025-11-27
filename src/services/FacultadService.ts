import { FacultadRepository } from "../repositories/FacultadRepository";
import { IFacultad } from "../types";

export class FacultadService {
    private static readonly FacultadRepository = new FacultadRepository();

    static crearFacultad(facultad: IFacultad): Promise<IFacultad> {
        return this.FacultadRepository.crear(facultad);
    }
    static obtenerFacultadPorId(id: number): Promise<IFacultad | null> {
        return this.FacultadRepository.buscarPorId(id);
    }
    static actualizarFacultad(id: number, nuevosDatos: Partial<IFacultad>): Promise<IFacultad | null> {
        return this.FacultadRepository.actualizar(id, nuevosDatos);
    }
    static eliminarFacultad(id: number): Promise<IFacultad | null> {
        return this.FacultadRepository.eliminar(id);
    }

}