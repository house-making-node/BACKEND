import express from "express";
import asyncHandler from 'express-async-handler';
import {addSubscriptionInfo} from "../controllers/share_letters.controller.js";

export const sharelettersRouter = express.Router();

sharelettersRouter.post('/subscribe',asyncHandler(addSubscriptionInfo));
// sharelettersRouter.post('/submit',asyncHandler(addSharedLetter));