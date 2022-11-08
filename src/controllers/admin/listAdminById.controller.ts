import { Request, Response } from "express";

import { AppError, handleError } from "../../errors/AppError";
import listAdminByIdService from "../../services/admin/listAdminById.service";

const listAdminByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    const admin = await listAdminByIdService(id);

    return res.status(200).json(admin);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default listAdminByIdController;