import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { houseSizeAdd } from '../controllers/consult.controller.js';

export const consultRouter = express.Router();
consultRouter.post('/requirements/house_size', expressAsyncHandler(houseSizeAdd));