export const homeLetterResponseDTO = (homeLetter) => {
    return {
        letter_id: homeLetter.letter_id,
        concern_id: homeLetter.concern_id,
        title: homeLetter.title,
        s3_key: homeLetter.s3_key,
        contents: homeLetter.contents,
        created_at: homeLetter.created_at
    };
};
