import express from "express";
import { kakaoLogin } from "../controllers/kakao.controller";

export const kakaoRouter = express.Router();

kakaoRouter.get("/kakao", kakaoLogin);
