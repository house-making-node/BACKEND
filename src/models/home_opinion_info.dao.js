import { pool } from '../../config/db.connect.js';
import { BaseError } from '../../config/error.js';
import { status } from '../../config/response.status.js';

export const insertOpinionInfo = async (opinionInfo) => {
    try {
        const conn = await pool.getConnection();
        const [result] = await conn.query(
            `INSERT INTO HOME_OPINION_INFO (opinion_id, is_satisfy, satisfy_detail_1, satisfy_detail_2, satisfy_detail_3, 
            unsatisfy_detail_1, unsatisfy_detail_2, unsatisfy_detail_3, opinion_good, opinion_bad, comment) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [
                opinionInfo.opinion_id, opinionInfo.is_satisfy, opinionInfo.satisfy_detail_1, opinionInfo.satisfy_detail_2,
                opinionInfo.satisfy_detail_3, opinionInfo.unsatisfy_detail_1, opinionInfo.unsatisfy_detail_2, 
                opinionInfo.unsatisfy_detail_3, opinionInfo.opinion_good, opinionInfo.opinion_bad, opinionInfo.comment
            ]
        );
        conn.release();
        return result.insertId;
    } catch (err) {
        console.log("insertOpinionInfo [err]: ", err.message, err.stack);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};
