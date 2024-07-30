// home_scrapes.dto.js

export const addScrapInfoResponseDTO = (scrapInfo) => {
    return {
        'user_id': scrapInfo[0].user_id,
        'letter_id' : scrapInfo[0].letter_id
    };
}