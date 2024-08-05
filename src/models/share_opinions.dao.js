import { BaseError } from "../../config/error.js";
import { pool } from "../../config/db.connect.js";
import { status } from "../../config/response.status.js";
import { insertOpinionSql, insertOpinionInfoSql } from "../models/share_opinions.sql.js";


export const insertOpinion = async (opinionData) => {


    try {
        const conn = await pool.getConnection();
        const query = insertOpinionSql;
        const params = [opinionData.letter_id, opinionData.user_id];
        const [result] = await conn.query(query, params);

        if (result.affectedRows === 0) {
            throw new Error('Failed to insert opinion');
        }

        return result;
    } catch (err) {
        console.log("share_opinions.dao.js insertOpinion [err]: ", err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};

export const insertOpinionInfo = async (opinionData) => {
    try {
        const conn = await pool.getConnection();
        const query = insertOpinionInfoSql;
        const params = [
            opinionData.opinion_id,
            opinionData.is_satisfy,
            opinionData.satisfy_detail_1,
            opinionData.satisfy_detail_2,
            opinionData.satisfy_detail_3,
            opinionData.unsatisfy_detail_1,
            opinionData.unsatisfy_detail_2,
            opinionData.unsatisfy_detail_3,
            opinionData.opinion_good,
            opinionData.opinion_bad,
            opinionData.comment
        ];
        const [result] = await conn.query(query, params);

        if (result.affectedRows === 0) {
            throw new Error('Failed to insert opinion info');
        }

        return result;
    } catch (err) {
        console.log("share_opinions.dao.js insertOpinionInfo [err]: ", err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};