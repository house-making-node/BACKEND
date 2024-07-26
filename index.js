import express from 'express'          // ES6
import dotenv from 'dotenv';
import { specs } from "./config/swagger.config.js";
import SwaggerUi from "swagger-ui-express";
import { BaseError } from './config/error.js';
import { status } from './config/response.status.js';
import cors from 'cors';
import { consultRouter } from './src/routes/consult.route.js';

dotenv.config();

const app = express()
app.set('port', process.env.PORT || 3000)   // 서버 포트 지정
app.use(cors());
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함
app.use(express.urlencoded({extended: false}));

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(specs));

//컨설팅
app.use('/consulting',consultRouter);

// error handling
app.use((req, res, next) => {
    const err = new BaseError(status.NOT_FOUND);
    next(err);
});

app.listen(app.get('port'), () => {
    console.log(`Example app listening on port ${app.get('port')}`);
});
