import axios from 'axios';
// Use the GPT API token from environment variables
const API_KEY = process.env.OPENAI_API_KEY;

export const getRefinedContent = async (title, concern_detail) => {
    try {
        const prompt = `
            글의 시작은 (안녕하세요, 자취레터 독자 여러분.)으로 시작해주세요.
            서론에서는 독자에게 ${title}에 관한 내용을 소개하고, 관심을 끌 수 있는 방법으로 시작하세요. 주제의 중요성을 강조하고, 독자가 이 내용을 읽어야 하는 이유를 설명합니다.
            본론에서는 제공된 고민내용 ${concern_detail}의 세부사항을 바탕으로 주제를 자세히 설명하세요. concern_detail을 기반으로 핵심적인 내용과 개인적인 고민 내용을 포함시키세요.
            만약 사용자에게 도움이 될 만한 고민 해결방법이 있다면 보기 편하게 리스트로 만들어 하나씩 설명하세요.
            결론에서는 본론의 핵심 요약을 제공하고, 독자에게 도움이 될 만한 제안을 추가합니다. 주제에 대한 마지막 생각이나 행동 권장 사항을 포함시키세요.
            끝맺음말에서는 긍정적인 마무리를 지어주고, 독자가 실천할 수 있는 마지막 조언이나 격려의 말을 전합니다.
            위의 지침을 바탕으로 서론, 본론, 결론, 끝맺음말을 포함한 완성된 글을 작성해 주세요. 글 안에 undefined라는 단어는 절대 들어가지 않게 해주세요.
        `;

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4", // Use GPT-4 model
                messages: [{ role: "user", content: prompt }]
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.choices[0].message.content.trim();
    } catch (err) {
        console.log("gpt.service.js getRefinedContent [err] : ", err);
        throw new Error('Failed to get response from GPT API');
    }
};