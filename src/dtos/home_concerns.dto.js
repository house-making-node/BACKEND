export const addConcernDataResponseDTO = (concernInfo) => {
    return {
        'concern_id': concernInfo[0].concern_id,
        'user_id': concernInfo[0].user_id,
        'nickname' : concernInfo[0].nickname,
        'age' : concernInfo[0].age,
        'concern_detail' : concernInfo[0].concern_detail,
        'concern_comment' : concernInfo[0].concern_comment,
        's3_key' : concernInfo[0].s3_key,
        'title' : concernInfo[0].title,
    };
}