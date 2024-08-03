import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import dotenv from 'dotenv';

import { createUUID } from './uuid.js';
import { BaseError } from '../../config/error.js';
import { status } from '../../config/response.status.js';

dotenv.config();    // .env 파일 사용

const s3 = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
    }
});

// 확장자 검사 목록
const allowedExtensions =  ['.png', '.jpg', '.jpeg', '.bmp', '.gif'];

// S3에서 디렉토리 존재 여부 확인 함수
const checkDirectoryExists = async (directory) => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Prefix: directory + '/',
            MaxKeys: 1
        });

        const response = await s3.send(command);
        return response.Contents.length > 0;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const imageUploader = multer({
    storage: multerS3({
        s3: s3,   // S3 객체
        bucket: process.env.AWS_S3_BUCKET_NAME,   // Bucket 이름
        contentType: multerS3.AUTO_CONTENT_TYPE,  // Content-type, 자동으로 찾도록 설정
        key: async(req, file, callback) => {           // 파일명
            const uploadDirectory = req.body.directory ?? '';  // 디렉토리 path 설정을 위해서
            const extension = path.extname(file.originalname);  // 파일 이름 얻어오기
            const uuid = createUUID();                          // UUID 생성
            // extension 확인을 위한 코드 (확장자 검사용)
            if(!allowedExtensions.includes(extension)){
                return callback(new BaseError(status.WRONG_EXTENSION));
            }

            // 디렉토리 존재 여부 확인
            const directoryExists = await checkDirectoryExists(uploadDirectory);
            if (!directoryExists) {
                return callback(new BaseError(status.DIRECTORY_NOT_FOUND));
            }

            callback(null, `${uploadDirectory}/${uuid}_${file.originalname}`);
        },
        // acl: 'public-read-write'  // 파일 액세스 권한
    }),
    // 이미지 용량 제한 (5MB)
    limits: { fileSize: 5 * 1024 * 1024 },
});