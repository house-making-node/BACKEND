import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { houseSizeAdd, moodAdd, roomNumberAdd, concernAdd, statusUpdate, roomImageAdd, consultRequestGet, blueprintAdd, roomImageGet, blueprintGet } from '../controllers/consult.controller.js';
import { imageUploader } from '../middleware/image.uploader.js';

export const consultRouter = express.Router();
consultRouter.post('/requirements/house_size', expressAsyncHandler(houseSizeAdd));
consultRouter.patch('/requirements/room_num', expressAsyncHandler(roomNumberAdd));
consultRouter.patch('/requirements/mood', expressAsyncHandler(moodAdd));
consultRouter.patch('/requirements/concern', expressAsyncHandler(concernAdd));
consultRouter.patch('/status', expressAsyncHandler(statusUpdate));
consultRouter.get('/:consulting_id', expressAsyncHandler(consultRequestGet));
consultRouter.post('/requirements/room_image', imageUploader.single('image'),expressAsyncHandler(roomImageAdd));
consultRouter.post('/requirements/blueprint',imageUploader.single('image'),expressAsyncHandler(blueprintAdd));
consultRouter.get('/room_image/:consulting_id',expressAsyncHandler(roomImageGet));
consultRouter.get('/blueprint/:consulting_id',expressAsyncHandler(blueprintGet));

