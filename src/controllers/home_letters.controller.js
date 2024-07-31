import { response } from '../../config/response.js';
import { status } from '../../config/response.status.js';
import { addInfo } from '../services/home_subscriptions.service.js';
import { getConcernDetailById } from '../models/concern.dao.js';
import { getRefinedContent } from '../services/gpt.service.js';
import { addHomeLetter } from '../models/home_letters.dao.js';
import { homeLetterResponseDTO } from '../dtos/home_letters.dto.js';
import { addConcern } from '../services/home_concerns.service.js';
import { addScrap } from '../services/home_scrapes.service.js';
//이미지 업로드
import { uploadToS3 } from '../middleware/image.uploader.js';

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
//자취레터 생성
export const createHomeLetter = async (req, res) => {
    try {
        console.log("자취레터가 저장됩니다.");
        console.log("body: ", req.body);
        const { concern_id, s3_key } = req.body;

        // Get the concern details from the CONCERN table
        const concern = await getConcernDetailById(concern_id);
        if (!concern) {
            return res.status(404).json({ message: 'Concern not found' });
        }

        const { title, concern_detail } = concern;

        // Use GPT to refine the content
        const refinedContent = await getRefinedContent(title, concern_detail);

        // Create a new home letter
        const newHomeLetter = {
            concern_id,
            title,
            s3_key,
            contents: refinedContent
        };

        await addHomeLetter(newHomeLetter);

        res.status(201).json({ message: 'Home letter created successfully' });
    } catch (error) {
        console.error('Error creating home letter:', error);
        res.status(500).json({ message: 'Internal server error' });
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

//스크랩 추가
export const addScrapInfo = async (req, res, next) => {
    try {
        console.log("해당 자취레터를 스크랩에 추가합니다.");
        console.log("body: ", req.body);

        const { user_id, letter_id } = req.body;
        if (!user_id || !letter_id) {
            console.log("Missing required fields: user_id, letter_id");
            return res.status(status.BAD_REQUEST).json({
                error: 'Missing required fields: user_id, letter_id'
            });
        }

        const info = await addScrap(req.body);
        console.log("addScrap response: ", info);
        res.send(response(status.SUCCESS, info));
    } catch (error) {
        console.log("addScrapInfo [error]: ", error.message, error.stack);
        next(error);
    }
};
