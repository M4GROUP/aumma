import { Router } from "express";

import createScheduleController from "../../controllers/schedules/createSchedule.controller";
import { deleteSchedules } from "../../controllers/schedules/deleteSchedules";
import { listSchedules } from "../../controllers/schedules/listSchedules";
import ensureInstitutionAuthMiddleware from "../../middlewares/institutions/ensureAuthInstitution.middleware";

const routes = Router()

const schedulesRoutes = () => {

    routes.post("/:id", ensureInstitutionAuthMiddleware, createScheduleController)
    routes.get("", listSchedules)
    routes.delete("/:id", deleteSchedules)
    routes.get("/:id/mother", /* listAllMotherSchedules */)
    routes.get("/:id/intitution", /* listAllIntituitionSchedules */)

    return routes

}

export default schedulesRoutes
