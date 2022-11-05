import { Request, Response } from "express";
import listOneChildrenByMotherService from "../../services/children/listOneChildrenByMother.service";
const listOneChildrenByMotherController = async (req: Request, res: Response) => {

    const id: string = req.params.id;

    const mother = await listOneChildrenByMotherService(id);

    return res.status(200).json(mother);

}

export default listOneChildrenByMotherController;