// home_letters.route.js

import express from "express";
import asyncHandler from 'express-async-handler';
import { addSubscriptionInfo , createHomeLetter, addHomeLetterConcern, addScrapInfo, getLetterDetailById, submitLetterOpinion, getHomeLettersList } from "../controllers/home_letters.controller.js";
import { imageUploader } from '../middleware/image.uploader.js';

export const homelettersRouter = express.Router();

homelettersRouter.post('/subscribe',asyncHandler(addSubscriptionInfo));
homelettersRouter.post('/create', imageUploader.single('image'), asyncHandler(createHomeLetter));
homelettersRouter.post('/submit', imageUploader.single('image'),asyncHandler(addHomeLetterConcern));
homelettersRouter.post('/:letter_id/opinions', submitLetterOpinion);
homelettersRouter.post('/scrap', asyncHandler(addScrapInfo));
homelettersRouter.get('/:letter_id', getLetterDetailById);
homelettersRouter.get('/', asyncHandler(getHomeLettersList));