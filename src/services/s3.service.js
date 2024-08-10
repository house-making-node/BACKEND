// services/s3.service.js
import AWS from "aws-sdk";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

export const uploadImageToS3 = async (imageUrl, user_id) => {
  try {
    console.log(`Downloading image from URL: ${imageUrl}`);
    const imageResponse = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });
    const imageBuffer = Buffer.from(imageResponse.data, "binary");
    const s3Key = `profile-images/${user_id}/${uuidv4()}.jpg`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: s3Key,
      Body: imageBuffer,
      ContentType: imageResponse.headers["content-type"],
    };

    console.log(`Uploading image to S3 with key: ${s3Key}`);
    await s3.upload(params).promise();

    return s3Key;
  } catch (error) {
    console.error("Failed to upload image to S3:", error.message);
    throw new Error("Failed to upload image to S3");
  }
};

export const getSignedUrl = async (s3Key) => {
  try {
    console.log(`Generating signed URL for S3 key: ${s3Key}`);
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: s3Key,
      Expires: 60 * 60,
    };

    const url = await s3.getSignedUrlPromise("getObject", params);
    console.log(`Generated signed URL: ${url}`);
    return url;
  } catch (error) {
    console.error("Error generating signed URL:", error.message);
    throw new Error("Failed to generate signed URL");
  }
};
