import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

const ensureIsActiveFalse = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const isActive = req.body.isActive;
        if (
            !isActive
        ) {
            throw new AppError(
                401,
                "Update is available only for name, password, address, ageGroup, phone"
            );
        }
        return next();
    
    } catch (error) {
                
        if(error instanceof AppError) {

            return res.status(error.statusCode).json({message: error.message});

        };

    }

}

export default ensureIsActiveFalse;