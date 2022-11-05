import AppDataSource from "../../data-source";
import { Childrens } from "../../entities/Childrens.entity";
import { AppError } from "../../errors/AppError";
import { IChildrenResponse, IUpdateChildren } from "../../interfaces/childrens";

 const updateOneChildrenByMotherService = async (
    id: string,
    updatedData: IUpdateChildren
)  => {
    if (
        updatedData.name
    ) {
        throw new AppError(
            401,
            "Update is available only for age or isPCD"
        );
    }

    const childrenRepository = AppDataSource.getRepository(Childrens);
    const children = await childrenRepository.findOne({
        where: { id: id },
    });
    if(!children) throw new AppError(400, "children not found");

   const newAge =  updatedData.age? updatedData.age : children.age;
    const newPCD = updatedData.isPCD? updatedData.isPCD: children.isPCD;

    await childrenRepository.update(children!.id, {
        age: newAge,
        isPCD: newPCD
    });
   
    return true;
};


export default updateOneChildrenByMotherService