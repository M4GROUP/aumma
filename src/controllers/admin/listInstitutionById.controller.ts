import { Request, Response } from "express";
import listInstitutionByIdService from "../../services/admin/listInstitutionById.service";
import { AppError, handleError } from "../../errors/AppError";

const listInstitutionByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    
    const myInstitution = await listInstitutionByIdService(id);

    return res.send(myInstitution);
    
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default listInstitutionByIdController;