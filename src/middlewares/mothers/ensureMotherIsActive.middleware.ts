import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { Mother } from "../../entities/Mother.entity";
import { AppError } from "../../errors/AppError";

const ensureMotherIsActive = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        
        const id = req.params.id;

        const motherRepository = AppDataSource.getRepository(Mother);

        const mother = await motherRepository.findOneBy({id});

        if(!mother?.isActive){throw new AppError(401, "User not active")};

        return next();

    } catch (error) {
        
        if(error instanceof AppError) {

            return res.status(error.statusCode).json({message: error.message});

        };

    };

};

export default ensureMotherIsActive;