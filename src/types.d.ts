export interface IUniversidad {
    id?: number;
    nombre: string;
    sigla: string;
}

export interface IFacultad {
    id?: number;
    nombre: string;
    abreviatura: string;
    directorio: string;
    sigla: string;
    ciudad: string;
    codigoPostal: string;
    telefono: string;
    domicilio: string;
    email: string;
    contacto: string;
    universidadId?: number;
    universidad?: IUniversidad;
}

export interface IEspecialidad {
    id?: number;
    nombre: string;
    facultadId?: number;
    facultad?: IFacultad;
}