import AppDataSource from "../../data-source";
import { Institution } from "../../entities/Institution.entity";
import { Schedules } from "../../entities/Schedules.entity";
import { AppError } from "../../errors/AppError";

export const listScheduleByInstitution_Service = async (
    idInstitution: string
) => {
    const institutionRepository = AppDataSource.getRepository(Institution);
    const schedulesRepository = AppDataSource.getRepository(Schedules);

    const institution = await institutionRepository.findOne({
        where: {
            id: idInstitution,
        },
    });
    if (!institution) throw new AppError(400, "Id incorrect");

    const listSchedulesInstitution = await schedulesRepository.find({
        where: {
            idInstitution: institution.id,
        },
    });

    return listSchedulesInstitution;
};
