import { Router } from "express";
import loginAdminController from "../../../controllers/admin/loginAdmin.controller";
import ensureAccount from "../../../middlewares/admin/ensureAccount.middleware";


const routes = Router();

const sessionAdminRouter = () => {
    routes.post("/login", ensureAccount, loginAdminController);

    return routes;
};

export default sessionAdminRouter;