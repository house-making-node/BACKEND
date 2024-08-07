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

    for(let i = 0; i < data.length; i++) {
        letters.push({
            "letter_id": data[i].letter_id,
            "share_id": data[i].share_id,
            "title" : data[i].title,
            "s3_key" : data[i].s3_key,
            "created_at" : formatDate(data[i].created_at)
        })
    }

    return {"Letter": letters}
}

export const getScrapedLettersPreviewDTO = (scrapedLetters) => {
    const scrapLetters = [];

    for(let i = 0; i < scrapedLetters.length; i++) {
        scrapLetters.push({
            "scrap_id" : scrapedLetters[i].scrap_id,
            "user_id" : scrapedLetters[i].user_id,
            "letter_id" : scrapedLetters[i].letter_id,
            "title" : scrapedLetters[i].title,
            "s3_key" : scrapedLetters[i].s3_key
        })
    }

    return {"Scrap Letters ": scrapLetters}
}

export const getLetterByIdResponseDTO = (letter) => {
    return {
        'letter_id': letter[0].letter_id,
        'share_id': letter[0].share_id,
        'title' : letter[0].title,
        's3_key' : letter[0].s3_key,
        'content' : letter[0].content,
        "created_at" : formatDate(letter[0].created_at)
    };
}

const formatDate = (date) => {
    return new Intl.DateTimeFormat('kr').format(new Date(date)).replaceAll(" ", "").slice(0, -1);
}
