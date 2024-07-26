import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// .env 파일 로딩
dotenv.config();

// 데이터베이스 연결 풀 생성
export const pool = mysql.createPool({
    host: process.env.DB_HOST,       // .env 파일에서 호스트명 로드
    user: process.env.DB_USER,       // .env 파일에서 사용자 이름 로드
    port: process.env.DB_PORT,       // .env 파일에서 포트 번호 로드
    database: process.env.DB_NAME,   // .env 파일에서 데이터베이스 이름 로드
    password: process.env.DB_PASSWORD, // .env 파일에서 비밀번호 로드
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
