import { Express } from "express";
import { routerChildren } from "./children.routes";
import { institutionsRoutes } from "./institutions.routes";

export const appRoutes = (app: Express) => {
    
    app.use("/institutions", institutionsRoutes());
    app.use("/children", routerChildren());
};
