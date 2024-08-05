import { pool } from "../../config/db.connect.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

// concern_id로 concern_detail, title, s3_key 가져오는 함수
export const getConcernDetailById = async (id) => {
    try {
        const conn = await pool.getConnection();
        const [result] = await conn.query('SELECT title, s3_key, concern_detail FROM CONCERN WHERE concern_id = ?', [id]);
        conn.release();

        if (result.length === 0) {
            return null;
        }

        return result[0];
    } catch (err) {
        console.log("concern.dao.js getConcernDetailById [err] : ", err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};
