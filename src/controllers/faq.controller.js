// faq.controller.js

//사용자의 질문 목록을 가져오는 기능
export const inquiry = (req, res) => {
  const questions = [
    { id: 1, question: "인테리어 컨설팅은 어떤 서비스를 제공하나요?" },
    {
      id: 2,
      question:
        "컨설팅 신청 중간에 페이지를 나가버렸어요. 어느 단계까지 진행 했는지 알 수 있을까요?",
    },
  ];

  res.status(200).json({
    success: true,
    data: questions,
  });
};

//특정 질문에 대한 답변을 가져오는 기능
export const inquiryResponse = (req, res) => {
  const { id } = req.query;

  const responses = {
    1: "집꾸의 인테리어 컨설팅은 공간 분석, 디자인 제안, 가구 및 소품 추천 등의 종합적인 인테리어 솔루션을 제공합니다.",
    2: "마이페이지 - 내 프로젝트에서 현재 진행 단계를 확인할 수 있습니다.",
  };

  const response = responses[id];

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
};
