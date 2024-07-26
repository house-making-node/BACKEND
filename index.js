// const express = require('express')   // common JS
import express from "express"; // ES6
import dotenv from "dotenv";
import { tempRouter } from "./src/routes/temp.route.js";
import { kakaoRouter } from "./src/routes/kakao.route.js";

dotenv.config();

const app = express();
const port = 3000;

app.get("/", function (req, res) {
  res.send("Hello World");
});

// router setting
app.use("/temp", tempRouter);
app.use("/auth", kakaoRouter); //카카오 로그인

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
