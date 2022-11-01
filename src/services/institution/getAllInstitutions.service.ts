import AppDataSource from "../../data-source";
import { Institution } from "../../entities/Institution.entity";


const getAllInstitutionsService = async () => {
    
    const institutionsRepository = AppDataSource.getRepository(Institution)
    .createQueryBuilder("institution")
    .select([
      "institution.id",
      "institution.name",
      "institution.address",
      "institution.cnpj",
      "institution.ageGroup",
      "institution.phone",
      "institution.email",
      "institution.PCDAccept",
    ])
    .getMany();


  return institutionsRepository

};

export default getAllInstitutionsService;
