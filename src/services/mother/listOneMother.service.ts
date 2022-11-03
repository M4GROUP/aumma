import { AppError } from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { Mother } from "../../entities/Mother.entity";
import { IMother } from "../../interfaces/mothers";
import { instanceToInstance } from "class-transformer";

const listOneMotherService = async (id: string) => {

    const motherRepository = AppDataSource.getRepository(Mother);
    
    const mother = await motherRepository.find({where: {id:id}, relations: {childrens: true, schedulesMother:true}});

    // if(!mother){ throw new AppError(400, 'User Not found')};

    return mother;

}

export default listOneMotherService;