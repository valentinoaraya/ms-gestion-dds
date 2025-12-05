import express from "express"
import { PORT } from "./config/config"
import { especialidadRouter } from "./routes/especialidad.route"

const app = express()

app.use(express.json())

app.use("/api/especialidad", especialidadRouter)

app.get("/", (_req, res) => {
    res.send("Hello, World!")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

