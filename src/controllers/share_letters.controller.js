import { response } from '../../config/response.js';
import { status } from '../../config/response.status.js';
import { addInfo } from '../services/share_subscriptions.service.js';
//import { addLetter } from '../services/share_letters.service.js';

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

