import { Request, Response } from "express";
import { IChildrenResponse } from "../../interfaces/childrens";
import { listChildren_Service } from "../../services/children/listChildren.service";

export const listChildren = async (req: Request, res: Response) => {
    const result = await listChildren_Service();
    return res.status(200).json(result);
}