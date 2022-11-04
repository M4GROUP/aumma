import { Request, Response } from "express";
import loginAdminService from "../../services/admin/loginAdmin.service";
import { AppError, handleError } from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { Admin } from "../../entities/Admin.entity";

const loginAdminController = async (req: Request, res: Response) => {
    try {
        const adminRepository = AppDataSource.getRepository(Admin);
        const { email, password } = req.body;
        const admin = await adminRepository.findOneBy({ email });
        if (!admin) {
            throw new AppError(409, "Account Admin don`t exist");
        }
        const id_Admin = admin.id;
        const token = await loginAdminService({ email, password });
        return res.status(200).json({ token, id_Admin });
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res);
        }
    }
};

export default loginAdminController;
