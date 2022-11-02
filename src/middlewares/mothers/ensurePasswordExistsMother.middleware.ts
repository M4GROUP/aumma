import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { Mother } from "../../entities/Mother.entity";
import { AppError, handleError } from "../../errors/AppError";

const verifyExistsMother = async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const email = req.body.email;

        const motherRepository = AppDataSource.getRepository(Mother);

        if(!email){throw new AppError(400, 'E-mail is missing')};

        const mother = await motherRepository.findOneBy({email});

        if (!mother) {throw new AppError(400,"Email already exists")};

        return next();

    } catch (error) {
        
        if(error instanceof AppError) {

            return res.status(error.statusCode).json({message: error.message});

        };

    };

};

export default verifyExistsMother;