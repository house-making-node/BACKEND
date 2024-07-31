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