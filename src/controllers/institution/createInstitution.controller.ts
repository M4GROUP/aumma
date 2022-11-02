import { Request, Response } from "express";
import createInstitutionService from "../../services/institution/createInstitution.service";
import { AppError, handleError } from "../../errors/AppError";


const createInstitutionController = async (req: Request, res: Response) => {
  try {
    const {name,address,cnpj,ageGroup,phone,email,password,PCDAccept} = req.body;

    const newProperty = await createInstitutionService({name,address,cnpj,ageGroup,phone,email,password,PCDAccept});

    return res.status(201).send(newProperty);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default createInstitutionController;