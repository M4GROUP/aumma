import { Request, Response } from "express";
import { listSchedules_Service } from "../../services/schedules/listSchedules.service";

export const listSchedules = async (req : Request, res: Response) => {
    const result = await listSchedules_Service();
    return res.status(200).json(result);
};