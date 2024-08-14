// import OpenAI from "openai";
// import { status } from "../../config/response.status.js";
// import { BaseError } from "../../config/error.js";
// import { getConsultReq, getUserBlueprint, getUserRoomImage } from "../models/consult.dao.js";
// import fetch from "node-fetch";
// import dotenv from "dotenv";

// dotenv.config();

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// });

// // Hugging Face Inference API 설정
// const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/openai/clip-vit-base-patch32';
// const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY; // .env 파일에 Hugging Face API 키 저장

// // 이미지 로드 및 분석 함수
// const analyzeImage = async (imageUrl) => {
//     try {
//         const response = await fetch(imageUrl);
//         const imageBuffer = await response.arrayBuffer();
//         const base64Image = Buffer.from(imageBuffer).toString('base64');

//         const texts = [
//             "a chair", "a desk", "a laptop", "a bed", "a houseplant", "a sofa", "a table", "a wardrobe",
//             // ... (추가 텍스트)
//         ];

//         const payload = {
//             inputs: {
//                 image: base64Image,
//                 text: texts
//             }
//         };

//         const apiResponse = await fetch(HUGGINGFACE_API_URL, {
//             method: "POST",
//             headers: {
//                 Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(payload)
//         });

//         const result = await apiResponse.json();

//         console.log("Hugging Face API Response:", result); // 이 부분에서 응답을 출력

//         const probsList = texts.map((text, index) => ({
//             text,
//             prob: result[index]?.score || 0
//         }));

//         // 분석 결과 출력
//         console.log("Image analysis results for URL:", imageUrl);
//         probsList.forEach(({ text, prob }) => {
//             console.log(`${text}: ${(prob * 100).toFixed(1)}%`);
//         });

//         return probsList.sort((a, b) => b.prob - a.prob);
//     } catch (error) {
//         console.error("Failed to analyze image:", error);
//         return null;
//     }
// };

// export const addGptRequest = async (body) => {
//     try {
//         const getConsultData = await getConsultReq(body.consulting_id);
//         if (getConsultData === -1) {
//             throw new BaseError(status.CONSULT_NOT_FOUND);
//         }
//         console.log("Consult Data:", getConsultData);

//         const getRoomImageData = await getUserRoomImage(body.consulting_id);
//         const getBlueprintData = await getUserBlueprint(body.consulting_id);
//         if (getRoomImageData === -1 || getBlueprintData === -1) {
//             throw new BaseError(status.IMAGE_NOT_FOUND);
//         }
//         console.log("Room Image Data:", getRoomImageData);
//         console.log("Blueprint Image Data:", getBlueprintData);

//         const user_input = {
//             house_size: getConsultData[0].house_size,
//             room_number: getConsultData[0].room_num,
//             mood: getConsultData[0].mood,
//             concern: getConsultData[0].concern,
//         };

//         console.log(user_input);

//         // 1. 여러 방 이미지에 대해 분석 수행
//         const roomAnalyses = await Promise.all(
//             getRoomImageData.map(async (imageData) => {
//                 const imageUrl = `https://jibkku-s3.s3.ap-northeast-2.amazonaws.com/${imageData.s3_key}`;
//                 return await analyzeImage(imageUrl);
//             })
//         );

//         // 2. 여러 도면 이미지에 대해 분석 수행
//         const blueprintAnalyses = await Promise.all(
//             getBlueprintData.map(async (imageData) => {
//                 const imageUrl = `https://jibkku-s3.s3.ap-northeast-2.amazonaws.com/${imageData.s3_key}`;
//                 return await analyzeImage(imageUrl);
//             })
//         );

//         if (roomAnalyses.includes(null) || blueprintAnalyses.includes(null)) {
//             throw new BaseError(status.IMAGE_PROCESSING_FAILED);
//         }

//         // 3. GPT-4 요청 생성 및 전송
//         const roomResults = roomAnalyses
//             .map((analysis, index) => `방 이미지 ${index + 1}: ${analysis.map(obj => `${obj.text} (${(obj.prob * 100).toFixed(1)}%)`).join(', ')}`)
//             .join('\n');

//         const blueprintResults = blueprintAnalyses
//             .map((analysis, index) => `도면 이미지 ${index + 1}: ${analysis.map(obj => `${obj.text} (${(obj.prob * 100).toFixed(1)}%)`).join(', ')}`)
//             .join('\n');

//         const description_prompt_korean = `
//         사용자의 요구사항:
//         - 평수: ${user_input.house_size}
//         - 방 개수: ${user_input.room_number}
//         - 선호 톤: ${user_input.mood}
//         - 고민 사항: ${user_input.concern}

//         방 이미지 분석 결과:
//         ${roomResults}
//         도면 이미지 분석 결과:
//         ${blueprintResults}

//         이 정보를 바탕으로 사용자에게 어울리는 가구 추천, 물건 정리 방법, 공간 활용 솔루션, 벽지와 가구 색상 조화 방법 등 자세한 솔루션을 제공해 주세요.
//         첫 문장은 '안녕하세요! 사용자의 고민 사항을 해결하기 위한 몇 가지 인테리어 아이디어를 제안드리겠습니다.'로 시작해 주세요.
//         `;

//         const response = await openai.chat.completions.create({
//             model: "gpt-4",
//             messages: [
//                 { role: "system", content: "You are a helpful assistant that provides interior design solutions." },
//                 { role: "user", content: description_prompt_korean }
//             ]
//         });

//         const description_korean = response.choices[0].message.content.trim();
//         console.log("GPT 답변:", description_korean);

//         // 추가 로직: 컨설팅 결과를 데이터베이스에 저장 등
//     } catch (error) {
//         console.error("Error in addGptRequest:", error);
//     }
// };

