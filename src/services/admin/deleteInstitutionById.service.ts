import AppDataSource from "../../data-source";
import { Institution } from "../../entities/Institution.entity";
import { AppError } from "../../errors/AppError";

const deleteInstitutionByIdService = async (institutionId: string): Promise<object> => {
    const institutionRepository = AppDataSource.getRepository(Institution);

    const institution = await institutionRepository.findOneBy({id: institutionId})

    await institutionRepository.update(institution!.id, { isActive: false });

    return {message:"Institution deleted with success!"};
};

export default deleteInstitutionByIdService;
