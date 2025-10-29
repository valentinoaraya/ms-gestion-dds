import express from "express"
import { PORT } from "./config/config"

const app = express()

app.get("/", (_req, res) => {
    res.send("Hello, World!")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})