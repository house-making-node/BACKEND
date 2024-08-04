import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { getUser } from '../models/user.dao.js';
import { addScrapData, getScrapInfo, getLetterById, getScrapDetailsByUserIdDao } from '../models/home_scrapes.dao.js';
import { addScrapInfoResponseDTO } from '../dtos/home_scrapes.dto.js';

export const getScrapDetailsByUserId = async (user_id) => {
    return await getScrapDetailsByUserIdDao(user_id);
};

export const addScrap = async (body) => {
    console.log("addScrap [body]: ", body);
    const user = await getUser(body.user_id);
    console.log("addScrap [getUser]: ", user);

    if (user == -1) {
        throw new BaseError(status.BAD_REQUEST, 'User not found');
    }

    const letter = await getLetterById(body.letter_id); // letter_id 유효성 검사
    console.log("addScrap [getLetterById]: ", letter);

    if (letter == -1) {
        throw new BaseError(status.BAD_REQUEST, 'Letter not found');
    }

    const subData = await addScrapData({
        user_id: body.user_id,
        letter_id: body.letter_id,
        created_at: body.created_at
    });
    console.log("addScrap [addScrapData]: ", subData);

    if (subData == -1) {
        throw new BaseError(status.BAD_REQUEST, 'Failed to add scrap info');
    } else {
        const subInfo = await getScrapInfo(subData);
        console.log("addScrap [getScrapInfo]: ", subInfo);
        return addScrapInfoResponseDTO(subInfo);
    }
};