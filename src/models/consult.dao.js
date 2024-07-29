import { pool } from "../../config/db.connect.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { getConsultReqWithIdQ, setConcernQ, setHouseSizeQ, setMoodQ, setRoomNumberQ} from "./consult.sql.js";

export const getConsultReq=async(id)=>{
    try{
        const conn=await pool.getConnection();
        const [result]=await pool.query(getConsultReqWithIdQ,id);
        if(result.length == 0){
            return -1;
        }
        conn.release();
        return result;
    }catch(err){
        console.log(err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const setHouseSize=async(body)=>{
    try{
        const conn=await pool.getConnection();
        const [result]=await pool.query(setHouseSizeQ,[body.user_id,body.house_size,body.status]);
        conn.release();
        //insertId는 삽입된 데이터의 id값을 반환(consulting_id)
        return result.insertId;
    }catch(err){
        console.log(err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const setRoomNumber=async(body)=>{
    try{
        const conn=await pool.getConnection();
        await pool.query(setRoomNumberQ,[body.room_number,body.status,body.consulting_id]);
        conn.release();
        return body.consulting_id;
    }catch(err){
        console.log(err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const setMood=async(body)=>{
    try{
        const conn=await pool.getConnection();
        await pool.query(setMoodQ,[body.mood,body.status,body.consulting_id]);
        conn.release();
        return body.consulting_id;
    }catch(err){
        console.log(err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const setConcern=async(body)=>{
    try{
        const conn=await pool.getConnection();
        await pool.query(setConcernQ,[body.concern,body.status,body.consulting_id]);
        conn.release();
        return body.consulting_id;
    }catch(err){
        console.log(err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}