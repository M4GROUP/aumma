import { Request, Response } from "express";
import listInstitutionByIdService from "../../services/admin/listInstitutionById.service";
import { AppError, handleError } from "../../errors/AppError";

const listInstitutionByIdController = async (req: Request, res: Response) => {

  const id = req.params.id
  
  const myInstitution = await listInstitutionByIdService(id);

  return res.status(200).json(myInstitution);
   
};

export default listInstitutionByIdController;