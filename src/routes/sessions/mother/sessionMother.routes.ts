import { Router } from "express";

import sessionMotherController from "../../../controllers/mothers/sessionMother.controller";

import ensureExistsMother from "../../../middlewares/mothers/ensureExistsMother.middleware";
import ensurePassword from "../../../middlewares/mothers/ensurePassword.middleware";

const routes = Router();

const sessionMotherRouter = () => {
    
    routes.post("/mothers", ensurePassword, ensureExistsMother ,sessionMotherController);
 
    return routes;
}

export default sessionMotherRouter;