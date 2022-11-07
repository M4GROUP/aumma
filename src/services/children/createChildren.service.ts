import AppDataSource from "../../data-source";
import { Childrens } from "../../entities/Childrens.entity";
import { Mother } from "../../entities/Mother.entity";
import { AppError } from "../../errors/AppError";
import {
    IChildrenRequest,
    IChildrenResponse,
} from "../../interfaces/childrens";

export const createChildren_Service = async (childrenRequest: IChildrenRequest, motherId: string): Promise<Childrens> => {
    const {age, genre,isPCD,name,institutionsId} = childrenRequest
    
    const childrenRepository = AppDataSource.getRepository(Childrens);
    const motherRepository = AppDataSource.getRepository(Mother);
    
    if (!motherId){throw new AppError(400, "Data is requisites")};
  
    const mother = await motherRepository.findOneBy({id: motherId});
    
    const children = await childrenRepository.find();
    
    const validChildren = children.find((children) => children.name === name);
    
    if (validChildren){throw new AppError(400, "Children already exist ")};
    
    if (!mother){throw new AppError(400, "Not Found id of mother")};
    const newChildren = new Childrens();
    newChildren.name = name;
    newChildren.age = age;
    newChildren.genre = genre;
    newChildren.isPCD = isPCD;
    newChildren.mother = mother;
    
    const newChild =  childrenRepository.create(newChildren);

    newChild.isActive = true
    
    await childrenRepository.save(newChild);

    return newChild;
};
