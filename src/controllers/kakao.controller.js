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
    const { nickname, profile_image_url } = profile; // 프로필에서 닉네임 추출
    const { email } = kakao_account; // 카카오 계정에서 이메일 추출

    // 사용자 존재 여부 확인 및 삽입
    const existingUser = await getUser(id);

    let s3Key;

    if (existingUser === -1) {
      // 새 유저의 경우
      await insertUser(id, accessToken, nickname, email);

      if (profile_image_url) {
        // 프로필 이미지가 존재하면 S3에 업로드
        s3Key = await uploadImageToS3(profile_image_url, id); // 이미지 URL과 사용자 ID로 S3에 업로드
        console.log("S3 Key:", s3Key); // S3 키 로그

        // 이미지가 성공적으로 업로드된 경우, USER_IMAGE 테이블에 저장
        await insertUserImage(s3Key, id);
      }
    }

    res.send(
      response(status.SUCCESS, {
        access_token: accessToken,
        user: userInfo,
        profile_image: s3Key,
      })
    );
  } catch (error) {
    console.error("Failed to authenticate:", error);
    res.status(500).json({ error: "Failed to authenticate" });
  }
};
