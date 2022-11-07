import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/AppError";
import { deleteSchedules_Service } from "../../services/schedules/deleteShcedules.service";

export const deleteSchedules = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; 
        const result = await deleteSchedules_Service(id);
        
        return res.status(204).json(result);
    }
    catch (err) {
        if (err instanceof AppError) {
            handleError(err, res);
        }
    }
};