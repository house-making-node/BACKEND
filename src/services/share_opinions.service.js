import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { insertOpinion, insertOpinionInfo } from "../models/share_opinions.dao.js";
import { getUser } from "../models/user.dao.js";
import { saveOpinionResponseDTO } from "../dtos/share_opinions.dto.js";

export const saveOpinion = async (opinionData) => {
 

    try{

        const user = await getUser(opinionData.user_id);

        if (user === -1) {
            throw new BaseError(status.BAD_REQUEST, 'User not found');
        }


      // SHARE_OPINION 테이블에 저장
      const share_opinion = await insertOpinion( {
        letter_id: opinionData.letter_id,
        user_id: opinionData.user_id
        });

        const opinionId = share_opinion.insertId;

        const info = {
            opinion_id: opinionId,
            is_satisfy: opinionData.is_satisfy,
            satisfy_detail_1: opinionData.satisfy_detail_1,
            satisfy_detail_2: opinionData.satisfy_detail_2,
            satisfy_detail_3: opinionData.satisfy_detail_3,
            unsatisfy_detail_1: opinionData.unsatisfy_detail_1,
            unsatisfy_detail_2: opinionData.unsatisfy_detail_2,
            unsatisfy_detail_3: opinionData.unsatisfy_detail_3,
            opinion_good: opinionData.opinion_good,
            opinion_bad: opinionData.opinion_bad,
            comment: opinionData.comment
        };
        
       // SHARE_OPINION_INFO 테이블에 저장
       await insertOpinionInfo(info);

       return saveOpinionResponseDTO({
        opinion_id: opinionId,
        letter_id: opinionData.letter_id,
        user_id: opinionData.user_id
    });

    }catch (error) {
        
        console.error("share_opinions.service.js Error : ",error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error saving opinion');
    } 
}