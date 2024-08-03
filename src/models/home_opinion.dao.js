import { pool } from '../../config/db.connect.js';
import { BaseError } from '../../config/error.js';
import { status } from '../../config/response.status.js';

export const insertOpinion = async (user_id, letter_id) => {
    try {
        const conn = await pool.getConnection();
        const [result] = await conn.query(
            'INSERT INTO HOME_OPINION (user_id, letter_id) VALUES (?, ?)', 
            [user_id, letter_id]
        );
        conn.release();
        return result.insertId;
    } catch (err) {
        console.log("insertOpinion [err]: ", err.message, err.stack);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};
