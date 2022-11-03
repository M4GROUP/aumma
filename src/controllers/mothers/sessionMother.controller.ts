import { Request, Response } from "express";
import sessionMotherService from "../../services/mother/sessionMother.service";

const sessionMotherController = async (req: Request, res: Response) => {
   
    const mother = req.body;
   
    const session = await sessionMotherService(mother);
   
    return res.status(200).json(session);

};

export default sessionMotherController;