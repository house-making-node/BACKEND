// user.route.js

import express from "express";
import asyncHandler from 'express-async-handler';
import { getScrapDetailsByUserId } from "../controllers/home_letters.controller.js";
import { upload } from '../middleware/image.uploader.js';
import { get } from "http";
import { consultingStatusGet } from "../controllers/consult.controller.js";

export const userRouter = express.Router();

userRouter.get('/home_letters/scrap/:user_id', getScrapDetailsByUserId);
userRouter.get('/consulting/status/:consulting_id',consultingStatusGet);