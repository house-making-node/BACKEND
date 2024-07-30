import { pool } from "../../config/db.connect.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

// letter_id로 Letter를 가져오는 함수
export const getLetterById = async (letter_id) => {
    try {
        const conn = await pool.getConnection();
        const [result] = await conn.query('SELECT * FROM HOME_LETTER WHERE letter_id = ?', [letter_id]);
        conn.release();

        if (result.length === 0) {
            return -1;
        }

        return result[0];
    } catch (err) {
        console.log("home_letters.dao.js getLetterById [err] : ", err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};