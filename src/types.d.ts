export interface IUniversidad {
    id?: number;
    nombre: string;
    sigla: string;
    facultades?: IFacultad[];
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
    especialidades?: IEspecialidad[];
}

export interface IEspecialidad {
    id?: number;
    nombre: string;
    facultades?: IFacultad[];
}