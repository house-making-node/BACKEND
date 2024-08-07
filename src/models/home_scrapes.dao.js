import { pool } from "../../config/db.connect.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { insertScrapInfoSql, getScrapInfoSql, deleteScrapInfoSql } from './home_scrapes.sql.js';

export const deleteScrapData = async (user_id, letter_id) => {
    try {
        const conn = await pool.getConnection();
        const [result] = await conn.query(deleteScrapInfoSql, [user_id, letter_id]);
        conn.release();
        return result.affectedRows > 0; // 삭제된 행이 있으면 true, 없으면 false
    } catch (err) {
        console.log("deleteScrapData [err]: ", err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};

export const getScrapDetailsByUserIdDao = async (user_id) => {
    try {
        const conn = await pool.getConnection();
        const query = `
            SELECT hl.letter_id, hs.user_id, hl.title, hl.s3_key
            FROM HOME_SCRAP hs
            JOIN HOME_LETTER hl ON hs.letter_id = hl.letter_id
            WHERE hs.user_id = ?
        `;
        const [rows] = await conn.query(query, [user_id]);
        conn.release();
        return rows;
    } catch (err) {
        console.log("getScrapDetailsByUserIdDao [error]: ", err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};

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
        console.log("letter.dao.js getLetterById [err] : ", err.message, err.stack);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};

export const addScrapData = async (body) => {
    try {
        console.log("home_scrapes.dao.js [data] : ", body);

        // SQL 쿼리와 파라미터를 출력
        console.log("SQL Query: ", insertScrapInfoSql);
        console.log("Query Parameters: ", [body.user_id, body.letter_id]);

        const conn = await pool.getConnection();
        const [result] = await conn.query(insertScrapInfoSql, [
            body.user_id,
            body.letter_id
        ]);
        conn.release();

        console.log("addScrapData result: ", result); // result 객체를 출력하여 확인합니다.
        if (!result.insertId) {
            return -1;
        }
        return result.insertId;
    } catch (err) {
        // catch 블록에서 발생하는 오류 메시지를 상세하게 출력
        console.log("home_scrapes.dao.js [err] : ", err.message, err.stack);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};

export const getScrapInfo = async (id) => {
    try {
        console.log("getScrapInfo [id]: ", id);
        const conn = await pool.getConnection();
        const [result] = await conn.query(getScrapInfoSql, [id]);
        conn.release();

        console.log("getScrapInfo result: ", result);

        if (result.length === 0) {
            return -1;
        }

        return result;
    } catch (err) {
        console.log("home_scrapes.dao.js getScrapInfo [err] : ", err.message, err.stack);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};
