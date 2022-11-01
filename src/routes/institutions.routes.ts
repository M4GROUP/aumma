import { Router } from "express";
import getAllInstitutionsController from "../controllers/institution/getAllInstitutions.controller";
import createInstitutionController from "../controllers/institution/createInstitution.controller";
import institutionLoginController from "../controllers/institution/loginInstitution.controller";

const routes = Router()

export const institutionsRoutes = () => {

    routes.post('/', createInstitutionController)
    routes.get('/', getAllInstitutionsController)
    routes.post('/login', institutionLoginController)
    return routes
}