// home_scrapes.service.js

import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { getUser } from '../models/user.dao.js';
import { addScrapData, getScrapInfo } from '../models/home_scrapes.dao.js';
import { addScrapInfoResponseDTO } from '../dtos/home_scrapes.dto.js';

export const addScrap = async (body) => {
    const user = await getUser(body.user_id);

    if (user == -1) {
        throw new BaseError(status.BAD_REQUEST, 'User not found');
    }

    const letter = await getLetterById(body.letter_id); // letter_id (해당 레터가 없는데 스크랩되면 안되니까)유효성 검사
    if (letter == -1) {
        throw new BaseError(status.BAD_REQUEST, 'Letter not found');
    }

    const subData = await addScrapData({
        user_id: body.user_id,
        letter_id: body.letter_id
    });
    if (subData == -1) {
        throw new BaseError(status.BAD_REQUEST, 'Failed to add scrap info');
    } else {
        const subInfo = await getScrapInfo(subData);
        return addScrapInfoResponseDTO(subInfo);
    }
};