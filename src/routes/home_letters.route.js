// home_letters.route.js

import express from "express";
import asyncHandler from 'express-async-handler';
import {addSubscriptionInfo, addHomeLetterConcern, addScrapInfo, getLetterDetailById } from "../controllers/home_letters.controller.js";
import { upload } from '../middleware/image.uploader.js';

export const homelettersRouter = express.Router();

homelettersRouter.post('/subscribe',asyncHandler(addSubscriptionInfo));
homelettersRouter.post('/submit', upload.single('image'),asyncHandler(addHomeLetterConcern));
homelettersRouter.post('/scrap', asyncHandler(addScrapInfo));
homelettersRouter.get('/:letter_id', getLetterDetailById);