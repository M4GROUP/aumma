import { Request, Response } from "express";
import listAllMothersService from "../../services/admin/listAllMothers.service";
import { AppError, handleError } from "../../errors/AppError";

const listAllMothersController = async (req: Request, res: Response) => {
    try {
        const myMothers = await listAllMothersService();

        return res.send(myMothers);
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res);
        }
    }
};

export default listAllMothersController;
