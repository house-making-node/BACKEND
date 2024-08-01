import express from "express";
import asyncHandler from 'express-async-handler';

import { upload } from '../middleware/image.uploader.js';
import { addSubscriptionInfo, addSharedLetter, lettersPreview, getLetterById } from "../controllers/share_letters.controller.js";


export const sharelettersRouter = express.Router();

sharelettersRouter.get('/',asyncHandler(lettersPreview));
sharelettersRouter.get('/:letter_id',asyncHandler(getLetterById));
sharelettersRouter.post('/subscribe',asyncHandler(addSubscriptionInfo));
sharelettersRouter.post('/submit', upload.single('image'), asyncHandler(addSharedLetter));