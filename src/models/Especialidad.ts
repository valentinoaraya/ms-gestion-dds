import { EspecialidadValidator } from "../validators/EspecialidadValidator"
import { IEspecialidad, IFacultad } from "../types"

export class Especialidad implements IEspecialidad {

    private _facultades: IFacultad[] = []

    constructor(
        private readonly _nombre: string,
    ) {
        EspecialidadValidator.validate(this._nombre);
    }

    get nombre(): string { return this._nombre; }

    agregarFacultad(facultad: IFacultad): void {
        this._facultades.push(facultad);
    }

    toPlainObject() {
        return {
            nombre: this.nombre,
        };
    }
}