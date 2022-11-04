import { Request, Response } from "express";
import deleteOneChildrenByMotherService from "../../services/children/deleteOneChildrenByMother.service";
import { AppError, handleError } from "../../errors/AppError";


const deleteOneChildrenByMotherController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await deleteOneChildrenByMotherService(id);

    return res.status(204).json({ message: "Deleted with success!" });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default deleteOneChildrenByMotherController;