import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl as generatePresignedUrl } from "@aws-sdk/s3-request-presigner";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// S3 클라이언트 초기화
const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

// 이미지 S3에 업로드하는 함수
export const uploadImageToS3 = async (imageUrl, user_id) => {
  try {
    console.log(`Downloading image from URL: ${imageUrl}`);
    const imageResponse = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });
    const imageBuffer = Buffer.from(imageResponse.data, "binary");
    const s3Key = `profile-images/${user_id}/${uuidv4()}.jpg`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: s3Key,
      Body: imageBuffer,
      ContentType: imageResponse.headers["content-type"],
    });

    console.log(`Uploading image to S3 with key: ${s3Key}`);
    await s3Client.send(command);

    return s3Key;
  } catch (error) {
    console.error("Failed to upload image to S3:", error.message);
    throw new Error("Failed to upload image to S3");
  }
};

// 서명된 URL을 생성하는 함수
export const generateSignedUrl = async (s3Key) => {
  try {
    console.log(`Generating signed URL for S3 key: ${s3Key}`);
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: s3Key,
    });

    const url = await generatePresignedUrl(s3Client, command, {
      expiresIn: 3600,
    });
    console.log(`Generated signed URL: ${url}`);
    return url;
  } catch (error) {
    console.error("Error generating signed URL:", error.message);
    throw new Error("Failed to generate signed URL");
  }
};
