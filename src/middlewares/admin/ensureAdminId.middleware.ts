import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { Admin } from "../../entities/Admin.entity";
import { AppError, handleError } from "../../errors/AppError";

const ensureAdminId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const adminRepository = AppDataSource.getRepository(Admin);

        const admin = await adminRepository.findOneBy({id});

        if(!admin) {throw new AppError(404, "User not found!")};
        
        return next();
    
    } catch (error) {

        if(error instanceof AppError) {

            return res.status(error.statusCode).json({message: error.message})

        };
    }
}

export default ensureAdminId;