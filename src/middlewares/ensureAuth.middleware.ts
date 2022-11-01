import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/AppError";

const ensureAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError(401, "No token found")
  }

  jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
        if(error){
            throw new AppError(401, "Invalid Token")
        }

      req.user = {
        id: decoded.id,
      };

      return next();
    }
  );
};

export default ensureAuthMiddleware;