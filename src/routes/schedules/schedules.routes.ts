import { Router } from "express";

import createScheduleController from "../../controllers/schedules/createSchedule.controller";
import { deleteSchedules } from "../../controllers/schedules/deleteSchedules";
import { listScheduleByInstitution } from "../../controllers/schedules/listScheduleByInstitution";
import { listSchedules } from "../../controllers/schedules/listSchedules";
import { listSchedulesByChildren } from "../../controllers/schedules/listSchedulesByChildren";
import ensureInstitutionAuthMiddleware from "../../middlewares/institutions/ensureAuthInstitution.middleware";
import ensureAuthMother from "../../middlewares/mothers/ensureAuthMother.middleware";

const routes = Router()

const schedulesRoutes = () => {

    routes.post("/:id", ensureAuthMother, createScheduleController)
    routes.get("", listSchedules)
    routes.delete("/:id/delete", deleteSchedules)
    routes.get("/:id/children",ensureAuthMother, listSchedulesByChildren)
    routes.get("/:id/institution",ensureInstitutionAuthMiddleware, listScheduleByInstitution)

    return routes

}

export default schedulesRoutes
