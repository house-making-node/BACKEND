import { response } from '../../config/response.js';
import { status } from '../../config/response.status.js';
import { addInfo } from '../services/home_subscriptions.service.js';
import { getConcernDetailById } from '../models/concern.dao.js';
import { getRefinedContent } from '../services/gpt.service.js';
import { addHomeLetter } from '../models/home_letters.dao.js';
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
