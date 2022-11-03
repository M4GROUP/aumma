import { Request, Response } from "express";

import { AppError, handleError } from "../../errors/AppError";
import listAdminByIdService from "../../services/admin/listAdminById.service";

const listAdminByIdController = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const instId = id
    const myAdmin = await listAdminByIdService(instId);

    return res.send(myAdmin);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default listAdminByIdController;