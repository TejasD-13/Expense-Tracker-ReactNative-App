import Expense from "../models/Expense.js";

export const addExpense = async (req, res) => {
    try {
        const { amount, category, note, date } = req.body;

        if (!amount || !category) {
            return res.status(400).json({
                message: "Amount and category are required",
            });
        }

        const expense = await Expense.create({
            amount,
            category,
            note,
            date,
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

export const getExpense = async (req, res) => {
    try {
        const expenses = await Expense.find({
            userId: req.userId,
        }).sort({ date: -1 });

        res.json({
            message: "Expense fetched successfully",
            count: expenses.length,
            expenses
        });
    } catch (error) {
        console.error("GET Expense error:", error);
        res.status(500).json({ message: error.message });

    }
}

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
        const expenseId = req.params.id;
        const {amount, category, note} = req.body;

        const expense = await Expense.findById(expenseId);

        if(!expense){
            return res.status(404).json({
                message: "Expense not found",
            });
        }

        if(expense.userId.toString() !== req.userId){
            return res.status(403).json({
                message: "No authorized to update this expense",
            });
        }

            if(amount !== undefined) expense.amount = amount;
            if(category !== undefined) expense.category = category;
            if(note !== undefined) expense.note = note;

            const updateExpense = await expense.save();

            res.json({
                message: "Expense updated successfully",
                expense: updateExpense,
            })
    } catch (error) {
        console.error("UPDATE EXPENSE ERROR:", error);
        res.status(500).json({ message: error.message });
    }
}