import { EspecialidadRepository } from "../repositories/EspecialidadRepository";
import { IEspecialidad } from "../types";
export class EspecialidadService {
    private static readonly EspecialidadRepository = new EspecialidadRepository();

    static crearEspecialidad(especialidad: IEspecialidad): Promise<IEspecialidad> {
        return this.EspecialidadRepository.crear(especialidad);
    }

    static obtenerEspecialidadPorId(id: number): Promise<IEspecialidad | null> {
        return this.EspecialidadRepository.buscarPorId(id);
    }

    static actualizarEspecialidad(id: number, nuevosDatos: Partial<IEspecialidad>): Promise<IEspecialidad | null> {
        return this.EspecialidadRepository.actualizar(id, nuevosDatos);
    }

    static eliminarEspecialidad(id: number): Promise<IEspecialidad | null> {
        return this.EspecialidadRepository.eliminar(id);
    }
}
