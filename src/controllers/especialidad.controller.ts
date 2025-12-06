import { Request, Response } from "express";
import { EspecialidadService } from "../services/EspecialidadService";

export const obtenerEspecialidad = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const id = parseInt(req.params.id, 10)
        const especialidad = await EspecialidadService.obtenerEspecialidadPorId(id)

        if (!especialidad) return res.status(404).json({ message: "Especialidad no encontrada" })

        // no formateo porque viene de cache, es decir en formaro correcto 
        if ('especialidad' in especialidad) {
            return res.status(200).json(especialidad)
        }

        
        res.status(200).json({
            especialidad: especialidad.nombre,
            facultad: especialidad.facultad?.nombre,
            universidad: especialidad.facultad?.universidad?.nombre
        })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}