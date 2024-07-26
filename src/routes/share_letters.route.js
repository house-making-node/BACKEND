import express from "express";
import asyncHandler from 'express-async-handler';
import { upload } from '../middleware/image.uploader.js';
import {addSubscriptionInfo, addSharedLetter} from "../controllers/share_letters.controller.js";

export const sharelettersRouter = express.Router();

sharelettersRouter.post('/subscribe',asyncHandler(addSubscriptionInfo));
sharelettersRouter.post('/submit', upload.single('image'), asyncHandler(addSharedLetter));