export const formatDate = (date) => {
    const dateObj = new Date(date);

     // 년, 월, 일을 추출
     const year = dateObj.getUTCFullYear();
     const month = dateObj.getUTCMonth() + 1; // 월은 0부터 시작하므로 +1
     const day = dateObj.getUTCDate();

     // "YYYY년 M월 D일" 형식으로 반환
     return `${year}년 ${month}월 ${day}일`;
}

export const addLetterDataResponseDTO = (letterInfo) => {
    return {
        'user_id': letterInfo[0].user_id,
        'share_id': letterInfo[0].share_id,
        'title' : letterInfo[0].title,
        'nickname' : letterInfo[0].nickname,
        'age' : letterInfo[0].age,
        'experience_detail' : letterInfo[0].experience_detail,
        'experience_comment' : letterInfo[0].experience_comment,
        's3_key' : letterInfo[0].s3_key
    };
}

export const addScrapDataResponseDTO = (scrapInfo) => {
    return{
        'scrap_id' : scrapInfo[0].scrap_id,
        'user_id' : scrapInfo[0].user_id,
        'letter_id' : scrapInfo[0].letter_id,
        'created_at' : formatDate(scrapInfo[0].created_at)
    };
}

export const previewLettersResponseDTO = (data) => {
    const letters = [];
    const url = "https://jibkku-s3.s3.ap-northeast-2.amazonaws.com";
    

    for(let i = 0; i < data.length; i++) {
        const s3Key = data[i].s3_key;
        const s3_url = `${url}/${s3Key}`;
        letters.push({
            "letter_id": data[i].letter_id,
            "share_id": data[i].share_id,
            "title" : data[i].title,
            "s3_key" : data[i].s3_key,
            "s3_url" : s3_url,
            "created_at" : formatDate(data[i].created_at)
        })
    }

    return {"Letter": letters}
}

export const getScrapedLettersPreviewDTO = (scrapedLetters) => {
    const scrapLetters = [];
    const url = "https://jibkku-s3.s3.ap-northeast-2.amazonaws.com";
    

    for(let i = 0; i < scrapedLetters.length; i++) {

        const s3Key = scrapedLetters[i].s3_key;
        const s3_url = `${url}/${s3Key}`;

        scrapLetters.push({
            "scrap_id" : scrapedLetters[i].scrap_id,
            "user_id" : scrapedLetters[i].user_id,
            "letter_id" : scrapedLetters[i].letter_id,
            "title" : scrapedLetters[i].title,
            "s3_key" : s3Key,
            "s3_url" : s3_url
        })
    }

    return {"Scrap Letters ": scrapLetters}
}

export const getLetterByIdResponseDTO = (letter) => {

    const url = "https://jibkku-s3.s3.ap-northeast-2.amazonaws.com";
    const s3Key = letter[0].s3_key;
    const s3_url = `${url}/${s3Key}`;

    return {
        'letter_id': letter[0].letter_id,
        'share_id': letter[0].share_id,
        'title' : letter[0].title,
        's3_key' : letter[0].s3_key,
        's3_url' : s3_url,
        'content' : letter[0].content,
        "created_at" : formatDate(letter[0].created_at)
    };
}


