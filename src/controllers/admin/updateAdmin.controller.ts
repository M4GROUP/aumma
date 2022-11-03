import { Request, Response } from "express";
import updateAdminByIdService from "../../services/admin/updateAdmin.service";
import { AppError, handleError } from "../../errors/AppError";


const updateAdminByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedData: any = req.body;

    const user = await updateAdminByIdService(id, updatedData);

    return res.status(200).json({ message: "Data updated!" });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default updateAdminByIdController;
