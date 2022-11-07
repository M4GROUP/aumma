import { Router } from "express";

import createScheduleController from "../../controllers/schedules/createSchedule.controller";
import ensureInstitutionAuthMiddleware from "../../middlewares/institutions/ensureAuthInstitution.middleware";

const routes = Router()

const schedulesRoutes = () => {

    routes.post("/:id", ensureInstitutionAuthMiddleware, createScheduleController)
    routes.get("", /* listAllSchedules PRONTA*/)
    routes.delete("/:id", /* SOFTdeleteSchedule PRONTA/)
    routes.get("/:id/mother", /* listAllMotherSchedules */)
    routes.get("/:id/intitution", /* listAllIntituitionSchedules */)

    return routes

}

export default schedulesRoutes
