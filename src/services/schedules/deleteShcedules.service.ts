import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/Schedules.entity";
import { AppError } from "../../errors/AppError";

export const deleteSchedules_Service = async (id: string) => {
    const schedulerRepository = AppDataSource.getRepository(Schedules);
    const schedules = await schedulerRepository.findOne({
        where: { id: id },
    });
    if(!schedules) {
        return new AppError(404, "Schedules not found");
    };

    schedules.isActive = false;
    await schedulerRepository.save(schedules);
};