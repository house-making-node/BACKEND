// user.route.js

import express from "express";
import asyncHandler from "express-async-handler";
import { userProfile } from "../controllers/user.controller.js";
import { getScrapDetailsByUserId } from "../controllers/home_letters.controller.js";
import { get } from "http";
import { consultingStatusGet } from "../controllers/consult.controller.js";
import { getSharedLetterScrapList } from "../controllers/share_letters.controller.js";

export const userRouter = express.Router();

userRouter.get("/profile/:user_id", userProfile); //마이페이지 유저 정보 조회
userRouter.get(
  "/home_letters/scrap/:user_id",
  asyncHandler(getScrapDetailsByUserId)
);
userRouter.get(
  "/consulting/status/:consulting_id",
  asyncHandler(consultingStatusGet)
);
userRouter.get(
  "/:user_id/share_letters/scraps",
  asyncHandler(getSharedLetterScrapList)
); // 마이페이지 공유레터 스크랩 리스트 조회
