import AppDataSource from "../../data-source";

import { Schedules } from "../../entities/Schedules.entity";

const listAllSchedulesService = async () => {
    const schedulesRepository = AppDataSource.getRepository(Schedules);

    const schedule = await schedulesRepository.find({
        relations: {
            institution:true, 
        },
    });
    return schedule;
};

export default listAllSchedulesService;
