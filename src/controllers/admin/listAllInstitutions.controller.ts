import { Request, Response } from "express";
import listAllInstitutionsService from "../../services/admin/listAllInstitutions.service";
import { AppError, handleError } from "../../errors/AppError";

const listAllInstitutionsController = async (req: Request, res: Response) => {

  const myInstitutions = await listAllInstitutionsService();
  console.log(req.params)
    return res.status(200).json(myInstitutions);

};

export default listAllInstitutionsController;