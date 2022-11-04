import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { Admin } from "../../entities/Admin.entity";
import { AppError } from "../../errors/AppError";

const ensurePrivilegeAdmin = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        
        const id = req.adm.id

        const adminRepository = AppDataSource.getRepository(Admin);

        const admin = await adminRepository.findOneBy({id});

        if(!admin?.isAdm){throw new AppError(400, "Admin`s dont have the privilege for this operation")};

        return next();

    } catch (error) {
        
        if(error instanceof AppError) {

            return res.status(error.statusCode).json({message: error.message});

        };

    };

};

export default ensurePrivilegeAdmin;