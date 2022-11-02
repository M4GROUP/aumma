import AppDataSource from "../../data-source";
import { Childrens } from "../../entities/Childrens.entity";
import { AppError } from "../../errors/AppError";
import { IChildrenResponse, IUpdateChildren } from "../../interfaces/childrens";

export const updateChildren_Service = async (
    id: string,
    { age, with_disability }: IUpdateChildren
) /* : Promise<IChildrenResponse> */ => {
    const childrenRepository = AppDataSource.getRepository(Childrens);
    const children = await childrenRepository.findOne({
        where: { id: id },
    });
    if(!children) throw new AppError(400, "children not found");

    children.age = age;
    children.isPCD = with_disability;

    await childrenRepository.save(children);
    childrenRepository.create(children);

    return children;
};
