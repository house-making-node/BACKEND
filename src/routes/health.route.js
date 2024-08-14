// health.route.js

import express from "express";
import { healthController } from "../controllers/health.controller";

export const healthRouter = express.Router();

healthRouter.get("", healthController);
