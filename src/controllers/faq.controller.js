// controllers/faq.controller.js

import Faq from "../models/faq.model.js";

// 사용자의 질문 목록을 가져오는 기능
export const inquiry = async (req, res) => {
  try {
    const questions = await Faq.getAllQuestions();
    res.status(200).json({
      success: true,
      data: questions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "질문 불러오기를 실패했습니다.",
    });
  }
};

// 특정 질문에 대한 답변을 가져오는 기능
export const inquiryResponse = async (req, res) => {
  const { id } = req.query;

  try {
    const response = await Faq.getResponseById(id);

    if (response) {
      res.status(200).json({
        success: true,
        response,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Response not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "답변 불러오기를 실패했습니다.",
    });
  }
};
