import { Request, Response } from "express";
import createAdminService from "../../services/admin/createAdmin.service";
import { AppError, handleError } from "../../errors/AppError";

const createAdminController = async (req: Request, res: Response) => {
    try {
        const { name, email, password, isAdm } = req.body;

        const newProperty = await createAdminService({
            name,
            email,
            password,
            isAdm,
        });

        return res.status(201).send(newProperty);
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res);
        }
    }
};

export default createAdminController;
