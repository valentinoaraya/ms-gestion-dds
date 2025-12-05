import { EspecialidadValidator } from "../validators/EspecialidadValidator"
import { IEspecialidad } from "../types"

export class Especialidad implements IEspecialidad {

    constructor(
        private readonly _nombre: string,
        private readonly _facultadId?: number,
    ) {
        EspecialidadValidator.validate(this._nombre);
    }

    get nombre(): string { return this._nombre; }
    get facultadId(): number | undefined { return this._facultadId }

    toPlainObject() {
        return {
            nombre: this.nombre,
            facultadId: this.facultadId,
        };
    }
}