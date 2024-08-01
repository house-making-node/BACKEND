export const getLetterDetailSql = `
    SELECT *
    FROM HOME_LETTER
    WHERE letter_id = ?
`;

export const insertHomeLetterSql = `
    INSERT INTO HOME_LETTER (concern_id, title, s3_key, contents, created_at)
    VALUES (?, ?, ?, ?, NOW())
`;

export const getHomeLetterByIdSql = `
    SELECT * FROM HOME_LETTER WHERE letter_id = ?
`;