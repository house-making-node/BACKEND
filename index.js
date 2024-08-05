import express from "express"; // ES6
import dotenv from "dotenv";

import { specs } from "./config/swagger.config.js";
import SwaggerUi from "swagger-ui-express";
import { response } from "./config/response.js";
import { BaseError } from "./config/error.js";
import { status } from "./config/response.status.js";
// import fs from 'fs'; // 파일 시스템 모듈 추가
// import yaml from 'js-yaml'; // YAML 파일을 파싱하기 위한 모듈 추가
import cors from "cors";

import { homelettersRouter } from "./src/routes/home_letters.route.js";
import { sharelettersRouter } from "./src/routes/share_letters.route.js";
import { consultRouter } from "./src/routes/consult.route.js";
import { userRouter } from "./src/routes/user.router.js";

dotenv.config();

const app = express();

// server setting - veiw, static, body-parser etc..
app.set("port", process.env.PORT); // 서버 포트 지정
app.use(cors());
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send("Hello World");
});

// swagger
app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(specs));

// router setting
app.use("/share_letters", sharelettersRouter);
app.use("/home_letters", homelettersRouter);

//컨설팅
app.use("/consulting", consultRouter);

app.use("/user", userRouter); //마이페이지

// error handling
app.use((req, res, next) => {
  const err = new BaseError(status.NOT_FOUND);
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.data?.status || 500;
  const message = err.data?.message || "Internal Server Error";
  console.log(status);
  console.log(message);
  // 템플릿 엔진 변수 설정
  res.locals.message = message;
  // 개발환경이면 에러를 출력하고 아니면 출력하지 않기
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(status).send(response({ status, message }));
});

app.listen(app.get("port"), () => {
  console.log(`Example app listening on port ${app.get("port")}`);
});
