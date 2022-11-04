import { Request, Response } from "express";
import listAllAdminsService from "../../services/admin/listAllAdmins.service";
import { AppError, handleError } from "../../errors/AppError";

const listAllAdminsController = async (req: Request, res: Response) => {
  try {
    const myAdmins = await listAllAdminsService();

    return res.send(myAdmins);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default listAllAdminsController;