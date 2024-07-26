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
      null,
      {
        params: {
          grant_type: "authorization_code",
          client_id: process.env.KAKAO_CLIENT_ID,
          client_secret: process.env.KAKAO_CLIENT_SECRET,
          redirect_uri: process.env.KAKAO_REDIRECT_URI,
          code,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    throw new Error("Failed to retrieve access token");
  }
};
