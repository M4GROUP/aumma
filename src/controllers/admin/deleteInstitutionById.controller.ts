import { Request, Response } from "express";
import deleteInstitutionByIdService from "../../services/admin/deleteInstitutionById.service"; 
import { AppError, handleError } from "../../errors/AppError";

const deleteInstitutionByIdController = async (req: Request, res: Response) => {
  try {
    const institutionId = req.params.id;
    const user = await deleteInstitutionByIdService(institutionId);

    return res.status(204).json(user);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default deleteInstitutionByIdController;
