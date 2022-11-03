import { Request, Response } from "express";
import listAllSchedulesService from "../../services/admin/listAllSchedules.service";
import { AppError, handleError } from "../../errors/AppError";

const listAllSchedulesController = async (req: Request, res: Response) => {
  try {
    const mySchedules = await listAllSchedulesService();

    return res.send(mySchedules);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default listAllSchedulesController;