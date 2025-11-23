import { PrismaClient } from "@prisma/client";
import { IEspecialidad } from "../types";
import { BaseCreator, BaseFinder, BaseUpdater, BaseDeleter } from "./BaseRepository";

const prisma = new PrismaClient();

export class EspecialidadRepository {
    protected readonly model = prisma.especialidades
    protected readonly includes?: any;

    private readonly creator: BaseCreator<IEspecialidad>
    private readonly finder: BaseFinder<IEspecialidad>
    private readonly updater: BaseUpdater<IEspecialidad>
    private readonly deleter: BaseDeleter<IEspecialidad>

    constructor() {
        this.creator = new BaseCreator<IEspecialidad>(this.model, this.includes)
        this.finder = new BaseFinder<IEspecialidad>(this.model, this.includes)
        this.updater = new BaseUpdater<IEspecialidad>(this.model, this.includes)
        this.deleter = new BaseDeleter(this.model, this.includes)
    }

    async crear(data: IEspecialidad): Promise<IEspecialidad> {
        return this.creator.crear(data)
    }

    async buscarPorId(id: number): Promise<IEspecialidad | null> {
        return this.finder.buscarPorId(id)
    }

    async actualizar(id: number, nuevosDatos: Partial<IEspecialidad>): Promise<IEspecialidad | null> {
        return this.updater.actualizar(id, nuevosDatos)
    }

    async eliminar(id: number): Promise<IEspecialidad | null> {
        return this.deleter.eliminar(id)
    }
}