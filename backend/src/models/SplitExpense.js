import mongoose from "mongoose";

const splitExpenseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    participants: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            share: {
                type: Number,
                required: true,
            },
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true })

const SplitExpense = mongoose.model("SplitExpense", splitExpenseSchema);

export default SplitExpense;