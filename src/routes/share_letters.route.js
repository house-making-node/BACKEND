import express from "express";
import asyncHandler from 'express-async-handler';

import { imageUploader } from '../middleware/image.uploader.js';
import { addSubscriptionInfo, addSharedLetter, lettersPreview, getLetterById, submitOpinion, addLetterToScrap } from "../controllers/share_letters.controller.js";


export const sharelettersRouter = express.Router();

sharelettersRouter.get('/',asyncHandler(lettersPreview)); // 공유레터 리스트 가져오기
sharelettersRouter.get('/:letter_id',asyncHandler(getLetterById)); //특정 공유레터 가져오기
sharelettersRouter.post('/:letter_id/opinions', asyncHandler(submitOpinion)); // 특정 공유레터에 사용자 의견 저장하기
sharelettersRouter.post('/subscribe',asyncHandler(addSubscriptionInfo)); // 공유레터 구독정보 저장하기
sharelettersRouter.post('/submit', imageUploader.single('image'), asyncHandler(addSharedLetter)); // 공유레터 제출하기
sharelettersRouter.post('/scrap',asyncHandler(addLetterToScrap)); // 특정 공유레터 스크랩에 저장하기