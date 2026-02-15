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
            enum: [
                "Food",
                "Travel",
                "Shopping",
                "Bills",
                "School",
                "Electronics",
                "Grocery",
                "Tools",
                "Entertainment",
                "Health",
                "Other",
            ]
        },
        customCategory: {
            type: String,
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
        },
        expenseDate: {
            type: Date,
            required: true,
        },
    },
     {
    timestamps: true,
  }
)

export default mongoose.model("Expense", expenseSchema)