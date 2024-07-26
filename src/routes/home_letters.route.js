import express from "express";
import asyncHandler from 'express-async-handler';
import {addSubscriptionInfo} from "../controllers/home_letters.controller.js";

export const homelettersRouter = express.Router();

homelettersRouter.post('/subscribe',asyncHandler(addSubscriptionInfo));