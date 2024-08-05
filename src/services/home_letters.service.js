//home_letters.service.js

import { getLetterById } from '../models/home_letters.dao.js';
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

export const getLetterDetail = async (letter_id) => {
    console.log("getLetterDetail [letter_id]: ", letter_id); //에러로그확인용
    const letterDetail = await getLetterById(letter_id);

    if (!letterDetail) {
        throw new BaseError(status.NOT_FOUND, 'Letter not found');
    }

    return letterDetail;
};
