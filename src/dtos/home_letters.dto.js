export const homeLetterResponseDTO = (homeLetter) => {
    const letters = [];
    const url = "https://jibkku-s3.s3.ap-northeast-2.amazonaws.com";
    

    for(let i = 0; i < data.length; i++) {
        const s3Key = data[i].s3_key;
        const s3_url = `${url}/${s3Key}`;
        letters.push({
            "letter_id": data[i].letter_id,
            "concern_id": data[i].concern_id,
            "title" : data[i].title,
            "s3_key" : data[i].s3_key,
            "s3_url" : s3_url,
            "created_at" : formatDate(data[i].created_at)
        })
    }

    return {"Letter": letters}
}