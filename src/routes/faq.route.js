//faq.route.js

import express from "express";
import { inquiry, inquiryResponse } from "../controllers/faq.controller.js";

export const faqRouter = express.Router();

faqRouter.get("/inquiry", inquiry);
faqRouter.get("/response", inquiryResponse);
