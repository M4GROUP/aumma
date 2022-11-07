import AppDataSource from "../../data-source";
import { Childrens } from "../../entities/Childrens.entity";
import { Mother } from "../../entities/Mother.entity";
import { AppError } from "../../errors/AppError";
import {
    IChildrenRequest,
    IChildrenResponse,
} from "../../interfaces/childrens";

export const createChildren_Service = async ({
    name,
    age,
    genre,
    isPCD,
    motherId
}: IChildrenRequest) /* : Promise<IChildrenRequest> */ => {

    console.log(motherId);

    const ChildrenRepository = AppDataSource.getRepository(Childrens);
    const MotherRepository = AppDataSource.getRepository(Mother);


    const children = await ChildrenRepository.find();

    const validChildren = children.find((children) => children.name === name);
    if (validChildren)
        throw new AppError(400, "Children already exist ");
    if (!motherId)
        throw new AppError(400, "Data is requisites");

    const mother = await MotherRepository.findOne({
        where: { id: motherId },
    });
    if (!mother) {
        throw new AppError(400, "Not Found id of mother");
    }

    const newChildren = new Childrens();
    newChildren.name = name;
    newChildren.age = age;
    newChildren.genre = genre;
    newChildren.isPCD = isPCD;
    newChildren.mother = mother;
   

    await ChildrenRepository.save(newChildren);
    ChildrenRepository.create(newChildren);

    const newChild = {
        id: newChildren.id,
        name: name,
        age: newChildren.age,
        genre: newChildren.genre,
        isPCD: newChildren.isPCD ,
        mother: newChildren.mother,
       
    };

    return newChild;
};
