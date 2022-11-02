import { Router } from "express";
import createMotherController from "../../controllers/mothers/createMother.controller";
import listOneMotherController from "../../controllers/mothers/listOneMother.controller";
import updateMotherController from "../../controllers/mothers/updateMother.controller";
import ensureMotherId from "../../middlewares/mothers/ensureMotherId.middleware";

import ensureExistsMother from "../../middlewares/mothers/ensurePasswordExistsMother.middleware";
import ensurePassword from "../../middlewares/mothers/ensurePasswordPassword.middleware";

const routes = Router();

const motherRouter = () => {
    routes.post("", ensurePassword, ensureExistsMother, createMotherController);
    routes.get("/:id", ensureMotherId, listOneMotherController);
    routes.patch("/:id", ensureMotherId, updateMotherController);
    routes.delete("/:id", );
  
    return routes;
}


export default motherRouter;