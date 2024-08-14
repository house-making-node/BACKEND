// controllers/userImage.controller.js
import { getUserImageKey } from "../models/user.dao.js";
import { generateSignedUrl } from "../services/s3.service.js";
import { status } from "../../config/response.status.js";

export const userImage = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    console.log(`Fetching S3 key for user_id: ${user_id}`);
    const s3Key = await getUserImageKey(user_id);

    if (!s3Key) {
      return res.status(status.NOT_FOUND.status).json({
        ...status.NOT_FOUND,
        message: "Profile image not found",
      });
    }

    console.log(`Fetching signed URL for S3 key: ${s3Key}`);
    const signedUrl = await getSignedUrl(s3Key);

    return res.status(status.SUCCESS.status).json({
      ...status.SUCCESS,
      data: { profile_image_url: signedUrl },
    });
  } catch (err) {
    console.error("Error in userImageController:", err);
    return res.status(status.INTERNAL_SERVER_ERROR.status).json({
      ...status.INTERNAL_SERVER_ERROR,
      message: "An unexpected error occurred",
    });
  }
};
