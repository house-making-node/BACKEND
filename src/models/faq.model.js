// models/faq.model.js

import { pool } from "../../config/db.connect.js";

const Faq = {};

// 모든 질문 목록을 가져오는 함수
Faq.getAllQuestions = async () => {
  const query = "SELECT inquiry_id AS id, title AS question FROM INQUIRY";
  try {
    const [rows] = await pool.query(query);
    return rows;
  } catch (err) {
    console.error("Error fetching questions: ", err);
    throw err;
  }
};

// 특정 질문에 대한 답변을 가져오는 함수
Faq.getResponseById = async (id) => {
  const query = "SELECT content FROM INQUIRY_RESPONSE WHERE inquiry_id = ?";
  try {
    const [rows] = await pool.query(query, [id]);
    return rows[0]?.content || null;
  } catch (err) {
    console.error("Error fetching response: ", err);
    throw err;
  }
};

export default Faq;
