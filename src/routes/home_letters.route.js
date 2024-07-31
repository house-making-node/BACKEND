// home_letters.route.js

import express from "express";
import asyncHandler from 'express-async-handler';
import { addSubscriptionInfo , createHomeLetter, addHomeLetterConcern, addScrapInfo} from "../controllers/home_letters.controller.js";
import { upload } from '../middleware/image.uploader.js';

export const homelettersRouter = express.Router();

homelettersRouter.post('/subscribe',asyncHandler(addSubscriptionInfo));
homelettersRouter.post('/create', upload.single('image'), asyncHandler(createHomeLetter));
homelettersRouter.post('/submit', upload.single('image'),asyncHandler(addHomeLetterConcern));
homelettersRouter.post('/scrap', asyncHandler(addScrapInfo));