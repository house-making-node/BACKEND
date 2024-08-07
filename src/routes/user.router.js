// user.route.js

import express from "express";
import { userProfile } from "../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter.get("/profile/:user_id", userProfile);
