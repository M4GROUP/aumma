import { Request, Response } from "express";
import createMotherService from "../../services/mother/createMother.service";

const createMotherController = async (req: Request, res: Response) => {
    
    const mother = req.body;

    const newMother = await createMotherService(mother);
// console.log(newMother)
    return res.status(201).json(newMother);

}
export default createMotherController;