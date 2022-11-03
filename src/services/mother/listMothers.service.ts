import AppDataSource from "../../data-source";
import { Mother } from "../../entities/Mother.entity";
import { IMother } from "../../interfaces/mothers";

const listMothersService = async (): Promise<IMother[]> => {
    
    const motherRepository = AppDataSource.getRepository(Mother);
    
    const mothers = await motherRepository.find();
    
    return mothers;
};

export default listMothersService;