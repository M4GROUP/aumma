import { instanceToInstance } from "class-transformer";
import AppDataSource from "../../data-source";
import { Institution } from "../../entities/Institution.entity";

const listInstitutionByIdService = async (institutionId: any): Promise<Institution> => {
   
    const institutionRepository = AppDataSource.getRepository(Institution);

    const institution = instanceToInstance(await institutionRepository.findOne({
        relations: { schedules: true },
        where: { id: institutionId },
    }));

    return institution!;

};

export default listInstitutionByIdService;
