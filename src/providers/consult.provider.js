import { get } from "http";
import { status } from "../../config/response.status.js";
import { addConsultReqResponseDTO, getConsultStatusResponseDTO, getImagesResponseDTO, getUserConsultReqResponseDTO } from "../dtos/consult.response.dto.js";
import { getConsultReq, getUserBlueprint, getUserConsult, getUserRoomImage } from "../models/consult.dao.js";

export const getConsultRequest=async (consulting_id)=>{
    const getConsultData=await getConsultReq(consulting_id);
    if(getConsultData==-1){
        throw new BaseError(status.CONSULT_NOT_FOUND);
    }
    return addConsultReqResponseDTO(getConsultData);
}

export const getConsultingStatus=async (consulting_id)=>{
    const getConsultData=await getConsultReq(consulting_id);
    if(getConsultData==-1){
        throw new BaseError(status.CONSULT_NOT_FOUND);
    }
    return getConsultStatusResponseDTO(getConsultData);
}

export const getRoomImages=async (consulting_id)=>{
    const getConsultData=await getConsultReq(consulting_id);
    if(getConsultData==-1){
        throw new BaseError(status.CONSULT_NOT_FOUND);
    }
    return getImagesResponseDTO(await getUserRoomImage(consulting_id));
}

export const getBlueprints=async (consulting_id)=>{
    const getConsultData=await getConsultReq(consulting_id);
    if(getConsultData==-1){
        throw new BaseError(status.CONSULT_NOT_FOUND);
    }
    return getImagesResponseDTO(await getUserBlueprint(consulting_id));
}

export const getUserConsulting=async (user_id)=>{
    const getConsultData=await getConsultReq(user_id);
    if(getConsultData==-1){
        throw new BaseError(status.CONSULT_NOT_FOUND);
    }
    return getUserConsultReqResponseDTO(await getUserConsult(user_id));
}