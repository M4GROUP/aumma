import { Express } from "express";

import { adminRoutes } from "./admin/admin.routes";
import { routerChildren } from "./childrens/children.routes";
import { institutionsRoutes } from "./institutions/institutions.routes";

import motherRouter from "./mothers/mothers.routes";

import schedulesRoutes from "./schedules/schedules.routes";

import sessionAdminRouter from "./sessions/admin/sessionAdmin.routes";
import sessionInstitutionRouter from "./sessions/institutions/sessionInstitution.routes";
import sessionMotherRouter from "./sessions/mother/sessionMother.routes";

export const appRoutes = (app: Express) => {
    app.use("/institutions", institutionsRoutes());
    app.use("/institutions", sessionInstitutionRouter());
    app.use("/childrens", routerChildren());
    app.use("/mothers", motherRouter());
    app.use("/mothers", sessionMotherRouter());
    app.use("/admin", adminRoutes());
    app.use("/admin", sessionAdminRouter());
    app.use("/schedules", schedulesRoutes())
};
