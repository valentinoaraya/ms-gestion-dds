import request from "supertest"
import { crearEntidadesPadre } from "../utils"
import { PORT } from "../../src/config/config"
import { localClient } from "../../src/lib/redis";

describe("Pruebas de integración para obtener datos académicos a partir de una Especialidad", () => {
    test("debería recibir una petición, guardar el objeto en Redis en caso de que no esté y retornar una respuesta", async () => {
        const { universidad, facultad, especialidad } = await crearEntidadesPadre()

        const response = await request(`http://localhost:${PORT}`)
            .get(`/api/especialidad/${especialidad.id!}`)

        console.log(response.body)

        await localClient.connect()

        const redisKey = `especialidad:${especialidad.id!}`
        const redisData = await localClient.get(redisKey)

        expect(redisData).toBeDefined()
        const parsedData = JSON.parse(redisData as string)
        expect(parsedData.especialidad).toBe(especialidad.nombre)
        expect(parsedData.facultad).toBe(facultad.nombre)
        expect(parsedData.universidad).toBe(universidad.nombre)
        expect(response.status).toBe(200)
        expect(response.body).toBeDefined()
        expect(response.body.especialidad).toBe(especialidad.nombre)
        expect(response.body.facultad).toBe(facultad.nombre)
        expect(response.body.universidad).toBe(universidad.nombre)
    })

})