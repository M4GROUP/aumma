import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

const ensurePassword = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
    
        const mother = req.body;

        if(!mother.password){throw new AppError(400, 'Password is missing')};

        return next();

    } catch (error) {
        
        if(error instanceof AppError){

            return res.status(error.statusCode).json({message: error.message});

        };

    };

};

export default ensurePassword;