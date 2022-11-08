import { Router } from "express";
import createAdminController from "../../controllers/admin/createAdmin.controller";
import deleteAdminByIdController from "../../controllers/admin/deleteAdminById.controller";
import deleteInstitutionByIdController from "../../controllers/admin/deleteInstitutionById.controller";
import deleteMotherByIdController from "../../controllers/admin/deleteMotherById.controller";
import listAdminByIdController from "../../controllers/admin/listAdminById.controller";
import listAllAdminsController from "../../controllers/admin/listAllAdmin.controller";
import listAllInstitutionsController from "../../controllers/admin/listAllInstitutions.controller";
import listAllMothersController from "../../controllers/admin/listAllMothers.controller";
import listAllSchedulesController from "../../controllers/admin/listAllSchedules.controller";
import listInstitutionByIdController from "../../controllers/admin/listInstitutionById.controller";
import listMotherByIdController from "../../controllers/admin/listMotherById.controller";
import updateAdminByIdController from "../../controllers/admin/updateAdmin.controller";
import updateInstitutionByIdController from "../../controllers/admin/updateInstitutionById.controller";
import updateMotherByIdController from "../../controllers/admin/updateMotherById.controller";

import ensureAdminExists from "../../middlewares/admin/ensureAdminExists.middleware";
import ensureAdminId from "../../middlewares/admin/ensureAdminId.middleware";
import ensurePrivilegeAdmin from "../../middlewares/admin/ensureAdminPrivilege.middleware";
import ensureAuthAdm from "../../middlewares/admin/ensureAuthAdmin.middleware";
import ensureEmail from "../../middlewares/admin/ensureEmail.middleware";
import ensureisActiveAdmin from "../../middlewares/admin/ensureIsActiveAdmin.middleware";
import ensurePasswordOrName from "../../middlewares/admin/ensurePasswordOrName.middleware";
import ensureIsInstitutionMiddleware from "../../middlewares/institutions/ensureIsInstitution.middleware";
import ensureMotherId from "../../middlewares/mothers/ensureMotherId.middleware";

const routes = Router();

export const adminRoutes = () => {
    routes.post(
        "/",
        ensureAdminExists,
        ensurePasswordOrName,
        createAdminController
    );
    routes.get(
        "/",
        ensureAuthAdm,
        ensurePrivilegeAdmin,
        ensureisActiveAdmin,
        listAllAdminsController
    );
    routes.get(
        "/:id",
        ensureAuthAdm,
        ensureAdminId,
        ensureisActiveAdmin,
        listAdminByIdController
    );
    routes.patch(
        "/:id",
        ensureAuthAdm,
        ensureAdminId,
        ensureisActiveAdmin,
        ensurePrivilegeAdmin,
        ensureAdminId,
        ensureEmail,
        updateAdminByIdController
    );

    routes.delete(
        "/:id",
        ensureAuthAdm,
        ensureisActiveAdmin,
        ensureAdminId,
        ensurePrivilegeAdmin,
        deleteAdminByIdController
    );

    routes.delete(
        "/institutions/:id",
        ensureAuthAdm,
        ensureisActiveAdmin,
        ensurePrivilegeAdmin,
        ensureIsInstitutionMiddleware,
        deleteInstitutionByIdController
    );

    routes.get(
        "/institutions/:id",
        ensureAuthAdm,
        ensureisActiveAdmin,
        ensurePrivilegeAdmin,
        ensureIsInstitutionMiddleware,
        listInstitutionByIdController
    );
    routes.patch(
        "/institutions/:id",
        ensureAuthAdm,
        ensureisActiveAdmin,
        ensurePrivilegeAdmin,
        updateInstitutionByIdController
    );
    //Rota com problema

    routes.get(
        "/all/mothers",

        listAllMothersController
    );
    routes.get(
        "/mothers/:id",
        ensureAuthAdm,
        ensureisActiveAdmin,
        ensureMotherId,
        listMotherByIdController
    );
    routes.patch(
        "/mothers/:id",
        ensureAuthAdm,
        ensureisActiveAdmin,
        ensurePrivilegeAdmin,
        ensureMotherId,
        updateMotherByIdController
    );
    routes.delete(
        "/mothers/:id",
        ensureAuthAdm,
        ensureisActiveAdmin,
        ensurePrivilegeAdmin,
        ensureMotherId,
        deleteMotherByIdController
    );
    routes.get(
        "/schedules",
        ensureAuthAdm,
        ensureisActiveAdmin,
        listAllSchedulesController
    );

   routes.get("/all/institutions", listAllInstitutionsController)
    return routes;
};
