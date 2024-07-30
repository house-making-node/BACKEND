export const insertScrapInfoSql = `
    INSERT INTO HOME_SCRAP (user_id, letter_id)
    VALUES (?, ?)
`;


export const getScrapInfoSql = `
    SELECT *
    FROM HOME_SCRAP
    WHERE id = ?
`;