import { Request, Response, NextFunction } from "express";
import { AppError, handleError } from "../../errors/AppError";

const ensurePasswordOrName = async (req: Request, res: Response, next: NextFunction) => {
   
    try {
        
        const admin = req.body;

        if (admin.name.length < 3) {
            throw new AppError(
                404,
                "Admin name must have more letters than 3"
            );
        }

        if (admin.password.length > 10 || admin.password.length < 2) {
            throw new AppError(
                400,
                "Password must have 3 digits or at least 10"
            );
        }

        return next();
   
    } catch (error) {
   
        if(error instanceof AppError) {

            handleError(error, res)
        
        };
    };

};

export default ensurePasswordOrName;