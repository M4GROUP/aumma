import AppDataSource from "../../data-source";
import { Institution } from "../../entities/Institution.entity";

const listAllInstitutionsService = async (): Promise<Institution[]> => {

    const institutionsRepository = AppDataSource.getRepository(Institution);

    const institutions = await institutionsRepository.find();
console.log(institutions)
    return institutions;

};

export default listAllInstitutionsService;
