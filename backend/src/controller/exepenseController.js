import Expense from "../models/Expense.js";
import mongoose from "mongoose";

export const addExpense = async (req, res) => {
  try {
    const { amount, category, customCategory, note, expenseDate } = req.body;

    if (!amount || !category || !expenseDate) {
      return res.status(400).json({
        message: "Amount and category are required",
      });
    }

    if (category === "Other" && !customCategory) {
      return res.status(400).json({
        message: "Custom category is required for Other",
      });
    }

    const expense = await Expense.create({
      amount,
      category,
      customCategory: category === "Other" ? customCategory : undefined,
      note,
      expenseDate: new Date(expenseDate),
      userId: req.userId,
    });

    res.status(201).json({
      message: "Expense added successfully",
      expense,
    });
  } catch (error) {
    console.error("Add expense error:", error);
    res.status(500).json({ message: error.message })

  }
}

// GET /expenses/monthly-summary
export const getMonthlySummary = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);

    const now = new Date();
    const data = [];

    for (let i = 5; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

      const result = await Expense.aggregate([
        {
          $match: {
            userId,
            expenseDate: { $gte: start, $lt: end },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ]);

      data.push({
        month: start.toLocaleString("default", { month: "short" }),
        total: result[0]?.total || 0,
      });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed" });
  }
};


export const getExpense = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);

    const month = parseInt(req.query.month);
    const year = parseInt(req.query.year);

    const now = new Date();
    const selectedMonth = !isNaN(month) ? month - 1 : now.getMonth();
    const selectedYear = !isNaN(year) ? year : now.getFullYear();

    const startDate = new Date(selectedYear, selectedMonth, 1);
    const endDate = new Date(selectedYear, selectedMonth + 1, 1);

    const filter = {
      userId,
      expenseDate: {
        $gte: startDate,
        $lt: endDate,
      }
    };

    console.log(`Fetching expenses for user ${req.userId} from ${startDate} to ${endDate}`);

    const expenses = await Expense.find(filter)
      .sort({ expenseDate: -1 });

    res.json({ expenses });
  } catch (error) {
    console.error("GET Expense error:", error);
    res.status(500).json({ message: error.message });
  }
};


export const deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;

    const expense = await Expense.findById(expenseId);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      })
    }

    if (expense.userId.toString() !== req.userId) {
      return res.status(403).json({
        message: "Not authorized to delete this expense",
      })
    }
    await expense.deleteOne();

    res.json({
      message: "Expense deleted successfully",

    });
  } catch (error) {
    console.error("DELETE EXPENSE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
}

export const updateExpense = async (req, res) => {
  try {
    const { amount, category, customCategory, note, expenseDate } = req.body;
    const expenseId = req.params.id;

    const expense = await Expense.findById(expenseId);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    expense.amount = amount;
    expense.category = category;
    expense.customCategory =
      category === "Other" ? customCategory : undefined;
    expense.note = note;
    expense.expenseDate = new Date(expenseDate); // ✅ THIS WAS MISSING

    await expense.save();

    res.json({
      message: "Expense updated successfully",
      expense,
    });
  } catch (error) {
    console.error("Update expense error:", error);
    res.status(500).json({ message: error.message });
  }
};


export const getExpenseSummary = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);

    // month & year
    const month = parseInt(req.query.month);
    const year = parseInt(req.query.year);

    const now = new Date();
    const selectedMonth = !isNaN(month) ? month - 1 : now.getMonth();
    const selectedYear = !isNaN(year) ? year : now.getFullYear();

    const startDate = new Date(selectedYear, selectedMonth, 1);
    const endDate = new Date(selectedYear, selectedMonth + 1, 1);

    // 🔹 Total amount
    const totalResult = await Expense.aggregate([
      {
        $match: {
          userId,
          expenseDate: { $gte: startDate, $lt: endDate },
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const total = totalResult[0]?.total || 0;

    // 🔹 Category-wise totals
    const byCategory = await Expense.aggregate([
      {
        $match: {
          userId,
          expenseDate: { $gte: startDate, $lt: endDate },
        }
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          total: 1,
        },
      },
    ]);

    res.json({
      month: selectedMonth + 1,
      year: selectedYear,
      total,
      byCategory,
    });
  } catch (error) {
    console.error("SUMMARY ERROR:", error);
    res.status(500).json({ message: "Failed to get summary" });
  }
};