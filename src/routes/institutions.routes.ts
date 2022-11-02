import { Router } from "express";

import createInstitutionController from "../controllers/institution/createInstitution.controller";
import institutionLoginController from "../controllers/institution/loginInstitution.controller";
import ensureInstitutionAuthMiddleware from "../middlewares/ensureAuthInstitution.middleware";
import getMyInstitutionsController from "../controllers/institution/getMyInstitutions.controller";



const routes = Router()

export const institutionsRoutes = () => {

    routes.post('/', createInstitutionController)
    routes.get('/:id',ensureInstitutionAuthMiddleware,getMyInstitutionsController)
    routes.post('/login', institutionLoginController)
    return routes
}