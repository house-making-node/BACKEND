export const insertSharedLetterSql = `
    INSERT INTO SHARE (user_id, nickname, age, experience_detail, experience_comment, s3_key, title)
    VALUES (?, ?, ?, ?, ?, ?, ?)
`;


export const getSharedLetterSql = `
    SELECT share_id, user_id, nickname, age, experience_detail, experience_comment, s3_key, title
    FROM SHARE
    WHERE share_id = ?
`;

export const insertSharedLetterContentSql = `
    INSERT INTO SHARED_LETTER (share_id, content, s3_key, title)
    VALUES (?, ?, ?, ?)
`;

export const selectLettersPreviewSql = `
    SELECT letter_id, share_id, title, s3_key, content, created_at
    FROM SHARED_LETTER
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
`;