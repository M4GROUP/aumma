import { Request, Response } from "express";
import listAllChidrensByMotherService from "../../services/children/listAllChildrensByMother.service";

const listAllChildrensByMotherController = async (req: Request, res: Response) => {

    const id: string = req.params.id;

    const mother = await listAllChidrensByMotherService(id);

    return res.status(200).json(mother);

}

export default listAllChildrensByMotherController;