import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError, handleError } from "../../errors/AppError";

const ensureInstitutionAuthMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let token = req.headers.authorization?.split(" ")[1];
console.log(token)
        if (!token) {
            throw new AppError(401, "No token found");
        }

        jwt.verify(
            token,
            process.env.SECRET_KEY as string,
            (error: any, decoded: any) => {
                if (error) {
                    throw new AppError(401, "Invalid Token");
                }

                req.institution = {
                    id: decoded.id,
                };

                return next();
            }
        );
    } catch (error) {
        if (error instanceof AppError) {
            handleError(error, res);
        }
    }
};

export default ensureInstitutionAuthMiddleware;