import OpenAI from "openai";
import { status } from "../../config/response.status.js";
import { BaseError } from "../../config/error.js";
import { getConsultReq, getGptResponse, getUserBlueprint, getUserRoomImage, setGptResponse, setStatus } from "../models/consult.dao.js";
import axios from "axios";
import dotenv from "dotenv";
import { addGptResponseDTO } from "../dtos/consult.response.dto.js";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const GOOGLE_VISION_API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_VISION_API_KEY}`;

const analyzeImageWithVisionAPI = async (imageUrl) => {
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');

        const payload = {
            requests: [
                {
                    image: {
                        content: base64Image
                    },
                    features: [
                        { type: "LABEL_DETECTION" },
                    ]
                }
            ]
        };

        const apiResponse = await axios.post(GOOGLE_VISION_API_URL, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const labels = apiResponse.data.responses[0].labelAnnotations || [];
        const results = labels.map(label => ({
            text: label.description,
            prob: label.score
        }));

        console.log("Google Vision API Response:", results);
        return results.sort((a, b) => b.prob - a.prob);
    } catch (error) {
        console.error("Failed to analyze image with Google Vision API:", error);
        return null;
    }
};

export const addGptRequest = async (body) => {
    try {
        const getConsultData = await getConsultReq(body.consulting_id);
        if (getConsultData === -1) {
            throw new BaseError(status.CONSULT_NOT_FOUND);
        }

        const getRoomImageData = await getUserRoomImage(body.consulting_id);
        const getBlueprintData = await getUserBlueprint(body.consulting_id);
        if (getRoomImageData === -1 || getBlueprintData === -1) {
            throw new BaseError(status.IMAGE_NOT_FOUND);
        }
        console.log("Room Image Data:", getRoomImageData);
        console.log("Blueprint Image Data:", getBlueprintData);

        const user_input = {
            house_size: getConsultData[0].house_size,
            room_number: getConsultData[0].room_num,
            mood: getConsultData[0].mood,
            concern: getConsultData[0].concern,
        };

        console.log(user_input);

        // 1. 여러 방 이미지에 대해 분석 수행
        const roomAnalyses = (
            await Promise.all(
                getRoomImageData.map(async (imageData) => {
                    const imageUrl = `https://jibkku-s3.s3.ap-northeast-2.amazonaws.com/${imageData.s3_key}`;
                    console.log(imageUrl);
                    return await analyzeImageWithVisionAPI(imageUrl);
                })
            )
        ).filter(result => result !== null); // null 값 제외

        // 2. 여러 도면 이미지에 대해 분석 수행
        const blueprintAnalyses = (
            await Promise.all(
                getBlueprintData.map(async (imageData) => {
                    const imageUrl = `https://jibkku-s3.s3.ap-northeast-2.amazonaws.com/${imageData.s3_key}`;
                    console.log(imageUrl);
                    return await analyzeImageWithVisionAPI(imageUrl);
                })
            )
        ).filter(result => result !== null); // null 값 제외


        // if (roomAnalyses.includes(null) || blueprintAnalyses.includes(null)) {
        //     throw new BaseError(status.IMAGE_PROCESSING_FAILED);
        // }

        // 3. GPT-4 요청 생성 및 전송
        const roomResults = roomAnalyses
            .map((analysis, index) => `방 이미지 ${index + 1}: ${analysis.map(obj => `${obj.text} (${(obj.prob * 100).toFixed(1)}%)`).join(', ')}`)
            .join('\n');

        const blueprintResults = blueprintAnalyses
            .map((analysis, index) => `도면 이미지 ${index + 1}: ${analysis.map(obj => `${obj.text} (${(obj.prob * 100).toFixed(1)}%)`).join(', ')}`)
            .join('\n');

        console.log("=====RoomImage=====\n", roomResults);
        console.log("=====Blueprint=====\n", blueprintResults);


        const description_prompt_korean = `
        사용자의 요구사항:
        - 평수: ${user_input.house_size}
        - 방 개수: ${user_input.room_number}
        - 선호 톤: ${user_input.mood}
        - 고민 사항: ${user_input.concern}

        방 이미지 분석 결과:
        ${roomResults}
        도면 이미지 분석 결과:
        ${blueprintResults}

        이 정보를 바탕으로 사용자에게 어울리는 가구 추천, 물건 정리 방법, 공간 활용 솔루션, 벽지와 가구 색상 조화 방법 등 자세한 솔루션을 제공해 주세요.
        첫 문장은 '안녕하세요! 사용자의 고민 사항을 해결하기 위한 몇 가지 인테리어 아이디어를 제안드리겠습니다.'로 시작해 주세요.
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a helpful assistant that provides interior design solutions." },
                { role: "user", content: description_prompt_korean }
            ]
        });

        const description_korean = response.choices[0].message.content.trim();
        console.log("GPT 답변:", description_korean);

        //---------------------------------
        //지피티 답변 저장
        const addGptData = await setGptResponse({
            'consulting_id': body.consulting_id,
            'gpt_response': description_korean,
        });
        //지피티 답변 조회
        const getGptData=await getGptResponse(addGptData);
        if(getGptData===-1){
            throw new BaseError(status.RESPONSE_NOT_FOUND);
        }
        //상태 변경
        await setStatus({
            "consulting_id": body.consulting_id,
            "status": "답변완료",
        })
        console.log("GPT Response Data:", getGptData);
        console.log(getConsultData)
        return addGptResponseDTO(getGptData, getConsultData)
        // 추가 로직: 컨설팅 결과를 데이터베이스에 저장 등
    } catch (error) {
        console.error("Error in addGptRequest:", error);
    }


};
