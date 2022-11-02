import { Request, Response } from "express";
import getAllInstitutionsService from "../../services/institution/getAllInstitutions.service";
import { AppError, handleError } from "../../errors/AppError";

const getAllInstitutionsController = async (req: Request, res: Response) => {
  try {
    const property = await getAllInstitutionsService();

    return res.send(property);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default getAllInstitutionsController;