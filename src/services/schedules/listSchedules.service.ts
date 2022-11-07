import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/Schedules.entity";
import { IScheduleResponse } from "../../interfaces/schedules";

export const listSchedules_Service = async () => {
    const schedulesRepository = AppDataSource.getRepository(Schedules);
    const schedules = await schedulesRepository.find();
    
    const schedulesActive = schedules.filter( s => s.isActive);

    return schedulesActive;
};