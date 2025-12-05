import { Router } from "express";
import { obtenerEspecialidad } from "../controllers/especialidad.controller";

export const especialidadRouter = Router()

especialidadRouter.get("/:id", obtenerEspecialidad)