import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/Schedules.entity";
import { AppError } from "../../errors/AppError";

export const deleteSchedules_Service = async (id: string) => {
    const schedulerRepository = AppDataSource.getRepository(Schedules);
    const schedules = await schedulerRepository.find({where: { id: id },
    });
    
    const account = schedules.find(
        (schedules) => schedules.id === id
        );
        if(!account) {
            return new AppError(404, "Schedules not found");
        };
        
    const newActive = false;
    const newDeleted = new Date()
    await schedulerRepository.update(account!.id,{isActive: newActive, deletedAt: newDeleted})

   return true
};