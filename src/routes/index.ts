import { Express } from "express";
import { routerChildren } from "./children.routes";
import { institutionsRoutes } from "./institutions.routes";
import motherRouter from "./mothers/mothers.routes";
import sessionMotherRouter from "./sessions/mother/sessionMother.routes"

export const appRoutes = (app: Express) => {
    
    app.use("/institutions", institutionsRoutes());
    app.use("/children", routerChildren());
    app.use("/mothers", motherRouter());
    app.use("login/", sessionMotherRouter());
    
};
