import { instanciaEspecialidad } from "../utils";

test('deberia de crear una instancia de la clase Especialidad y leer sus atributos', () => {

    expect(instanciaEspecialidad).toBeTruthy()
    expect(instanciaEspecialidad.nombre).toBe("Ingeniería en Sistemas")
})