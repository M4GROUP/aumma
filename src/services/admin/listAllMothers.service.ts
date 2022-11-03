import AppDataSource from "../../data-source";
import { Mother } from "../../entities/Mother.entity";

const listAllMothersService = async () => {
    const motherRepository = AppDataSource.getRepository(Mother);

    const mothers = await motherRepository.find({
        relations: {childrens:true, schedulesMother:true},
    });
    return mothers;
};

export default listAllMothersService;
