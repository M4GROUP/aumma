import AppDataSource from "../../data-source";
import { Institution } from "../../entities/Institution.entity";

const deleteInstitutionService = async (institutionId: string) => {
    const institutionRepository = AppDataSource.getRepository(Institution);

    const myInds = await institutionRepository.find({
        where: { id: institutionId }
    });

    const account = myInds.find(
        (institution) => institution.id === institutionId
    );

    const newActive = false;

    await institutionRepository.update(account!.id, { isActive: newActive});

    return true;
};

export default deleteInstitutionService;
