import { pool } from "../../config/db.connect.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { insertSubInfoSql, getSubInfoSql } from './home_subscriptions.sql.js';

// 구독데이터 삽입
export const addSubData = async (body) =>{
    try{
        console.log("home_subscriptions.dao.js [data] : ",body);
        const conn = await pool.getConnection();
        const [result] = await pool.query(insertSubInfoSql,[
            body.user_id,
            body.email,
            body.name
        ]);
        conn.release();
        if(result.length == 0){
            return -1;
        }

        return result.insertId;
    }
    catch(err){
        console.log("home_subscriptions.dao.js [err] : ",err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const getSubInfo = async (id) => {
    try{
        const conn = await pool.getConnection();
        const [result] = await conn.query(getSubInfoSql, [id]);
        conn.release();

        if(result.length === 0) {
            return -1;
        }

        return result;
    }catch (err) {
        console.log("home_subscriptions.dao.js getSubInfo [err] : ", err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}