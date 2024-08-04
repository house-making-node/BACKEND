export const insertConcernSql = `
    INSERT INTO CONCERN (user_id, age, nickname, concern_detail, concern_comment, s3_key, title)
    VALUES (?, ?, ?, ?, ?, ?, ?)
`;


export const getConcernSql = `
    SELECT *
    FROM CONCERN
    WHERE concern_id = ?
`;