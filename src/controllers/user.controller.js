// controllers/user.controller.js

import { getUser } from "../models/user.dao.js"; // getUser 함수가 있는 경로
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

// 사용자 정보를 가져오는 컨트롤러 함수
export const userProfile = async (req, res, next) => {
  const user_id = req.params.user_id; // URL 경로에서 user_id를 가져옴

  try {
    const user = await getUser(user_id);

    if (user === -1) {
      // 사용자가 존재하지 않을 때
      return res.status(status.NOT_FOUND.status).json({
        isSuccess: status.NOT_FOUND.isSuccess,
        code: status.NOT_FOUND.code,
        message: status.NOT_FOUND.message,
      });
    }

    // 성공적으로 사용자 정보를 가져왔을 때
    return res.status(status.SUCCESS.status).json({
      ...status.SUCCESS,
      data: user,
    });
  } catch (err) {
    console.error("Error in getUserController:", err);
    // 에러를 핸들링하는 미들웨어로 넘김
    return next(
      new BaseError(
        status.INTERNAL_SERVER_ERROR.status,
        status.INTERNAL_SERVER_ERROR.message
      )
    );
  }
};
