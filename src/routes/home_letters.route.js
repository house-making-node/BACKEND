// home_letters.route.js

import express from "express";
import asyncHandler from 'express-async-handler';
import {addSubscriptionInfo, addHomeLetterConcern, addScrapInfo} from "../controllers/home_letters.controller.js";
import { submitLetterOpinion } from '../controllers/home_letters.controller.js';
import { upload } from '../middleware/image.uploader.js';

export const homelettersRouter = express.Router();

homelettersRouter.post('/subscribe',asyncHandler(addSubscriptionInfo));
homelettersRouter.post('/submit', upload.single('image'),asyncHandler(addHomeLetterConcern));
homelettersRouter.post('/:letter_id/opinions', submitLetterOpinion);
homelettersRouter.post('/scrap', asyncHandler(addScrapInfo));