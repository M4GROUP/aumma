import { Request, Response } from "express";
import updateAdminByIdService from "../../services/admin/updateAdmin.service";

const updateAdminByIdController = async (req: Request, res: Response) => {

  const id = req.params.id;

  const updatedData = req.body;

  const user = await updateAdminByIdService(id, updatedData);

  return res.status(200).json(user);

};

export default updateAdminByIdController;
