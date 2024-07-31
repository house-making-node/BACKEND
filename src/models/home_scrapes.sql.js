// home_scrapes.sql.js 파일

export const insertScrapInfoSql = `
    INSERT INTO HOME_SCRAP (user_id, letter_id, created_at)
    VALUES (?, ?, NOW())
`;

export const getScrapInfoSql = `
    SELECT *
    FROM HOME_SCRAP
    WHERE scrap_id = ?
`;