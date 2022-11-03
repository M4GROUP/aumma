import jwt  from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

const ensureAuthMother = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        
        let token = req.headers.authorization;

        if(!token){throw new AppError(401,'Invalid Token' )};

        token = token.split(' ')[1];
        
        jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
            
            if(error){
                console.log('iunu')
                throw new AppError(401, 'Invalid Token')
            };

            req.mother = decoded
            
            return  next();
        });

    } catch (error) {
            
        if(error instanceof AppError) {

            return res.status(error.statusCode).json({message: error.message});

        };

    };

};

export default ensureAuthMother;