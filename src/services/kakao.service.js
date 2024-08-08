//kakao.service.js

import axios from "axios";

// 카카오 인증 URL 생성
export const getKakaoAuthURL = () => {
  return `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
};

// 인가 코드를 통해 액세스 토큰 얻기
export const getKakaoToken = async (code) => {
  try {
    const response = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_CLIENT_ID,
        // client_secret: process.env.KAKAO_CLIENT_SECRET, // 필요 시 주석 해제
        redirect_uri: process.env.KAKAO_REDIRECT_URI,
        code,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error(
      "Failed to retrieve access token:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to retrieve access token");
  }
};

// 액세스 토큰을 사용하여 카카오 사용자 정보 가져오기
export const getKakaoUserInfo = async (accessToken) => {
  try {
    const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("User info:", response.data); // 콘솔에 사용자 정보를 출력합니다.
    return response.data;
  } catch (error) {
    console.error(
      "User info retrieval error:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to retrieve user information");
  }
};
