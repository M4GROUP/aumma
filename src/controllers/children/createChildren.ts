import { Request, Response } from "express";
import { createChildren_Service } from "../../services/children/createChildren.service";

export const createChildren = async (req: Request, res: Response) => {
    const { 
        name,
        age,
        genre, 
        isPCD, 
        institutionsId, 
        motherId 
    } = req.body;

    const result = await createChildren_Service({
        name,
        age,
        genre,
        isPCD,
        institutionsId,
        motherId,
    });

    return res.status(201).json(result);
};
