import { Request, Response } from "express";
import updateMotherByIdService from "../../services/admin/updateMotherById.service";

const updateMotherByIdController = async (req: Request, res: Response) => {
    const mother = req.body;

    const id = req.params.id;

    const newMother = await updateMotherByIdService(id, mother);

    return res.status(200).json(newMother);
};

export default updateMotherByIdController;
