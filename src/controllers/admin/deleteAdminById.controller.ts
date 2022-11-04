import { Request, Response } from "express";

import { AppError, handleError } from "../../errors/AppError";
import deleteAdminByIdService from "../../services/admin/deleteAdminById.service";

const deleteAdminByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user_id = id;

        const user = await deleteAdminByIdService(user_id);

        return res
            .status(204)
            .json({ message: "Admin deleted with success!" });
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res);
        }
    }
};

export default deleteAdminByIdController;
