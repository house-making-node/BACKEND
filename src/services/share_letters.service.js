import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { addLetterData, getLetterData, addScrapData, getScrapData, deleteScrapData } from '../models/share_letters.dao.js';
import { addLetterDataResponseDTO, addScrapDataResponseDTO } from '../dtos/share_letters.dto.js';
import { getUser } from '../models/user.dao.js';

export const addLetter = async (body) => {
    try {
        const user = await getUser(body.user_id);

        if (user === -1) {
            throw new BaseError(status.BAD_REQUEST, 'User not found');
        }

        const letterData = await addLetterData({
            'user_id': body.user_id,
            'nickname': body.nickname,
            'age': body.age,
            'experience_detail': body.experience_detail,
            'experience_comment': body.experience_comment,
            's3_key': body.s3_key,
            'title': body.title
        });

        if (letterData === -1) {
            throw new BaseError(status.BAD_REQUEST, 'Failed to add shared letter');
        } else {
            const letterInfo = await getLetterData(letterData);
            return addLetterDataResponseDTO(letterInfo);
        }
    } catch (error) {
        throw new BaseError(status.INTERNAL_SERVER_ERROR, error.message);
    }
};


export const addScrap = async (body) => {
    try{
        const user = await getUser(body.user_id);

        if(user === -1){
            throw new BaseError(status.USER_NOT_FOUND,'User not found');
        }

        const scrapData = await addScrapData({
            'user_id' : body.user_id,
            'letter_id' : body.letter_id
        });

        console.log("share_letters.service.js scrapData : ", scrapData);


        if(scrapData === -1){
            throw new BaseError(status.INTERNAL_SERVER_ERROR,'Failed to scrap letter');
        }else{
            const scrapInfo = await getScrapData(scrapData);
            return addScrapDataResponseDTO(scrapInfo);
        }
    }catch(error){
        throw new BaseError(status.INTERNAL_SERVER_ERROR,error.message);
    }
}

export const deleteScrap = async(body) => {
    try{
        const user = await getUser(body.user_id);

        if(user === -1) {
            throw new BaseError(status.USER_NOT_FOUND,'User not found');
        }

        const result = await deleteScrapData({
            'user_id' : body.user_id,
            'letter_id' : body.letter_id
        });

        if(result.affectedRows === 0){
            throw new BaseError(status.NOT_FOUND,'Scrap not found');
        }

        return {
            message: '공유레터가 스크랩에서 제외되었습니다!',
            user_id: body.user_id,
            letter_id: body.letter_id
        };


    } catch(error){
        throw new BaseError(status.INTERNAL_SERVER_ERROR,error.message);
    }
}
