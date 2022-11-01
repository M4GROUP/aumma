import { Express } from "express"
import { institutionsRoutes } from "./institutions.routes"
    
    export const appRoutes = (app: Express) => {

        app.use("/institutions", institutionsRoutes())
    
    }    