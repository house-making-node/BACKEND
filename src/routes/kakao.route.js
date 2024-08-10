import express from "express";
import { kakaoLogin } from "../controllers/kakao.controller.js";

export const kakaoRouter = express.Router();

kakaoRouter.get("/kakao", kakaoLogin);
