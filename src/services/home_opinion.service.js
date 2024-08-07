import { insertOpinion } from '../models/home_opinion.dao.js';
import { insertOpinionInfo } from '../models/home_opinion_info.dao.js';
import { BaseError } from '../../config/error.js';
import { status } from '../../config/response.status.js';

export const submitOpinion = async (user_id, letter_id, opinionInfo) => {
    const opinion_id = await insertOpinion(user_id, letter_id);
    if (!opinion_id) {
        throw new BaseError(status.BAD_REQUEST, 'Failed to insert opinion');
    }
    opinionInfo.opinion_id = opinion_id;
    const opinionInfoId = await insertOpinionInfo(opinionInfo);
    if (!opinionInfoId) {
        throw new BaseError(status.BAD_REQUEST, 'Failed to insert opinion info');
    }
    return opinionInfoId;
};
