import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { houseSizeAdd, moodAdd, roomNumberAdd, concernAdd, statusUpdate, roomImageAdd } from '../controllers/consult.controller.js';
import { imageUploader } from '../middleware/image.uploader.js';

export const consultRouter = express.Router();
consultRouter.post('/requirements/house_size', expressAsyncHandler(houseSizeAdd));
consultRouter.patch('/requirements/room_num', expressAsyncHandler(roomNumberAdd));
consultRouter.patch('/requirements/mood', expressAsyncHandler(moodAdd));
consultRouter.patch('/requirements/concern', expressAsyncHandler(concernAdd));
consultRouter.patch('/status', expressAsyncHandler(statusUpdate));
consultRouter.post('/requirements/room_image', imageUploader.single('image'),expressAsyncHandler(roomImageAdd));

