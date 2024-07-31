import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { addLetterData, getLetterData } from '../models/share_letters.dao.js';
import { addLetterDataResponseDTO } from '../dtos/share_letters.dto.js';
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
