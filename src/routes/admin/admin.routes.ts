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
import ensurePrivilegeAdmin from "../../middlewares/admin/ensureAdminPrivilege.middleware";
import ensureAuthAdm from "../../middlewares/admin/ensureAuthAdmin.middleware";
import ensureisActiveAdmin from "../../middlewares/admin/ensureIsActiveAdmin.middleware";

const routes = Router();

export const adminRoutes = () => {
    routes.post("/", ensureAuthAdm ,ensurePrivilegeAdmin,createAdminController);
    routes.get(
        "/",
        ensureAuthAdm,
        ensureisActiveAdmin,
        listAllAdminsController
    );
    routes.get(
        "/:id",
        ensureAuthAdm,
        ensureisActiveAdmin,
        listAdminByIdController
    );
    routes.patch(
        "/:id",
        ensureAuthAdm,
        ensureisActiveAdmin,
        ensurePrivilegeAdmin,
        updateAdminByIdController
    );
    routes.delete(
        "/:id",
        ensureAuthAdm,
        ensureisActiveAdmin,
        ensurePrivilegeAdmin,
        deleteAdminByIdController
    );
    //rota com problema
    routes.get(
        "/institutions",
        ensureAuthAdm,
        ensureisActiveAdmin,
        listAllInstitutionsController
    );
    routes.delete(
        "/institutions/:id",
        ensureAuthAdm,
        ensureisActiveAdmin,
        ensurePrivilegeAdmin,
        deleteInstitutionByIdController
    );
    routes.get(
        "/institutions/:id",
        ensureAuthAdm,
        ensureisActiveAdmin,
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
        "/mothers",

        listAllMothersController
    );
    routes.get(
        "/mothers/:id",
        ensureAuthAdm,
        ensureisActiveAdmin,
        listMotherByIdController
    );
    routes.patch(
        "/mothers/:id",
        ensureAuthAdm,
        ensureisActiveAdmin,
        ensurePrivilegeAdmin,
        updateMotherByIdController
    );
    routes.delete(
        "/mothers/:id",
        ensureAuthAdm,
        ensureisActiveAdmin,
        ensurePrivilegeAdmin,
        deleteMotherByIdController
    );
    routes.get(
        "/schedules",
         ensureAuthAdm,
         ensureisActiveAdmin,
        listAllSchedulesController
    );

    return routes;
};
