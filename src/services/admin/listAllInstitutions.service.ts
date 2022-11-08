import AppDataSource from "../../data-source";
import { Institution } from "../../entities/Institution.entity";

const listAllInstitutionsService = async () => {

    const institutionRepository = AppDataSource.getRepository(Institution);

    const institutions =await institutionRepository.find();
    return institutions
};

export default listAllInstitutionsService;
