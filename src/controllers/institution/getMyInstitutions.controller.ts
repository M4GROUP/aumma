import { Request, Response } from "express";
import getMyInstitutionsService from "../../services/institution/getMyInstitutions.service";
import { AppError, handleError } from "../../errors/AppError";

const getMyInstitutionsController = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    
    const instId = id
    const myInstitution = await getMyInstitutionsService(instId);

    return res.send(myInstitution);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default getMyInstitutionsController;