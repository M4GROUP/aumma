import { Request, Response } from "express";
import listAllInstitutionsService from "../../services/admin/listAllInstitutions.service";
import { AppError, handleError } from "../../errors/AppError";

const listAllInstitutionsController = async (req: Request, res: Response) => {
  try {
    const myInstitutions = await listAllInstitutionsService();

    return res.send(myInstitutions);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default listAllInstitutionsController;