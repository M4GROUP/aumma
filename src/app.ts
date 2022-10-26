import express from "express"
import { appRoutes } from "./routes";
import { errorMiddleware } from "./middlewares/errors.middleware";

const app = express();

app.use(express.json());

appRoutes(app);

app.use(errorMiddleware);

export default app
