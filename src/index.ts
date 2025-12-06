import express from "express"
import { PORT } from "./config/config"
import { especialidadRouter } from "./routes/especialidad.route"
import rateLimit from "express-rate-limit"

const app = express()

app.use(express.json())

const limiter = rateLimit({
  windowMs: 60 * 1000,  
  max: 100,             
  message: { error: "Too many requests" },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use("/api/especialidad", especialidadRouter)

app.get("/", (_req, res) => {
    res.send("Hola! este es el microservicio de Gestión Académica")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

