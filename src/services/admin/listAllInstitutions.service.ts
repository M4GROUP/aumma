import AppDataSource from "../../data-source";
import { Institution } from "../../entities/Institution.entity";

const listAllInstitutionsService = async () => {
    const institutionsRepository = AppDataSource.getRepository(Institution);

    const myInds = await institutionsRepository.find({});
    return myInds;
};

export default listAllInstitutionsService;
