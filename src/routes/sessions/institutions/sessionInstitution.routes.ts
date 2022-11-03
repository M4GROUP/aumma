import { Router } from "express";
import institutionLoginController from "../../../controllers/institution/loginInstitution.controller";

const routes = Router();

const sessionInstitutionRouter = () => {
    routes.post("/login", institutionLoginController);

    return routes;
};

export default sessionInstitutionRouter;
