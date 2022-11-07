import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/AppError";
import { createChildren_Service } from "../../services/children/createChildren.service";

export const createChildren = async (req: Request, res: Response) => {
    try {
        const children = req.body;

        const motherId = req.mother.sub
        const result = await createChildren_Service(children, motherId);
        console.log(motherId)

        return res.status(201).json(result);
    } catch (error) {
        if (error instanceof AppError) {
            handleError(error, res);
        }
    }
};
