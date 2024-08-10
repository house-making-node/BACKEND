// kakao.controller.js
import {
  getKakaoAuthURL,
  getKakaoToken,
  getKakaoUserInfo,
} from "../services/kakao.service.js";
import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js";
import { insertUser, getUser } from "../models/user.dao.js";

export const kakaoLogin = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    // 카카오 인증 URL 생성 및 리다이렉트
    const kakaoAuthURL = getKakaoAuthURL();
    return res.redirect(kakaoAuthURL);
  }

  try {
    // 카카오 토큰 요청
    const accessToken = await getKakaoToken(code);
    const userInfo = await getKakaoUserInfo(accessToken);

    console.log("User Info:", userInfo); // 사용자 정보 확인

    const { id, kakao_account } = userInfo;
    const { profile } = kakao_account;
    const { nickname } = profile; // 프로필에서 닉네임 추출
    const { email } = kakao_account; // 카카오 계정에서 이메일 추출

    // 사용자 존재 여부 확인 및 삽입
    const existingUser = await getUser(id);

    if (existingUser === -1) {
      await insertUser(id, accessToken, nickname, email);
    }

    res.send(
      response(status.SUCCESS, { access_token: accessToken, user: userInfo })
    );
  } catch (error) {
    console.error("Failed to authenticate:", error);
    res.status(500).json({ error: "Failed to authenticate" });
  }
};
