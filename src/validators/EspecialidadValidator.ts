import { BaseValidator } from "./BaseValidator";

export class EspecialidadValidator extends BaseValidator {
    static validate(
        nombre: string,
    ): void {
        this.validateRequired(nombre, "nombre")
        this.validateString(nombre, "nombre")
    }
}