import axios from 'axios';
//사용할 gpt api 토큰 첨부
const API_KEY = process.env.OPENAI_API_KEY;

export const getRefinedContent = async (prompt) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4", // GPT-4 모델을 사용합니다.
                messages: [{ role: "user", content: "항상 글의 시작은 '안녕하세요, 자취레터 구독자 여러분 ! 오늘도 찾아와 주셔서 감사합니다. 이번 주 레터의 주제는 바로 (고민제목) 입니다. (고민내용) 어떻게 하는게 좋을까요?' 로 시작해줘. 그리고 중간에 내용은 고민내용을 이야기처럼 풀어주고 항상 글의 마지막은 '여러분의 자취 생활에 작은 행복이 가득하길 바라며, 자취레터드림.'으로 마무리해줘" }],
                max_tokens: 150
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
