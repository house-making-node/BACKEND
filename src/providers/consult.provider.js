import { status } from "../../config/response.status.js";
import { addConsultReqResponseDTO, getConsultStatusResponseDTO } from "../dtos/consult.response.dto.js";
import { getConsultReq } from "../models/consult.dao.js";

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