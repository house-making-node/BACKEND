// home_letters.service.js

import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { getUser } from '../models/user.dao.js';
import { addSubData, getSubInfo } from '../models/home_subscriptions.dao.js';
import { addSubInfoResponseDTO } from '../dtos/home_subscriptions.dto.js';

export const addInfo = async (body) => {
    const user = await getUser(body.user_id);

    if (user == -1) {
        throw new BaseError(status.BAD_REQUEST, 'User not found');
    }
    const subData = await addSubData({
        user_id: body.user_id,
        email: body.email,
        name: body.name
    });
    if (subData == -1) {
        throw new BaseError(status.BAD_REQUEST, 'Failed to add subscription info');
    } else {
        const subInfo = await getSubInfo(subData);
        return addSubInfoResponseDTO(subInfo);
    }
};
