import { Request, Response } from "express";
import { deleteChildren_Service } from "../../services/children/deleteChildren.service";

export const deleteChildren = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteChildren_Service(id);
    return res.status(204).json(result);
}