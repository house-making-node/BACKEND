import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import multer from 'multer';
import { createUUID } from './uuid.js';
import path from 'path';
import dotenv from 'dotenv';
import { BaseError } from '../../config/error.js';
import { status } from '../../config/response.status.js';

dotenv.config();    // .env 파일 사용

const s3 = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    },
});

// 확장자 검사 목록
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp', '.gif'];

const storage = multer.memoryStorage(); // 메모리 스토리지 사용

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 이미지 용량 제한 (5MB)
    fileFilter: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        if (!allowedExtensions.includes(extension)) {
            return cb(new BaseError(status.WRONG_EXTENSION));
        }
        cb(null, true);
    }
});

const uploadToS3 = async (file, directory) => {
    const extension = path.extname(file.originalname);
    const uuid = createUUID();
    const key = `${directory}/${uuid}_${file.originalname}`;

    const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        // ACL: 'public-read-write',
    };

    try {
        const upload = new Upload({
            client: s3,
            params: uploadParams,
        });
        await upload.done();
        return key;
    } catch (err) {
        console.error('Error uploading file to S3:', err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error uploading file to S3');
    }
};

export { upload, uploadToS3 };
