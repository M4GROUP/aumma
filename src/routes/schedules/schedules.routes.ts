import { Router } from "express";

import createScheduleController from "../../controllers/schedules/createSchedule.controller";
import { deleteSchedules } from "../../controllers/schedules/deleteSchedules";
import { listScheduleByInstitution } from "../../controllers/schedules/listScheduleByInstitution";
import { listSchedules } from "../../controllers/schedules/listSchedules";
import { listSchedulesByChildren } from "../../controllers/schedules/listSchedulesByChildren";
import ensureInstitutionAuthMiddleware from "../../middlewares/institutions/ensureAuthInstitution.middleware";

const routes = Router()

const schedulesRoutes = () => {

    routes.post("/:id", ensureInstitutionAuthMiddleware, createScheduleController)
    routes.get("", listSchedules)
    routes.delete("/:id", deleteSchedules)
    routes.get("/:id/children", listSchedulesByChildren)
    routes.get("/:id/intitution", listScheduleByInstitution)

    return routes

}

export default schedulesRoutes
