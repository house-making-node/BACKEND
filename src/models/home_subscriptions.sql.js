export const insertSubInfoSql = `
    INSERT INTO HOME_LETTER_SUB_INFO (user_id, email, name, status)
    VALUES (?, ?, ?, 'Y')
`;


export const getSubInfoSql = `
    SELECT user_id, email, name
    FROM HOME_LETTER_SUB_INFO
    WHERE id = ?
`;