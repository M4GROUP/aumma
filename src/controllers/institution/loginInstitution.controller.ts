import { Request, Response } from "express";
import institutionLoginService from "../../services/institution/loginInstitution.service";
import { AppError, handleError } from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { Institution } from "../../entities/Institution.entity";

const institutionLoginController = async (req: Request, res: Response) => {
  try {
    
    const institutionRepository = AppDataSource.getRepository(Institution);
    const { email, password } = req.body;
    const institutions = await institutionRepository.findOneBy({email});
    if(!institutions){
      throw new AppError(409, "Deu ruim")
    }
    const id_Institution = institutions.id
    const token = await institutionLoginService({ email, password });
    return res.status(200).json({ token, id_Institution });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default institutionLoginController;
