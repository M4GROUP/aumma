import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { Mother } from "../../entities/Mother.entity";
import { AppError, handleError } from "../../errors/AppError";

const ensureExistsMother = async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const email = req.body.email;

        const motherRepository = AppDataSource.getRepository(Mother);
        const mothers = await motherRepository.find();


        if(!email){throw new AppError(400, 'E-mail is missing')};
      
      
          const emailAlreadyExists = mothers.find(mother => mother.email === email);
        
        if (emailAlreadyExists) {throw new AppError(400,"Email already exists")};

        return next();

    } catch (error) {   
        
        if(error instanceof AppError) {

            return res.status(error.statusCode).json({message: error.message});

        };

    };

};

export default ensureExistsMother;