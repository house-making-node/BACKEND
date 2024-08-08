// consult.controller.js
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { getConsultingStatus, getConsultRequest, getRoomImages } from "../providers/consult.provider.js";
import { addHouseSize, addMood, addRoomNumber, addConcern, addRoomImages, addBlueprints } from "../services/consult.service.js";

export const houseSizeAdd = async (req, res, next) => {
    try {
        console.log("body", req.body);  // 이 부분에서 요청 본문을 확인
        const result = await addHouseSize(req.body);
        res.send(response(status.SUCCESS, result));
    } catch (error) {
        next(error);
    }
};

export const roomNumberAdd= async (req, res, next) => {
    try {
        console.log("body", req.body);  // 이 부분에서 요청 본문을 확인
        const result = await addRoomNumber(req.body);
        res.send(response(status.SUCCESS, result));
    } catch (error) {
        next(error);
    }
}

export const moodAdd= async (req, res, next) => {
    try{
        console.log("body", req.body);
        const result = await addMood(req.body);
        res.send(response(status.SUCCESS, result));
    }catch(error){
        next(error);
    }
}

export const concernAdd= async(req,res,next)=>{
    try{
        console.log("body",req.body);
        const result=await addConcern(req.body);
        res.send(response(status.SUCCESS,result));
    }catch(error){
        next(error);
    }
}

export const statusUpdate=async(req,res,next)=>{
    try{
        console.log("body",req.body);
        const result=await updateStatus(req.body);
        res.send(response(status.SUCCESS,result));
    }catch(error){
        next(error);
    }
}

export const consultingStatusGet=async(req,res,next)=>{
    try{
        console.log("params",req.params);
        const result=await getConsultingStatus(req.params.consulting_id);
        res.send(response(status.SUCCESS,result));
    }catch(error){
        next(error);
    }
}

export const consultRequestGet=async(req,res,next)=>{
    try{
        console.log("params",req.params);
        const result=await getConsultRequest(req.params.consulting_id);
        res.send(response(status.SUCCESS,result));
    }catch(error){
        next(error);
    }
}

export const roomImageAdd=async(req,res,next)=>{
    try{
        console.log("body", req.body);
        console.log("file", req.file);
        console.log("s3_key", req.file.key);
        
        const result=await addRoomImages(req.body,req.file.key);
        res.send(response(status.SUCCESS,result));
    }catch(error){
        console.log(error);
        next(error);
    }
}

export const blueprintAdd=async(req,res,next)=>{
    try{
        console.log("body", req.body);
        console.log("file", req.file);
        console.log("s3_key", req.file.key);
        
        const result=await addBlueprints(req.body,req.file.key);
        res.send(response(status.SUCCESS,result));
    }catch(error){
        console.log(error);
        next(error);
    }
}

export const roomImageGet=async(req,res,next)=>{
    try{
        console.log("params",req.params);
        const result=await getRoomImages(req.params.consulting_id);
        res.send(response(status.SUCCESS,result));
    }catch(error){
        next(error);
    }
}