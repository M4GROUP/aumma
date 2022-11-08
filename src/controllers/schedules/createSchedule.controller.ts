import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/AppError";
import createScheduleService from "../../services/schedules/createSchedule.service";

const createScheduleController = async (req: Request, res: Response) => {
    try {

        const {name, date, period, childrensId} = req.body
        console.log(body)
        const institutionsId = req.params.id
        const scheduleCreated = await createScheduleService({name, date, period, childrensId, institutionsId})
        res.status(201).json(scheduleCreated)

    }catch (err) {

        if (err instanceof AppError) {
            handleError(err, res);
        }
        
    }
}

export default createScheduleController