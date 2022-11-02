import { Request, Response } from "express";
import updateInstitutionService from "../../services/institution/updateInstitution.service";
import { AppError, handleError } from "../../errors/AppError";


const updateInstitutionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedData: any = req.body;

    const user = await updateInstitutionService(id, updatedData);

    return res.status(200).json({ message: "Data updated!" });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default updateInstitutionController;
