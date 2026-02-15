import express from "express";
import {
  addExpense,
  getExpense,
  deleteExpense,
  updateExpense,
  getExpenseSummary,
  getMonthlySummary,
} from "../controller/exepenseController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addExpense);
router.get("/", authMiddleware, getExpense);
router.put("/:id", authMiddleware, updateExpense);
router.delete("/:id", authMiddleware, deleteExpense);

router.get("/summary", authMiddleware, getExpenseSummary);
router.get("/monthly-summary", authMiddleware, getMonthlySummary); // ✅ HERE

export default router;
