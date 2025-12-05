import { IFacultad } from "../types";
import { BaseCreator, BaseFinder, BaseUpdater, BaseDeleter } from "./BaseRepository";
import { prisma } from "../lib/prisma";

export class FacultadRepository {
    private readonly model = prisma.facultades;
    private readonly includes?: any
    private readonly creator: BaseCreator<IFacultad>
    private readonly finder: BaseFinder<IFacultad>
    private readonly updater: BaseUpdater<IFacultad>
    private readonly deleter: BaseDeleter<IFacultad>
    constructor() {
        this.creator = new BaseCreator<IFacultad>(this.model, this.includes)
        this.finder = new BaseFinder<IFacultad>(this.model, this.includes)
        this.updater = new BaseUpdater<IFacultad>(this.model, this.includes)
        this.deleter = new BaseDeleter(this.model, this.includes)
    }
    async crear(facultad: IFacultad): Promise<IFacultad> {
        return await this.creator.crear(facultad)
    }
    async buscarPorId(id: number): Promise<IFacultad | null> {
        return await this.finder.buscarPorId(id)
    }
    async actualizar(id: number, nuevosDatos: Partial<IFacultad>): Promise<IFacultad | null> {
        return this.updater.actualizar(id, nuevosDatos)
    }
    async eliminar(id: number): Promise<IFacultad | null> {
        return this.deleter.eliminar(id)
    }
};
