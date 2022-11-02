import { Router } from "express";
import { createChildren } from "../controllers/children/createChildren";
import { deleteChildren } from "../controllers/children/deleteChildren";
import { listChildren } from "../controllers/children/listChildren";
import { updateChildren } from "../controllers/children/updateChildren";

const Children_Router = Router();

export const routerChildren = () => {
    Children_Router.post("/", createChildren);
    Children_Router.get("/", listChildren);
    //Children_Router.get("/mother/:id", () => {});
    Children_Router.patch("/:id", updateChildren);
    Children_Router.delete("/:id", deleteChildren);
    return Children_Router;
};
