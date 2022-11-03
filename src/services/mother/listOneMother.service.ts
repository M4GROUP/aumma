import { AppError } from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { Mother } from "../../entities/Mother.entity";
import { IMother } from "../../interfaces/mothers";
import { instanceToInstance } from "class-transformer";

const listOneMotherService = async (id: string): Promise<IMother> => {

    const motherRepository = AppDataSource.getRepository(Mother);
    
    const mothers = await motherRepository.find({where: {id:id}, relations: {childrens: true, schedulesMother:true}});

    // if(!mother){ throw new AppError(400, 'User Not found')};
    const mother = instanceToInstance(mothers[0])

    return mother;

}

export default listOneMotherService;