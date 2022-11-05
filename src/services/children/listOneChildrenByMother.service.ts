import { AppError } from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { IMother } from "../../interfaces/mothers";
import { instanceToInstance } from "class-transformer";
import { Childrens } from "../../entities/Childrens.entity";

const listOneChildrenByMotherService = async (id: string) => {

    const childrenRepository = AppDataSource.getRepository(Childrens);
    
    const childrens = await childrenRepository.find({
        where: { id: id },
        relations: { mother: true},
    })

    const children = instanceToInstance(childrens[0])
    return children;

}

export default listOneChildrenByMotherService;