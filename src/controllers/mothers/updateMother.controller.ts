import { Request, Response } from "express";
import updateMotherService from "../../services/mother/updateMother.service";

const updateMotherController = async (req: Request, res: Response) => {
    const mother = req.body;

    const id = req.params.id;

    const newMother = await updateMotherService(id, mother);

    return res.status(200).json(newMother)
}

export default updateMotherController;