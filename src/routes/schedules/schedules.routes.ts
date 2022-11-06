import { Router } from "express";

import createScheduleController from "../../controllers/schedules/createSchedule.controller";

const routes = Router()

const schedulesRoutes = () => {

    routes.post("", createScheduleController)
    routes.get("", /* listAllSchedules */)
    routes.delete("/:id", /* SOFTdeleteSchedule */)
    routes.get("/:id/mother", /* listAllMotherSchedules */)
    routes.get("/:id/intitution", /* listAllIntituitionSchedules */)

    return routes

}

export default schedulesRoutes
