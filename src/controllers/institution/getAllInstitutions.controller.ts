import { Request, Response } from "express";
import getAllInstitutionsService from "../../services/institution/getAllInstitutions.service";
import { AppError, handleError } from "../../Errors/AppError";

const getAllPropertiesController = async (req: Request, res: Response) => {
  try {
    const property = await getAllInstitutionsService();

    return res.send(property);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default getAllPropertiesController;