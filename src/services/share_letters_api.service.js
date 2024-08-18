import OpenAI from "openai";
import { insertSharedLetterTable } from '../models/share_letters.dao.js';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // API 키
  });


export const processAndSaveLetter = async (shareId, title, experienceDetail, s3Key) => {
    
    try {

        const prompt = `글의 시작은 (안녕하세요, 공유레터 독자 여러분.)으로 시작해주세요.
                        서론에서는 독자에게 ${title}에 관한 내용을 소개하고, 관심을 끌 수 있는 방법으로 시작하세요. 주제의 중요성을 강조하고, 독자가 이 내용을 읽어야 하는 이유를 설명합니다.
                        본론에서는 제공된 경험 ${experienceDetail}의 세부사항을 바탕으로 주제를 자세히 설명하세요. experienceDetail을 기반으로 핵심적인 내용과 개인적인 경험을 포함시키세요.
                        만약 사용자가 물품이나 팁들을 여러개 소개하면 보기 편하게 리스트로 만들어 하나씩 설명하세요.
                        결론에서는 본론의 핵심 요약을 제공하고, 독자에게 도움이 될 만한 제안을 추가합니다. 주제에 대한 마지막 생각이나 행동 권장 사항을 포함시키세요.
                        끝맺음말에서는 긍정적인 마무리를 지어주고, 독자가 실천할 수 있는 마지막 조언이나 격려의 말을 전합니다.
                        위의 지침을 바탕으로 서론, 본론, 결론, 끝맺음말을 포함한 완성된 글을 작성해 주세요.
                        `;

        // GPT API 호출하여 내용 요약 및 제목 생성
        const response = await openai.chat.completions.create({
            model: "gpt-4", // 사용할 모델 지정 
            messages: [{
                role: "user",
                content: prompt
            }],
            max_tokens: 1500 // 최대 토큰 수 설정
        });

        const editedContent = response.choices[0].message.content;

        // SHARED_LETTER 테이블에 편집된 내용과 제목 저장
        await insertSharedLetterTable(shareId, editedContent, s3Key, title);

        console.log(`Letter with shareId ${shareId} successfully saved to SHARED_LETTER table.`);
    } catch (error) {
        console.error('Error processing letter with GPT:', error);
    }
};

