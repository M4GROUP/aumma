import { Request, Response } from "express";
import { updateChildren_Service } from "../../services/children/updateChildren.service";

export const updateChildren = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { age, with_disability } = req.body;
    const result = await updateChildren_Service(id, {age, with_disability});

    return res.status(200).json(result);
};