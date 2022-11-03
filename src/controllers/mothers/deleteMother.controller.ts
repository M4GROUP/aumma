import { Request, Response } from "express";
import deleteMotherService from "../../services/mother/deleteMother.service";

const deleteMotherController = async (req: Request, res: Response) => {

    const id = req.params.id;

    const deletedMother = await deleteMotherService(id);
    console.log(deletedMother)

    return res.status(204).json(deletedMother);

};

export default deleteMotherController;