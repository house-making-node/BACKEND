// kakao.controller.js
import {
  getKakaoAuthURL,
  getKakaoToken,
  getKakaoUserInfo,
} from "../services/kakao.service.js";
import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js";
import { insertUser, getUser, insertUserImage } from "../models/user.dao.js";
import { uploadImageToS3 } from "../services/s3.service.js"; // S3 업로드 함수 가져오기
import axios from "axios"; // 프로필 이미지 다운로드를 위해 axios 사용

export const kakaoLogin = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    const kakaoAuthURL = getKakaoAuthURL();
    return res.redirect(kakaoAuthURL);
  }

  try {
    const accessToken = await getKakaoToken(code);
    const userInfo = await getKakaoUserInfo(accessToken);

    const { id, kakao_account } = userInfo;
    const { profile } = kakao_account;
    const { nickname, profile_image_url } = profile;
    const { email } = kakao_account;

    const existingUser = await getUser(id);
    let s3Key;

    if (existingUser === -1) {
      await insertUser(id, accessToken, nickname, email);

      if (profile_image_url) {
        s3Key = await uploadImageToS3(profile_image_url, id);
        await insertUserImage(s3Key, id);
      }
    }

    // 쿠키에 액세스 토큰 설정
    res.cookie("access_token", accessToken, { httpOnly: true, secure: true });

    // 클라이언트 애플리케이션으로 리디렉션
    return res.redirect("https://housemaking-fe.vercel.app/welcome");
  } catch (error) {
    console.error("Failed to authenticate:", error);
    res.status(500).json({ error: "Failed to authenticate" });
  }
};
