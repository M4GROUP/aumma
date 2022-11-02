import { Router } from "express";
import { createChildren } from "../controllers/children/createChildren";
import { deleteChildren } from "../controllers/children/deleteChildren";
import { listChildren } from "../controllers/children/listChildren";
import { updateChildren } from "../controllers/children/updateChildren";

const Children_Router = Router();

export const routerChildren = () => {
    Children_Router.post("/", createChildren);
    Children_Router.get("/", listChildren); //adm/:id/childrens
    //Children_Router.get("/mother/:id", () => {});
    Children_Router.patch("/:id", updateChildren); //middleware ID da mae ou id do adm
    Children_Router.delete("/:id", deleteChildren); //middleware ID da mae ou id do adm
    return Children_Router;
};
