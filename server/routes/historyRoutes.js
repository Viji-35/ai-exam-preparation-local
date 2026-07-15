import express from "express";
import {
  saveTestHistory,
  getTestHistory,
} from "../controllers/historyController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Save Test Result
router.post("/", authMiddleware, saveTestHistory);

// Get User Test History
router.get("/", authMiddleware, getTestHistory);

export default router;