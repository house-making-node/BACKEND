import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { addConsultReqResponseDTO, roomImagesResponseDTO, getConsultStatusResponseDTO } from "../dtos/consult.response.dto.js";
import { getConsultReq, setHouseSize, setMood, setRoomNumber, setConcern, setStatus, setImage, getRoomImage } from "../models/consult.dao.js";
import { getUser } from "../models/user.dao.js";

export const addHouseSize=async (body)=>{
    //유저 정보가 있는지 확인
    const getUserData=await getUser(body.user_id);
    //유저 정보가 없으면 에러
    if(getUserData==-1){
        throw new BaseError(status.USER_NOT_FOUND);
    }
    //집 사이즈 추가후 consulting_id를 반환
    const addHouseData=await setHouseSize({
        'user_id':body.user_id,
        'house_size':body.house_size,
        'status':'step1'
    });
    //집 사이즈 추가 실패
    if(addHouseData==-1){
        throw new BaseError(status.BAD_REQUEST);
    }
    //추가후 반환된 consulting_id를 이용하여 컨설팅 정보를 가져옴
    return addConsultReqResponseDTO(await getConsultReq(addHouseData));
}

export const addRoomNumber=async (body)=>{
    //컨설팅 정보가 있는지 확인
    const getConsultData=await getConsultReq(body.consulting_id);
    //컨설팅 정보가 없으면 에러
    if(getConsultData==-1){
        throw new BaseError(status.CONSULT_NOT_FOUND);
    }
    //방 개수 추가 후 consulting_id를 반환
    const addRoomData=await setRoomNumber({
        'consulting_id':body.consulting_id,
        'room_number':body.room_num,
        'status':'step1',
    });
    //추가후 반환된 consulting_id를 이용하여 컨설팅 정보를 가져옴
    return addConsultReqResponseDTO(await getConsultReq(addRoomData));
}

export const addMood=async (body)=>{
    const getConsultData=await getConsultReq(body.consulting_id);
    if(getConsultData==-1){
        throw new BaseError(status.CONSULT_NOT_FOUND);
    }
    const addMoodData=await setMood({
        'consulting_id':body.consulting_id,
        'mood':body.mood,
        'status':'step2',
    });
    console.log(addMoodData);
    return addConsultReqResponseDTO(await getConsultReq(addMoodData));
}

export const addConcern=async(body)=>{
    const getConsultData=await getConsultReq(body.consulting_id);
    if(getConsultData==-1){
        throw new BaseError(status.CONSULT_NOT_FOUND);
    }
    const addConcernData=await setConcern({
        'consulting_id':body.consulting_id,
        'concern':body.concern,
        'status':'step4',
    });
    return addConsultReqResponseDTO(await getConsultReq(addConcernData));

}

export const updateStatus=async (body)=>{
    const getConsultData=await getConsultReq(body.consulting_id);
    if(getConsultData==-1){
        throw new BaseError(status.CONSULT_NOT_FOUND);
    }
    const updateStatusData=await setStatus({
        'consulting_id':body.consulting_id,
        'status':body.status,
    });
    return addConsultReqResponseDTO(await getConsultReq(updateStatusData));
}

export const getConsultingStatus=async (consulting_id)=>{
    const getConsultData=await getConsultReq(consulting_id);
    if(getConsultData==-1){
        throw new BaseError(status.CONSULT_NOT_FOUND);
    }
    return getConsultStatusResponseDTO(getConsultData);
}

export const addRoomImages=async(body,s3_key)=>{
    const getConsultData=await getConsultReq(body.consulting_id);
    if(getConsultData==-1){
        throw new BaseError(status.CONSULT_NOT_FOUND);
    }
    const addImagesData=await setImage({
        'consulting_id':body.consulting_id,
        's3_key':s3_key
    });
    const updateStatusData=await setStatus({
        'consulting_id':body.consulting_id,
        'status':'step3'
    });
    if(addImagesData==-1){
        throw new BaseError(status.FAIL, "이미지 추가 실패");
    }
    else{
        console.log(await getConsultReq(updateStatusData));
        console.log(await getRoomImage(addImagesData));
        return roomImagesResponseDTO(await getConsultReq(updateStatusData),await getRoomImage(addImagesData));
    }
}