import express from "express";
import asyncHandler from 'express-async-handler';

import { imageUploader } from '../middleware/image.uploader.js';
import { addSubscriptionInfo, addSharedLetter, lettersPreview, getLetterById, submitOpinion } from "../controllers/share_letters.controller.js";


export const sharelettersRouter = express.Router();

sharelettersRouter.get('/',asyncHandler(lettersPreview));
sharelettersRouter.get('/:letter_id',asyncHandler(getLetterById));
sharelettersRouter.post('/:letter_id/opinions', asyncHandler(submitOpinion));
sharelettersRouter.post('/subscribe',asyncHandler(addSubscriptionInfo));
sharelettersRouter.post('/submit', imageUploader.single('image'), asyncHandler(addSharedLetter));