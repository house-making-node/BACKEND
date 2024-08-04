export const homeLetterResponseDTO = (homeLetter) => {
    return {
        'letter_id': homeLetter[0].letter_id,
        'concern_id': homeLetter[0].concern_id,
        'title': homeLetter[0].title,
        's3_key': homeLetter[0].s3_key,
        'contents': homeLetter[0].contents,
        'created_at': homeLetter[0].created_at
    };
};
