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

export const getHomeLettersSql = `
    SELECT letter_id, title, s3_key, DATE_FORMAT(created_at, '%Y.%m.%d') AS created_at
    FROM HOME_LETTER
    ORDER BY created_at DESC
    LIMIT ?, ?
`;