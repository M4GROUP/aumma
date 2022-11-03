import { Request, Response } from "express";
import deleteInstitutionByIdService from "../../services/admin/deleteInstitutionById.service"; 
import { AppError, handleError } from "../../errors/AppError";

const deleteInstitutionByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user_id = id;

    const user = await deleteInstitutionByIdService(user_id);

    return res.status(204).json({message:"Institution deleted with success!"});
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default deleteInstitutionByIdController;
