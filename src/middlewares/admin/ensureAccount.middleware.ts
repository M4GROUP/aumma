import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { Admin } from "../../entities/Admin.entity";
import { AppError } from "../../errors/AppError";
import * as bcrypt from 'bcryptjs'

const ensureAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const email = req.body.email;

        const adminRepository = AppDataSource.getRepository(Admin);

        if(!email){throw new AppError(400, 'E-mail is missing')};        
        
        const admin = await adminRepository.findOneBy({email});

        if(!admin){throw new AppError(403, "Account not found!")};       
        
        const passwordMatch = await bcrypt.compare(req.body.password, admin!.password);
        
        console.log(passwordMatch)       
         if(!passwordMatch) {throw new AppError(403, 'Invalid email or password')};

        return next();

    } catch (error) {
        
        if(error instanceof AppError) {

            return res.status(error.statusCode).json({message: error.message});

        };

    }
};

export default ensureAccount;