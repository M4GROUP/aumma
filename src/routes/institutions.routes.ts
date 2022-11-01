import { Router } from "express";
import getAllInstitutionsController from "../controllers/institution/getAllInstitutions.controller";
import createInstitutionController from "../controllers/institution/createInstitution.controller";

const routes = Router()

export const institutionsRoutes = () => {

    routes.post('/', createInstitutionController)
    routes.get('/', getAllInstitutionsController)

    return routes
}