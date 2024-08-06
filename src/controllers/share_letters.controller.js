import { response } from '../../config/response.js';
import { status } from '../../config/response.status.js';


import { addInfo } from '../services/share_subscriptions.service.js';
import { addLetter, addScrap, deleteScrap } from '../services/share_letters.service.js';
import { saveOpinion } from '../services/share_opinions.service.js';
import { processAndSaveLetter } from '../services/share_letters_api.service.js';
import { getPreview, getLetterDetails } from '../providers/share_letters.provider.js';

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
        console.log("file : ", req.file);
        console.log("s3_key : ", req.file.key);


        const letter = await addLetter({ ...req.body, s3_key: req.file.key }); // 제출한 공유레터를 SHARE 테이블에 저장

        res.send(response(status.SUCCESS, letter)); // 사용자에게 즉시 성공 응답 반환

        // 비동기 작업으로 편집 작업 후 SHARED_LETTER 테이블에 최종 저장
        processAndSaveLetter(letter.share_id, req.body.nickname, req.body.experience_detail, req.file.key);
    } catch (error) {
        next(error);
    }
};


export const lettersPreview = async (req, res, next) => {
    try{
        console.log("공유레터 리스트가 조회됩니다.");
        console.log("body: ", req.body);

        const {offset, limit} = req.query;

        const preview = await getPreview(offset,limit);

        return res.send(response(status.SUCCESS, preview));
    } catch(error){
        next(error);
    }
};


export const getLetterById = async (req, res, next) => {
    try{
        console.log("특정 공유레터가 조회됩니다.");
        console.log("body: ", req.body);

        const { letter_id } = req.params;

        return res.send(response(status.SUCCESS, await getLetterDetails(letter_id)));
    } catch(error){
        next(error);
    }
};


export const submitOpinion = async (req,res,next) => {
    try{
    
        const { letter_id } = req.params;
        const opinionData = { ...req.body, letter_id};

        console.log(`공유레터 ID: ${letter_id}에 대한 의견이 제출됩니다.`);
        console.log("의견 데이터: ", opinionData);

        return res.send(response(status.SUCCESS, await saveOpinion(opinionData)));
    } catch (error) {
        console.error("share_letters.controller.js error: ", error); 
        next(error);
    }
};


export const addLetterToScrap = async (req,res,next) => {
    try{
        console.log("공유레터가 스크랩에 저장됩니다.");
        console.log("body : ", req.body);

        const scrap = await addScrap(req.body);
        return res.send(response(status.SUCCESS,scrap));
    } catch (error) {
        console.log("share_letters.controller.js addLetterToScrap error : ", error);
        next(error);
    }
}

export const deleteLetterFromScrap = async (req,res,next) => {
    try{
        console.log("공유레터가 스크랩에서 제외됩니다.");
        console.log("body : ", req.body);

        const scrapX = await deleteScrap(req.body);
        return res.send(response(status.SUCCESS,scrapX));
    } catch (err){
        console.log("share_letters.controller.js deleteLetterFromScrap error : ", err);
        next(err);
    }
}