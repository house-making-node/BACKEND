import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { addConcernData, getConcernData } from '../models/home_concerns.dao.js';
import { addConcernDataResponseDTO } from '../dtos/home_concerns.dto.js';
import { getUser } from '../models/user.dao.js';

export const addConcern = async (body) => {
    try {
        console.log("addConcern [body]: ", body);
        const user = await getUser(body.user_id);

        if (user === -1) {
            throw new BaseError(status.BAD_REQUEST, 'User not found');
        }

        const concernId = await addConcernData({
            user_id: body.user_id,
            age: body.age,
            nickname: body.nickname,
            concern_detail: body.concern_detail,
            concern_comment: body.concern_comment,
            s3_key: body.s3_key || null,
            title: body.title
        });

        if (concernId === -1) {
            throw new BaseError(status.BAD_REQUEST, 'Failed to add concern in home letter');
        } else {
            const concernInfo = await getConcernData(concernId);
            console.log("addConcern [concernInfo]: ", concernInfo);
            const responseDTO = addConcernDataResponseDTO(concernInfo);
            console.log("addConcern [responseDTO]: ", responseDTO);
            return responseDTO;
        }
    } catch (error) {
        console.log("addConcern [error]: ", error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, error.message);
    }
};