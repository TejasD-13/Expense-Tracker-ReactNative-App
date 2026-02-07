import express from 'express';
import { addExpense, deleteExpense, getExpense, updateExpense } from '../controller/exepenseController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/", authMiddleware, addExpense);
router.get("/", authMiddleware, getExpense);
router.delete("/:id",authMiddleware, deleteExpense)
router.put("/:id", authMiddleware, updateExpense)

export default router;