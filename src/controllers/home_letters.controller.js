// home_letters.controller.js

import { response } from '../../config/response.js';
import { status } from '../../config/response.status.js';
import { addInfo } from '../services/home_subscriptions.service.js';
import { getConcernDetailById } from '../models/concern.dao.js';
import { getRefinedContent } from '../services/gpt.service.js';
import { addHomeLetter, getHomeLetterById } from '../models/home_letters.dao.js';
import { homeLetterResponseDTO } from '../dtos/home_letters.dto.js';

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

export const createHomeLetter = async (req, res) => {
    try {
        const { title, s3_key, concern_id } = req.body;
        console.log('자취레터가 저장됩니다.');
        console.log('body: ', { title, s3_key, concern_id });

        const prompt = `항상 글의 시작은 '안녕하세요, 자취레터 구독자 여러분 ! 오늘도 찾아와 주셔서 감사합니다. 이번 주 레터의 주제는 바로 ${title}~ 입니다. (고민내용) 어떻게 하는게 좋을까요?' 로 시작해주고 중간에 내용은 고민내용을 이야기처럼 풀어줘. 마지막으로 항상 글의 마지막은 '여러분의 자취 생활에 작은 행복이 가득하길 바라며, 자취레터드림.'으로 마무리해줘`;

        console.log('GPT API 호출 시작');
        const refinedContent = await getRefinedContent(prompt);
        console.log('GPT API 호출 완료');
        
        const letterData = {
            title,
            s3_key,
            concern_id,
            contents: refinedContent,
            created_at: new Date(),
        };

        console.log('Home Letter 저장 시작');
        await addHomeLetter(letterData);
        console.log('Home Letter 저장 완료');

        res.status(201).json({ message: 'Home letter created successfully.' });
    } catch (error) {
        console.error('Error in createHomeLetter:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};