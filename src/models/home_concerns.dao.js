import { pool } from "../../config/db.connect.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { insertConcernSql, getConcernSql } from './home_concerns.sql.js';

export const addConcernData = async (body) => {
    try {
        console.log("home_concerns.dao.js addConcernData [data] : ", body);
        const conn = await pool.getConnection();
        const [result] = await conn.query(insertConcernSql, [
            body.user_id,
            body.age,
            body.nickname,
            body.concern_detail,
            body.concern_comment,
            body.s3_key,
            body.title
        ]);
        conn.release();
        if (result.length === 0) {
            console.log("home_concerns.dao.js addConcernData [result empty]");
            return -1;
        }

        console.log("home_concerns.dao.js addConcernData [result]: ", result);
        return result.insertId;
    } catch (err) {
        console.log("home_concerns.dao.js addConcernData [err] : ", err.message || err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, err.message);
    }
}

export const getConcernData = async (id) => {
    try {
        console.log("home_concerns.dao.js getConcernData [id]: ", id);
        const conn = await pool.getConnection();
        const [result] = await conn.query(getConcernSql, [id]);
        conn.release();

        if (result.length === 0) {
            console.log("home_concerns.dao.js getConcernData [result empty]");
            return -1;
        }

        console.log("home_concerns.dao.js getConcernData [result]: ", result);
        return result;
    } catch (err) {
        console.log("home_concerns.dao.js getConcernData [err] : ", err.message || err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, err.message);
    }
}
