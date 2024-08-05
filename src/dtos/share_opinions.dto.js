export const saveOpinionResponseDTO = ( opinion ) => {
    return {
        'opinion_id': opinion.opinion_id,
        'user_id': opinion.user_id,
        'letter_id': opinion.letter_id,
    };
}
