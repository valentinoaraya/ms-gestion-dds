import { type IUniversidad } from "../types";
import { UniversidadValidator } from "../validators/UniversidadValidator";

export class Universidad implements IUniversidad {
    constructor(
        private readonly _nombre: string,
        private readonly _sigla: string,
    ) {
        UniversidadValidator.validate(_nombre, _sigla)
    }

    get nombre(): string { return this._nombre }
    get sigla(): string { return this._sigla }

    toPlainObject(): IUniversidad {
        return {
            nombre: this.nombre,
            sigla: this.sigla,
        };
    }
}
