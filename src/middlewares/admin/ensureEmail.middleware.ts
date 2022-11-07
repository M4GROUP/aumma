import { Request, Response, NextFunction } from "express";
import { AppError, handleError } from "../../errors/AppError";

const ensureEmail = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const email = req.body.email;

        if(email){throw new AppError(401, "E-mail cannot be updated")};

        return next();

    } catch (error) {
        if(error instanceof AppError) {

            handleError(error, res);   
    
        }
    }

}

export default ensureEmail;