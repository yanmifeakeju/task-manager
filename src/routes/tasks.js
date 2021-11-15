import { Router } from "express";
import { createTask } from "../controllers/tasks.js";

const taskRouter = Router();

taskRouter.route("/").post(createTask);

export default taskRouter;
