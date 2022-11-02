import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError, handleError } from "../errors/AppError";
import AppDataSource from "../data-source";
import { Institution } from "../entities/Institution.entity";

const ensureIsInstitutionMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  try{
    const id = req.params.id;

    const institutionRepository = AppDataSource.getRepository(Institution);
    const institutions = await institutionRepository.findOneBy({ id });

     if (!institutions) {
         throw new AppError(404, "Institution don`t exist")
     }
     
    return next();
  }catch(error){
    if(error instanceof AppError){
      handleError(error,res)
      
    }
  }
};

export default ensureIsInstitutionMiddleware;
