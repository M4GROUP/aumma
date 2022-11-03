import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { Mother } from "../../entities/Mother.entity";
import { AppError } from "../../errors/AppError";

const ensureMotherId = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
    
        const id = req.params.id;

        const tokenId = req.mother
        
        const motherRepository = AppDataSource.getRepository(Mother);
        
        if(!id){ throw new AppError(401, "Invalid id") };
        
        if(id !== tokenId.sub){ throw new AppError(404, "Invalid id") };
        
        const mother = await motherRepository.findOneBy({id});

        if(!mother){ throw new AppError(404, "Mother not found") };
        
        return next();

    } catch (error) {
        
        if(error instanceof AppError) {

            return res.status(error.statusCode).json({message: error.message});

        };

    };

};

export default ensureMotherId;
