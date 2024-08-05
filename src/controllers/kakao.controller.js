//kakao.controller.js

import { getKakaoAuthURL, getKakaoToken } from "../services/kakao.service.js";
import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js";
import { insertUser } from "../models/user.dao.js";

export const kakaoLogin = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    // 카카오 로그인 요청 처리
    const kakaoAuthURL = getKakaoAuthURL();
    return res.redirect(kakaoAuthURL);
  }

  try {
    // 카카오 토큰 요청 및 응답 처리
    const accessToken = await getKakaoToken(code);
    const userInfo = await getKakaoUserInfo(accessToken);

    const { id, nickname, email } = userInfo;

    // 사용자 존재 여부 확인 및 삽입
    const existingUser = await getUser(id);

    if (existingUser === -1) {
      await insertUser(id, accessToken, nickname, email);
    } else {
      await updateUser(id, accessToken, nickname, email);
    }

    res.send(
      response(status.SUCCESS, { access_token: accessToken, user: userInfo })
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to authenticate" });
  }
};
