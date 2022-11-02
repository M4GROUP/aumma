import AppDataSource from "../../data-source";
import { Childrens } from "../../entities/Childrens.entity";
import { IChildrenResponse } from "../../interfaces/childrens";

export const listChildren_Service = async ()/* : Promise<IChildrenResponse[]> */ => {
    const childrenRepository = AppDataSource.getRepository(Childrens);
    const children = await childrenRepository.find();
    return children;
};