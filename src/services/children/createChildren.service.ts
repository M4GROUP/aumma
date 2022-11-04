import AppDataSource from "../../data-source";
import { Childrens } from "../../entities/Childrens.entity";
import { Institution } from "../../entities/Institution.entity";
import { Mother } from "../../entities/Mother.entity";
import { AppError } from "../../errors/AppError";
import {
    IChildrenRequest,
    IChildrenResponse,
} from "../../interfaces/childrens";

export const createChildren_Service = async ({
    name,
    age,
    gender,
    with_disability,
    institutionsId,
    motherId,
}: IChildrenRequest) /* : Promise<IChildrenRequest> */ => {
    const ChildrenRepository = AppDataSource.getRepository(Childrens);
    const MotherRepository = AppDataSource.getRepository(Mother);
    const IntituitionRepository = AppDataSource.getRepository(Institution);

    const children = await ChildrenRepository.find();

    const validChildren = children.find((children) => children.name === name);
    if (validChildren)
        throw new AppError(400, "Children already exist in institution");
    if (!motherId || !institutionsId)
        throw new AppError(400, "Data is requisites");

    const mother = await MotherRepository.findOne({
        where: { id: motherId },
    });
    const institution = await IntituitionRepository.findOne({
        where: { id: institutionsId },
    });

    if (!mother || !institution) {
        throw new AppError(400, "Not Found id of mother or institution");
    }

    const newChildren = new Childrens();
    newChildren.name = name;
    newChildren.age = age;
    newChildren.genre = gender;
    newChildren.isPCD = with_disability;
    newChildren.mother = mother;
   

    await ChildrenRepository.save(newChildren);
    ChildrenRepository.create(newChildren);

    return newChildren;
};
