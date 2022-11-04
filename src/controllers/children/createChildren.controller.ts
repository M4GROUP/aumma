import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/AppError";
import { createChildren_Service } from "../../services/children/createChildren.service";

export const createChildren = async (req: Request, res: Response) => {
    try {
        const { name, age, genre, isPCD, motherId } = req.body;

        const result = await createChildren_Service({
            name,
            age,
            genre,
            isPCD,
            motherId,
        });
        return res.status(201).json(result);
    } catch (error) {
        if (error instanceof AppError) {
            handleError(error, res);
        }
    }
};
