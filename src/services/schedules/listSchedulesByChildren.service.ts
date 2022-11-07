import AppDataSource from "../../data-source";
import { Childrens } from "../../entities/Childrens.entity";
import { Schedules } from "../../entities/Schedules.entity";
import { AppError } from "../../errors/AppError";

export const listSchedulesByChildren_Service = async (id: string) => {
    const schedulesRepository = AppDataSource.getRepository(Schedules);
    const childrenRepository = AppDataSource.getRepository(Childrens);

    const children = await childrenRepository.findOne({
        where: {
            id: id,
        },
    });
    if (!children) throw new AppError(400, "Children not found");

    const listSchedules = await schedulesRepository.find({
        where: {
            idChildren: children.id,
        },
    });
    if (listSchedules.length === 0)
        return { message: "No schedules exist for children" };

    return listSchedules;    
};
