import { Request, Response } from "express";
import updateOneChildrenByMotherService from "../../services/children/updateOneChildrenByMother.service";
import { AppError, handleError } from "../../errors/AppError";


const updateOneChildrenByMotherController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedData: any = req.body;

    const user = await updateOneChildrenByMotherService(id, updatedData);

    return res.status(200).json({ message: "Data updated!" });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default updateOneChildrenByMotherController;