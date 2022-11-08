import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/AppError";
import { listScheduleByInstitution_Service } from "../../services/schedules/listScheduleByInstitution.service";

export const listScheduleByInstitution = async ( req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await listScheduleByInstitution_Service(id);

        return res.status(200).json(result);
    }
    catch(err) {
        if(err instanceof AppError) {
            handleError(err, res);
        }
    };
};