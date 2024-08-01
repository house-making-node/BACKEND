export const insertOpinionSql = `
    INSERT INTO SHARE_OPINION (letter_id, user_id)
    VALUES (?, ?)
`;

export const insertOpinionInfoSql = `
    INSERT INTO SHARE_OPINION_INFO (
        opinion_id,
        is_satisfy,
        satisfy_detail_1,
        satisfy_detail_2,
        satisfy_detail_3,
        unsatisfy_detail_1,
        unsatisfy_detail_2,
        unsatisfy_detail_3,
        opinion_good,
        opinion_bad,
        comment
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;