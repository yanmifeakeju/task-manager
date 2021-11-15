import { Router } from "express";
import { createUser } from "../controllers/users.js";

const userRouter = Router();

userRouter.route("/").post(createUser);

export default userRouter;
