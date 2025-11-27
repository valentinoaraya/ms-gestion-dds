import { UniversidadRepository } from "../repositories/UniversidadRepository";
import { IUniversidad } from "../types";

export class UniversidadService {
    private static readonly universidadRepository = new UniversidadRepository();

    static crearUniversidad(universidad: IUniversidad): Promise<IUniversidad> {
        return this.universidadRepository.crear(universidad);
    }

    static obtenerUniversidadPorId(id: number): Promise<IUniversidad | null> {
        return this.universidadRepository.buscarPorId(id);
    }

    static actualizarUniversidad(id: number, nuevosDatos: Partial<IUniversidad>): Promise<IUniversidad | null> {
        return this.universidadRepository.actualizar(id, nuevosDatos);
    }

    static eliminarUniversidad(id: number): Promise<IUniversidad | null> {
        return this.universidadRepository.eliminar(id);
    }
}