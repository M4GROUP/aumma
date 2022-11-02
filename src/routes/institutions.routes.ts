import { Router } from "express";

import createInstitutionController from "../controllers/institution/createInstitution.controller";
import institutionLoginController from "../controllers/institution/loginInstitution.controller";
import ensureInstitutionAuthMiddleware from "../middlewares/ensureAuthInstitution.middleware";
import getMyInstitutionsController from "../controllers/institution/getMyInstitutions.controller";
import deleteInstitutionController from "../controllers/institution/deleteInstitution.controller";



const routes = Router()

export const institutionsRoutes = () => {

    routes.post('/', createInstitutionController)
    routes.get('/:id',ensureInstitutionAuthMiddleware,getMyInstitutionsController)
    routes.post('/login', institutionLoginController)
    routes.delete('/:id', deleteInstitutionController)
    return routes
}