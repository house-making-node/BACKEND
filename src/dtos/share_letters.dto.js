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

export const previewLettersResponseDTO = (data) => {
    const letters = [];

    for(let i = 0; i < data.length; i++) {
        letters.push({
            "letter_id": data[i].letter_id,
            "share_id": data[i].share_id,
            "title" : data[i].title,
            "s3_key" : data[i].s3_key,
            "content" : data[i].content,
            "create_data" : formatDate(data[i].created_at)
        })
    }

    return {"Letter": letters}
}

const formatDate = (date) => {
    return new Intl.DateTimeFormat('kr').format(new Date(date)).replaceAll(" ", "").slice(0, -1);
}