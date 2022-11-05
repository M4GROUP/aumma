import AppDataSource from "../../data-source";
import { Childrens } from "../../entities/Childrens.entity";
import { AppError } from "../../errors/AppError";


 const deleteOneChildrenByMotherService = async (
    id: string
)  => {
    const childrenRepository = AppDataSource.getRepository(Childrens);
    const children = await childrenRepository.findOne({
        where: { id: id },
    });
    if(!children) throw new AppError(400, "children not found");

    const newActive = false;
    await childrenRepository.update(children!.id, {
       isActive:newActive
    });
   
    return true;
};


export default deleteOneChildrenByMotherService
