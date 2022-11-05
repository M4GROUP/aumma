import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { Admin } from "../../entities/Admin.entity";
import { AppError, handleError } from "../../errors/AppError";

const ensureAdminExists = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const email = req.body.email;

        const motherRepository = AppDataSource.getRepository(Admin);
       
        const admins = await motherRepository.find();

        if(!email){throw new AppError(400, 'E-mail is missing')};
      
        const emailAlreadyExists = admins.find(admin => admin.email === email);
        
        if (emailAlreadyExists) {throw new AppError(400,"Email already exists")};

        return next();
        
    } catch (error) {
                
        if(error instanceof AppError) {

            return res.status(error.statusCode).json({message: error.message});

        };

    };

};

export default ensureAdminExists;