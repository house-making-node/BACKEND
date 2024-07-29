import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { houseSizeAdd, moodAdd, roomNumberAdd } from '../controllers/consult.controller.js';

export const consultRouter = express.Router();
consultRouter.post('/requirements/house_size', expressAsyncHandler(houseSizeAdd));
consultRouter.patch('/requirements/room_num', expressAsyncHandler(roomNumberAdd));
consultRouter.patch('/requirements/mood', expressAsyncHandler(moodAdd));