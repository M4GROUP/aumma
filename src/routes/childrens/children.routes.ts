import { Router } from "express";
import { createChildren } from "../../controllers/children/createChildren.controller";
import deleteOneChildrenByMotherController from "../../controllers/children/deleteOneChildrenByMother.controller";
import listAllChildrensByMotherController from "../../controllers/children/listAllChildrensByMother.controller";
import listOneChildrenByMotherController from "../../controllers/children/listOneChildrenByMother.controller";
import updateOneChildrenByMotherController from "../../controllers/children/updateChildrenByMother.controller";
import ensureAuthMother from "../../middlewares/mothers/ensureAuthMother.middleware";

const routes = Router();

export const routerChildren = () => {
    routes.post("/", ensureAuthMother ,createChildren);
    routes.get("/:id",ensureAuthMother, listAllChildrensByMotherController); //adm/:id/childrens
    routes.get("/mother/:id",ensureAuthMother, listOneChildrenByMotherController);
    routes.patch("/mother/:id",ensureAuthMother, updateOneChildrenByMotherController);
    routes.delete("/mother/:id",ensureAuthMother, deleteOneChildrenByMotherController)
  
    return routes;
};
