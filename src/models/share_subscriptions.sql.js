export const insertSubInfoSql = `
    INSERT INTO SHARED_LETTER_SUB_INFO (user_id, email, name, status)
    VALUES (?, ?, ?, 'Y')
`;


export const getSubInfoSql = `
    SELECT user_id, email, name
    FROM SHARED_LETTER_SUB_INFO
    WHERE id = ?
`;
