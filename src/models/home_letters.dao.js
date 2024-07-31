import { pool } from "../../config/db.connect.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { insertHomeLetterSql, getHomeLetterByIdSql } from './home_letters.sql.js';

export const addHomeLetter = async ({ concern_id, title, s3_key, contents }) => {
    try {
        const conn = await pool.getConnection();
        const [result] = await conn.query(insertHomeLetterSql, [
            concern_id,
            title,
            s3_key,
            contents
        ]);
        conn.release();

        return result.insertId;
    } catch (err) {
        console.log("home_letters.dao.js addHomeLetter [err] : ", err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};

export const getHomeLetterById = async (letter_id) => {
    try {
        const conn = await pool.getConnection();
        const [result] = await conn.query(getHomeLetterByIdSql, [letter_id]);
        conn.release();

        if (result.length === 0) {
            return -1;
        }

        return result[0];
    } catch (err) {
        console.log("home_letters.dao.js getHomeLetterById [err] : ", err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};
