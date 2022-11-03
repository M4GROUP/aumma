import { Request, Response } from "express";
import listMothersService from "../../services/mother/listMothers.service";

const listMothersController = async (req: Request, res: Response) => {
    
    const mothers = await listMothersService();
    return res.status(200).json(mothers);
    
};

export default listMothersController;