import AppDataSource from "../../data-source";
import { Mother } from "../../entities/Mother.entity";

const deleteMotherService = async (id: string): Promise<object> => {
    const motherRepository = AppDataSource.getRepository(Mother);

    const mother = await motherRepository.findOneBy({id});

    mother!.isActive = false;

    await motherRepository.save(mother!);

    return {isActive:  mother!.isActive};

};

export default deleteMotherService;