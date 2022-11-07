import { Request, Response } from "express";
import loginAdminService from "../../services/admin/loginAdmin.service";

const loginAdminController = async (req: Request, res: Response) => {

    const admin = req.body;

    const token = await loginAdminService(admin);

    return res.status(200).json( token);

};

export default loginAdminController;
