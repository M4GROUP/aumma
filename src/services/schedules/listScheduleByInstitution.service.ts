import AppDataSource from "../../data-source";
import { Institution } from "../../entities/Institution.entity";
import { Schedules } from "../../entities/Schedules.entity";
import { AppError } from "../../errors/AppError";

export const listScheduleByInstitution_Service = async (
    idInstitution: string
) => {
    const institutionRepository = AppDataSource.getRepository(Institution);

    const institution = await institutionRepository.find({
        where: {
            id: idInstitution,
        },
        relations: { schedules: true },
        withDeleted: true,
    });
    if (!institution) throw new AppError(400, "Id incorrect");

    return institution;
};
