import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

const ensureAuthAdm = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
            throw new AppError(401, "Invalid Token");
        }

        token = token.split(" ")[1];

        jwt.verify(
            token,
            process.env.SECRET_KEY as string,
            (error, decoded: any) => {
                if (error) {
                    throw new AppError(401, "Invalid Token");
                }

                req.adm = decoded;

                return next();
            }
        );
    } catch (error) {
        if (error instanceof AppError) {
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        }
    }
};

export default ensureAuthAdm;
