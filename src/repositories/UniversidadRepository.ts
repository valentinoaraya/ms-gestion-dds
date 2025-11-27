import { PrismaClient } from "@prisma/client";
import { IUniversidad } from "../types";
import { BaseCreator, BaseFinder, BaseUpdater, BaseDeleter } from "./BaseRepository";

const prisma = new PrismaClient();

export class UniversidadRepository {
    protected readonly model = prisma.universidades;
    protected readonly includes?: any;

    private readonly creator: BaseCreator<IUniversidad>
    private readonly finder: BaseFinder<IUniversidad>
    private readonly updater: BaseUpdater<IUniversidad>
    private readonly deleter: BaseDeleter<IUniversidad>

    constructor() {
        this.creator = new BaseCreator<IUniversidad>(this.model, this.includes)
        this.finder = new BaseFinder<IUniversidad>(this.model, this.includes)
        this.updater = new BaseUpdater<IUniversidad>(this.model, this.includes)
        this.deleter = new BaseDeleter(this.model, this.includes)
    }

    async crear(data: IUniversidad): Promise<IUniversidad> {
        return this.creator.crear(data)
    }

    async buscarPorId(id: number): Promise<IUniversidad | null> {
        return this.finder.buscarPorId(id)
    }

    async actualizar(id: number, nuevosDatos: Partial<IUniversidad>): Promise<IUniversidad | null> {
        return this.updater.actualizar(id, nuevosDatos)
    }

    async eliminar(id: number): Promise<IUniversidad | null> {
        return this.deleter.eliminar(id)
    }
}