import OpenAI from "openai";
import { insertSharedLetterTable } from '../models/share_letters.dao.js';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // API 키
  });


export const processAndSaveLetter = async (shareId, nickname, experienceDetail, s3Key) => {
    
    try {
        // GPT API 호출하여 내용 요약 및 제목 생성
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // 사용할 모델 지정 
            messages: [{
                role: "user",
                content: `Here is a story shared by ${nickname}.\n\n${experienceDetail}\n\nPlease summarize this content and provide a suitable title.`
            }],
            max_tokens: 1500 // 최대 토큰 수 설정
        });

        // GPT 응답에서 요약과 제목 추출
        const fullResponse = response.choices[0]?.message?.content || "";
        
        // 'Title:' 및 'Summary:' 없이 제목과 내용 추출
        const titlePattern = /Title:\s*(.*)/;
        const summaryPattern = /Summary:\s*(.*)/;

        // 제목과 요약 부분 찾기
        const titleMatch = fullResponse.match(titlePattern);
        const summaryMatch = fullResponse.match(summaryPattern);

        // 제목과 요약을 추출
        const title = titleMatch ? titleMatch[1].trim() : 'Untitled'; // 제목이 없으면 'Untitled'
        const editedContent = summaryMatch ? summaryMatch[1].trim() : fullResponse.trim(); // 요약이 없으면 전체 내용

        // SHARED_LETTER 테이블에 편집된 내용과 제목 저장
        await insertSharedLetterTable(shareId, editedContent, s3Key, title);

        console.log(`Letter with shareId ${shareId} successfully saved to SHARED_LETTER table.`);
    } catch (error) {
        console.error('Error processing letter with GPT:', error);
    }
};

