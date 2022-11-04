import { Request, Response } from "express";
import listMotherByIdService from "../../services/admin/listMotherById.service";
import { AppError, handleError } from "../../errors/AppError";

const listMotherByIdController = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const instId = id
    const myMother = await listMotherByIdService(instId);

    return res.send(myMother);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default listMotherByIdController;