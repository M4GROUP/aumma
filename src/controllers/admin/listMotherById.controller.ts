import { Request, Response } from "express";
import listMotherByIdService from "../../services/admin/listMotherById.service";

const listMotherByIdController = async (req: Request, res: Response) => {

  const id = req.params.id;

  const myMother = await listMotherByIdService(id);

  return res.status(200).json(myMother);

};

export default listMotherByIdController;