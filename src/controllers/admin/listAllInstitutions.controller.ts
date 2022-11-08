import { Request, Response } from "express";
import listAllInstitutionsService from "../../services/admin/listAllInstitutions.service";


const listAllInstitutionsController = async (req: Request, res: Response) => {
  const myInstitutions = await listAllInstitutionsService();

    return res.status(200).json(myInstitutions);

};

export default listAllInstitutionsController;