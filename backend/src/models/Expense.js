import mongoose, { Mongoose } from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        note: {
            type: String,
            trim: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        userId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
     {
    timestamps: true,
  }
)

export default mongoose.model("Expense", expenseSchema)