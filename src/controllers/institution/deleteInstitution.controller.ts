import { Request, Response } from "express";
import deleteInstitutionService from "../../services/institution/deleteInstitution.service";
import { AppError, handleError } from "../../errors/AppError";

const deleteInstitutionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user_id = id;

    const user = await deleteInstitutionService(user_id);

    return res.status(204).json({ message: "Institution deleted with success!" });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default deleteInstitutionController;
