import { pool } from "../../config/db.connect.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

// SQL 쿼리 정의
const getUserSql = `
    SELECT user_id, access_token, user_name, email, created_at
    FROM USER
    WHERE user_id = ?
`;

// getUser 함수 정의
export const getUser = async (user_id) => {
    try {
        const conn = await pool.getConnection();
        const [result] = await conn.query(getUserSql, [user_id]);
        conn.release();

        if (result.length === 0) {
            return -1;
        }

        return result[0];
    } catch (err) {
        console.log("user.dao.js [err] : ", err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};
