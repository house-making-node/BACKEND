import { pool } from "../../config/db.connect.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { getLetterDetailSql } from './home_letters.sql.js';

// letter_id로 HOME_LETTER를 가져오는 함수
export const getLetterById = async (letter_id) => {
    try {
        console.log("getLetterById [letter_id]: ", letter_id);
        const conn = await pool.getConnection();
        const [result] = await conn.query(getLetterDetailSql, [letter_id]);
        conn.release();

        if (result.length === 0) {
            return -1;
        }
        console.log("getLetterById [result]: ", result[0]);
        return result[0];
    } catch (err) {
        console.log("home_letters.dao.js getLetterById [err] : ", err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};