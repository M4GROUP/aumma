import { Request, Response } from "express";
import listOneMotherService from "../../services/mother/listOneMother.service";

const listOneMotherController = async (req: Request, res: Response) => {

    const id: string = req.params.id;
    console.log(id)

    const mother = await listOneMotherService(id);

    return res.status(200).json(mother);

}

export default listOneMotherController;