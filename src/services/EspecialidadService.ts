import { localClient } from "../lib/redis";
import { EspecialidadRepository } from "../repositories/EspecialidadRepository";
import { IEspecialidad } from "../types";
export class EspecialidadService {
    private static readonly EspecialidadRepository = new EspecialidadRepository();

    static crearEspecialidad(especialidad: IEspecialidad): Promise<IEspecialidad> {
        return this.EspecialidadRepository.crear(especialidad);
    }

    static async obtenerEspecialidadPorId(id: number): Promise<IEspecialidad | null> {
        const cacheKey = `especialidad:${id}`
        await localClient.connect()
        const cachedEspecialidad = await localClient.get(cacheKey)
        if (cachedEspecialidad) {
            return JSON.parse(cachedEspecialidad)
        }
        const especialidad = await this.EspecialidadRepository.buscarPorId(id);

        if (especialidad) {
            await localClient.set(cacheKey, JSON.stringify({
                especialidad: especialidad.nombre,
                facultad: especialidad.facultad?.nombre,
                universidad: especialidad.facultad?.universidad?.nombre
            }), {
                EX: 3600
            })
        }
        await localClient.quit()
        return especialidad
    }

    static actualizarEspecialidad(id: number, nuevosDatos: Partial<IEspecialidad>): Promise<IEspecialidad | null> {
        return this.EspecialidadRepository.actualizar(id, nuevosDatos);
    }

    static eliminarEspecialidad(id: number): Promise<IEspecialidad | null> {
        return this.EspecialidadRepository.eliminar(id);
    }
}
