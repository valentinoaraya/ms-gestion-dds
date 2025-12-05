import { clearDatabase } from "./utils"

beforeEach(async () => {
    await clearDatabase()
})

afterAll(async () => {
    await clearDatabase()
})