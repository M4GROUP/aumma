import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/AppError";

const ensureIsInstitutionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const {id} = req.params
    if(!req.institution.id){
        throw new AppError(404, "Unauthorized");
    }
    if(req.institution.id === id){
        console.log("*****************", req.institution.id)
        next();
    }
    if(req.institution.id !== id){
        console.log("####################", req.institution.id, id)
        throw new AppError(404, "Unauthorized");
    }
    
  
};

export default ensureIsInstitutionMiddleware