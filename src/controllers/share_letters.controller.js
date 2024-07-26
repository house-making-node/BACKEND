import { response } from '../../config/response.js';
import { status } from '../../config/response.status.js';
import { addInfo } from '../services/share_subscriptions.service.js';
import { addLetter } from '../services/share_letters.service.js';
import { uploadToS3 } from '../middleware/image.uploader.js';

export const addSubscriptionInfo = async (req,res,next) => {
    try{
        console.log("사용자의 구독정보가 저장됩니다.");
        console.log("body: ",req.body);

        const info = await addInfo(req.body);
        res.send(response(status.SUCCESS,info));
    }catch (error){
        next(error);
    }
};

export const addSharedLetter = async (req, res, next) => {
    try {
        console.log('사용자의 공유레터가 제출되었습니다.');
        console.log('body : ', req.body);

        let s3Key;
        if (req.file) {
            s3Key = await uploadToS3(req.file, 'images');
        }

        const letter = await addLetter({ ...req.body, s3_key: s3Key });
        res.send(response(status.SUCCESS, letter));
    } catch (error) {
        next(error);
    }
};