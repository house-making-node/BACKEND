import AWS from "aws-sdk";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// AWS S3 설정
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

// 이미지 URL을 통해 이미지를 다운로드하고 S3에 업로드
export const uploadImageToS3 = async (imageUrl, user_id) => {
  try {
    // 이미지 다운로드
    const imageResponse = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    // 이미지 파일 버퍼
    const imageBuffer = Buffer.from(imageResponse.data, "binary");

    // 고유한 S3 키 생성
    const s3Key = `profile-images/${user_id}/${uuidv4()}.jpg`;

    // S3 업로드 파라미터
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: s3Key,
      Body: imageBuffer,
      ContentType: imageResponse.headers["content-type"],
    };

    // S3에 이미지 업로드
    await s3.upload(params).promise();

    return s3Key;
  } catch (error) {
    console.error("Failed to upload image to S3:", error.message);
    throw new Error("Failed to upload image to S3");
  }
};
