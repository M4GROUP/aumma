import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { Admin } from "../../entities/Admin.entity";
import { AppError } from "../../errors/AppError";

const ensureisActiveAdmin = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        
        const id = req.adm.id;        

        const adminRepository = AppDataSource.getRepository(Admin);

        const admin = await adminRepository.findOneBy({id});

        if(!admin?.isActive){throw new AppError(400, "Admin not active")};

        return next();

    } catch (error) {
        
        if(error instanceof AppError) {

            return res.status(error.statusCode).json({message: error.message});

        };

    };

};

export default ensureisActiveAdmin;