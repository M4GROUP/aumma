import { AppError } from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { Mother } from "../../entities/Mother.entity";
import { IMother } from "../../interfaces/mothers";
import { instanceToInstance } from "class-transformer";

const listAllChidrensByMotherService = async (id: string): Promise<IMother> => {

    const motherRepository = AppDataSource.getRepository(Mother);
    
    const mothers = await motherRepository.find({
        relations: {
            childrens: true, 
        },
        where: {
            id:id
        }, 
    });

    const mother = instanceToInstance(mothers[0])
    return mother;

}

export default listAllChidrensByMotherService;