import { localClient, ensureRedisConnection } from "../lib/redis";
import { EspecialidadRepository } from "../repositories/EspecialidadRepository";
import { IEspecialidad } from "../types";
export class EspecialidadService {
    private static readonly EspecialidadRepository = new EspecialidadRepository();

    static crearEspecialidad(especialidad: IEspecialidad): Promise<IEspecialidad> {
        return this.EspecialidadRepository.crear(especialidad);
    }

    static async obtenerEspecialidadPorId(id: number): Promise<IEspecialidad | null> {
        const cacheKey = `especialidad:${id}`;

        try {
            await ensureRedisConnection();

            const cachedEspecialidad = await localClient.get(cacheKey);
            if (cachedEspecialidad) {
                console.log(`🎯 Cache HIT: especialidad ${id}`);
                return JSON.parse(cachedEspecialidad);
            }

            console.log(`💤 Cache MISS: especialidad ${id}`);
        } catch (error) {
            console.error('⚠️  Error al buscar en Redis cache:', error);
        }

        const especialidad = await this.EspecialidadRepository.buscarPorId(id);

        if (especialidad) {
            try {
                await localClient.set(cacheKey, JSON.stringify({
                    especialidad: especialidad.nombre,
                    facultad: especialidad.facultad?.nombre,
                    universidad: especialidad.facultad?.universidad?.nombre
                }), {
                    EX: 3600
                });
                console.log(`💾 Guardado en cache: especialidad ${id}`);
            } catch (error) {
                console.error('⚠️  Error al guardar en Redis cache:', error);
            }
        }

        return especialidad;
    }

    static actualizarEspecialidad(id: number, nuevosDatos: Partial<IEspecialidad>): Promise<IEspecialidad | null> {
        return this.EspecialidadRepository.actualizar(id, nuevosDatos);
    }

    static eliminarEspecialidad(id: number): Promise<IEspecialidad | null> {
        return this.EspecialidadRepository.eliminar(id);
    }
}
