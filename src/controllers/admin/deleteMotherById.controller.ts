import { Request, Response } from "express";
import deleteMotherByIdService from "../../services/admin/deleteMotherById.service";

const deleteMotherByIdController = async (req: Request, res: Response) => {

    const id = req.params.id;

    const deletedMother = await deleteMotherByIdService(id);

    return res.status(204).json(deletedMother);

};

export default deleteMotherByIdController;