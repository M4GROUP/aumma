import { Router } from "express";

import sessionMotherController from "../../../controllers/mothers/sessionMother.controller";

import ensureMother from "../../../middlewares/mothers/ensureMother.middleware";
import ensurePassword from "../../../middlewares/mothers/ensurePassword.middleware";

const routes = Router();

const sessionMotherRouter = () => {

    routes.post("/login", ensurePassword, ensureMother ,sessionMotherController);
 
    return routes;
}

export default sessionMotherRouter;