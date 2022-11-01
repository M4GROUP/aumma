import AppDataSource from "../../data-source";
import { Institutions } from "../../entities/institutions.entity";


const getAllInstitutionsService = async () => {
    
    const institutionsRepository = AppDataSource.getRepository(Institutions);
    const allInstitutions = institutionsRepository.find()

    return allInstitutions

};

export default getAllInstitutionsService;
