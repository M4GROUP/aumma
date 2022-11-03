import { Router } from "express";
import loginAdminController from "../../../controllers/admin/loginAdmin.controller";


const routes = Router();

const sessionAdminRouter = () => {
    routes.post("/login", loginAdminController);

    return routes;
};

export default sessionAdminRouter;