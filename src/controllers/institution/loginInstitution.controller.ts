import { Request, Response } from "express";
import institutionLoginService from "../../services/institution/loginInstitution.service";
import { AppError, handleError } from "../../errors/AppError";

const institutionLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = await institutionLoginService({ email, password });
    return res.status(200).json({ token });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default institutionLoginController;
