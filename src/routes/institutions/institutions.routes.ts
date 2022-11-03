import { Router } from "express";

import createInstitutionController from "../../controllers/institution/createInstitution.controller";

import ensureInstitutionAuthMiddleware from "../../middlewares/institutions/ensureAuthInstitution.middleware";
import getMyInstitutionsController from "../../controllers/institution/getMyInstitutions.controller";
import deleteInstitutionController from "../../controllers/institution/deleteInstitution.controller";
import ensureIsInstitutionMiddleware from "../../middlewares/institutions/ensureIsInstitution.middleware";
import updateInstitutionController from "../../controllers/institution/updateInstitution.controller";

const routes = Router();

export const institutionsRoutes = () => {
    routes.post("/", createInstitutionController);
    routes.get(
        "/:id",
        ensureInstitutionAuthMiddleware,
        ensureIsInstitutionMiddleware,
        getMyInstitutionsController
    );

    routes.patch(
        "/:id",
        ensureInstitutionAuthMiddleware,
        updateInstitutionController
    );
    routes.delete(
        "/:id",
        ensureInstitutionAuthMiddleware,
        deleteInstitutionController
    );
    return routes;
};
