import { getKakaoAuthURL, getKakaoToken } from "../services/kakao.service.js";
import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js";

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
    res.send(response(status.SUCCESS, { access_token: accessToken }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to authenticate" });
  }
};
