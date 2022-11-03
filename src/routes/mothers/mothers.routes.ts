import { Router } from "express";

import createMotherController from "../../controllers/mothers/createMother.controller";
import listOneMotherController from "../../controllers/mothers/listOneMother.controller";
import updateMotherController from "../../controllers/mothers/updateMother.controller";
import listMothersController from "../../controllers/mothers/listMothers.controller";
import deleteMotherController from "../../controllers/mothers/deleteMother.controller";

import ensureMotherId from "../../middlewares/mothers/ensureMotherId.middleware";
import ensureExistsMother from "../../middlewares/mothers/ensureExistsMother.middleware";
import ensurePassword from "../../middlewares/mothers/ensurePassword.middleware";
import ensureAuthMother from "../../middlewares/mothers/ensureAuthMother.middleware";
import ensureMotherIsActive from "../../middlewares/mothers/ensureMotherIsActive.middleware";

const routes = Router();

const motherRouter = () => {

    routes.post("", ensurePassword, ensureExistsMother, createMotherController);
    routes.get("", ensureAuthMother, listMothersController);
    routes.get("/:id", ensureAuthMother, ensureMotherId, listOneMotherController);
    routes.patch("/:id", ensureAuthMother, ensureMotherId, ensureMotherIsActive, updateMotherController);
    routes.delete("/:id",  ensureAuthMother, ensureMotherId, ensureMotherIsActive , deleteMotherController);
    
    return routes;
    
};

export default motherRouter;