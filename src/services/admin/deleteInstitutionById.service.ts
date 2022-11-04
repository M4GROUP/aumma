import AppDataSource from "../../data-source";
import { Institution } from "../../entities/Institution.entity";
import { AppError } from "../../errors/AppError";

const deleteInstitutionByIdService = async (institutionId: string) => {
    const institutionRepository = AppDataSource.getRepository(Institution);

    const myInds = await institutionRepository.find({
        where: { id: institutionId },
    });

    const account = myInds.find(
        (institution) => institution.id === institutionId
    );
    if (!account) {
        throw new AppError(400, "Institution dont exist");
    }

    console.log("*****************", institutionId);

    const newActive = false;

    await institutionRepository.update(account!.id, { isActive: newActive });

    return true;
};

export default deleteInstitutionByIdService;
