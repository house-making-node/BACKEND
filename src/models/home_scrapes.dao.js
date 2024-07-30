//home_scrapes.dao.js

import { pool } from "../../config/db.connect.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { insertScrapInfoSql, getScrapInfoSql } from './home_scrapes.sql.js';

// 스크랩 추가
export const addScrapData = async (body) =>{
    try{
        console.log("home_scrapes.dao.js [data] : ",body);
        const conn = await pool.getConnection();
        const [result] = await pool.query(insertScrapInfoSql,[
            body.user_id,
            body.letter_id
        ]);
        conn.release();
        if(result.length == 0){
            return -1;
        }

        return result.insertId;
    }
    catch(err){
        console.log("home_scrapes.dao.js [err] : ",err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const getScrapInfo = async (id) => {
    try{
        const conn = await pool.getConnection();
        const [result] = await conn.query(getScrapInfoSql, [id]);
        conn.release();

        if(result.length === 0) {
            return -1;
        }

        return result;
    }catch (err) {
        console.log("home_scrapes.dao.js getScrapInfo [err] : ", err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}