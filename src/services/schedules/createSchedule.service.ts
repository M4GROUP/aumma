import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/Schedules.entity";
import { AppError } from "../../errors/AppError";
import { IScheduleRequest } from "../../interfaces/schedules";

const createScheduleService = async ({name, date, period, idChildren, idInstitution}: IScheduleRequest): Promise<IScheduleRequest> => {
   
    const schedulesRepository = AppDataSource.getRepository(Schedules)

    const schedulesAlreadyExists = await schedulesRepository.findOneBy({ name: name })

    if(schedulesAlreadyExists){
        throw new AppError(400, "Schedules already exists")
    }

    if(!name){
        throw new AppError(404, "Name is missing")
    }

    if(!date){
        throw new AppError(404, "Date is missing")
    }

    if(!period){
        throw new AppError(404, "Period is missing")
    }

    if(!idChildren){
        throw new AppError(404, "Children is missing")
    }

    if(!idInstitution){
        throw new AppError(404, "Intituition is missing")
    }

    const newSchedule = new Schedules()
     newSchedule.name = name
     newSchedule.date = date
     newSchedule.period = period
     newSchedule.idChildren = idChildren
     newSchedule.idInstitution = idInstitution

    const schedule =  schedulesRepository.create( newSchedule )

    await schedulesRepository.save(schedule)

    return schedule

}

export default createScheduleService