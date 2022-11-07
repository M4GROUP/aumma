import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/AppError";
import { listSchedulesByChildren_Service } from "../../services/schedules/listSchedulesByChildren.service";

export const listSchedulesByChildren = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await listSchedulesByChildren_Service(id);

        return res.status(200).json(result);
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res);
        }
    }
};
