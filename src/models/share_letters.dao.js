import { pool } from "../../config/db.connect.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { insertSharedLetterSql, getSharedLetterSql, insertSharedLetterContentSql, selectLettersPreviewSql } from './share_letters.sql.js';

export const addLetterData = async (body) =>{
    try{
        console.log("share_letters.dao.js [data] : ",body);
        const conn = await pool.getConnection();
        const [result] = await pool.query(insertSharedLetterSql,[
            body.user_id,
            body.nickname,
            body.age,
            body.experience_detail,
            body.experience_comment,
            body.s3_key,
            body.title
        ]);
        conn.release();
        if(result.length == 0){
            return -1;
        }

        return result.insertId;
    }
    catch(err){
        console.log("share_letters.dao.js addLetterData [err] : ",err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const getLetterData = async (id) => {
    try{
        const conn = await pool.getConnection();
        const [result] = await conn.query(getSharedLetterSql, [id]);
        conn.release();

        if(result.length === 0) {
            return -1;
        }

        return result;
    }catch (err) {
        console.log("share_letters.dao.js getLetterData [err] : ", err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const insertSharedLetterTable = async (share_id, content, s3_key, title) => {
    try {
        const conn = await pool.getConnection();
        const [result] = await conn.query(insertSharedLetterContentSql, [
            share_id,
            content,
            s3_key,
            title
        ]);
        conn.release();
        if (result.affectedRows === 0) {
            throw new Error('Failed to update SHARED_LETTER table');
        }
    } catch (err) {
        console.error('Error updating SHARED_LETTER table:', err);
        throw err;
    }
}



export const getLettersPreview = async (offset, limit) => {
    try {
        const conn = await pool.getConnection();
        const query = selectLettersPreviewSql;
        const params = [limit, offset];

        const [result] = await conn.query(query, params);
        conn.release();

        return result;
    } catch (err) {
        console.log("share_letters.dao.js getLettersPreview [err]: ", err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};
