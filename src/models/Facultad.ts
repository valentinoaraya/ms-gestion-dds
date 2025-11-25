import { IEspecialidad, IUniversidad, type IFacultad } from "../types";
import { FacultadValidator } from "../validators/FacultadValidator";

export class Facultad implements IFacultad {

    private _especialidades: IEspecialidad[] = []

    constructor(
        private readonly _nombre: string,
        private readonly _abreviatura: string,
        private readonly _directorio: string,
        private readonly _sigla: string,
        private readonly _codigoPostal: string,
        private readonly _ciudad: string,
        private readonly _domicilio: string,
        private readonly _telefono: string,
        private readonly _contacto: string,
        private readonly _email: string,
        private readonly _universidadId?: number,
    ) {
        FacultadValidator.validate(
            _nombre,
            _abreviatura,
            _directorio,
            _sigla,
            _codigoPostal,
            _ciudad,
            _domicilio,
            _telefono,
            _contacto,
            _email,
            _universidadId
        )
    }
    id?: number | undefined;
    universidad?: IUniversidad | undefined;

    get nombre(): string { return this._nombre; }
    get abreviatura(): string { return this._abreviatura; }
    get directorio(): string { return this._directorio; }
    get sigla(): string { return this._sigla; }
    get codigoPostal(): string { return this._codigoPostal; }
    get ciudad(): string { return this._ciudad; }
    get domicilio(): string { return this._domicilio; }
    get telefono(): string { return this._telefono; }
    get contacto(): string { return this._contacto; }
    get email(): string { return this._email; }
    get universidadId(): number | undefined { return this._universidadId; }
    get especialidades(): IEspecialidad[] { return this._especialidades; }

    agregarEspecialidad(especialidad: IEspecialidad): void {
        this._especialidades.push(especialidad);
    }

    toPlainObject(): IFacultad {
        return {
            nombre: this.nombre,
            abreviatura: this.abreviatura,
            directorio: this.directorio,
            sigla: this.sigla,
            codigoPostal: this.codigoPostal,
            ciudad: this.ciudad,
            domicilio: this.domicilio,
            telefono: this.telefono,
            contacto: this.contacto,
            email: this.email,
            universidadId: this.universidadId,
        }
    }
}
