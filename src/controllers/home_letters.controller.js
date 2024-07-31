// home_letters.controller.js

import { response } from '../../config/response.js';
import { status } from '../../config/response.status.js';
import { addInfo } from '../services/home_subscriptions.service.js';
import { addConcern } from '../services/home_concerns.service.js';
import { submitOpinion } from '../services/home_opinion.service.js';
//이미지 업로드
import { uploadToS3 } from '../middleware/image.uploader.js';

//자취레터 의견제출
export const submitLetterOpinion = async (req, res, next) => {
    try {
        console.log("특정 자취레터에 대한 의견을 제출합니다.");
        console.log("body: ", req.body);
        console.log("params: ", req.params);

        const { user_id, is_satisfy, satisfy_detail_1, satisfy_detail_2, satisfy_detail_3, unsatisfy_detail_1, unsatisfy_detail_2, unsatisfy_detail_3, opinion_good, opinion_bad, comment } = req.body;
        const { letter_id } = req.params;

        if (!user_id || !letter_id) {
            return res.status(status.BAD_REQUEST).json({
                error: 'Missing required fields: user_id, letter_id'
            });
        }

        const opinionInfo = {
            is_satisfy,
            satisfy_detail_1,
            satisfy_detail_2,
            satisfy_detail_3,
            unsatisfy_detail_1,
            unsatisfy_detail_2,
            unsatisfy_detail_3,
            opinion_good,
            opinion_bad,
            comment
        };

        const info = await submitOpinion(user_id, letter_id, opinionInfo);
        res.send(response(status.SUCCESS, info));
    } catch (error) {
        console.error("submitLetterOpinion [error]: ", error);
        res.status(500).json(response({isSuccess: false, code: 'COMMON000', message: '서버 에러, 관리자에게 문의 바랍니다.'}, error.message));
    }
};

//구독 정보 저장
export const addSubscriptionInfo = async (req, res, next) => {
    try {
        console.log("사용자의 구독정보가 저장됩니다.");
        console.log("body: ", req.body);

        const { user_id, email, name } = req.body;
        if (!user_id || !email || !name) {
            return res.status(status.BAD_REQUEST).json({
                error: 'Missing required fields: user_id, email, name'
            });
        }

        const info = await addInfo(req.body);
        res.send(response(status.SUCCESS, info));
    } catch (error) {
        next(error);
    }
};

//고민 저장
export const addHomeLetterConcern = async (req, res, next) => {
    try {
        console.log("고민이 저장됐습니다.");
        console.log("body: ", req.body);

        const info = await addConcern(req.body);
        res.status(200).json(response({isSuccess: true, code: 2000, message: 'success!'}, info));  // 상태 코드 200과 응답 데이터 전달
    } catch (error) {
        console.error("addHomeLetterConcern [error]: ", error);
        res.status(500).json(response({isSuccess: false, code: 'COMMON000', message: '서버 에러, 관리자에게 문의 바랍니다.'}, error.message));
    }
};