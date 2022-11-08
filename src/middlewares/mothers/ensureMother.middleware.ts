import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { Mother } from "../../entities/Mother.entity";
import { AppError, handleError } from "../../errors/AppError";
import * as bcrypt from 'bcryptjs'

const ensureMother = async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const email = req.body.email;

        const motherRepository = AppDataSource.getRepository(Mother);

        if(!email){throw new AppError(400, 'E-mail is missing')};        
        
        const mother = await motherRepository.findOneBy({email});

        if(!mother){throw new AppError(403, "Account not found!")};       
        
        const passwordMatch = await bcrypt.compare(req.body.password, mother.password);

        if(!passwordMatch) {throw new AppError(403, 'Invalid email or password')};

        return next();

    } catch (error) {
        
        if(error instanceof AppError) {

            return res.status(error.statusCode).json({message: error.message});

        };

    };

};

export default ensureMother;