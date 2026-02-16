import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import SplitExpense from "../models/SplitExpense.js";
import User from "../models/User.js";

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { description, amount, participantIds } = req.body;

        if (!participantIds || participantIds.length === 0) {
            return res.status(400).json({ message: "Participants are required" });
        }

        // Total people = selected friends + the person who paid
        const totalPeople = participantIds.length + 1;
        const share = amount / totalPeople;

        // Create the participants array for the database
        const participants = [
            { user: req.userId, share },
            ...participantIds.map((id) => ({
                user: id,
                share
            })),
        ];

        const splitExpense = await SplitExpense.create({
            description,
            amount,
            participants,
            paidBy: req.userId,
        });

        res.json(splitExpense);
    } catch (error) {
        console.error("SPLIT ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
})

router.get("/", authMiddleware, async (req, res) => {
    try {
        const splits = await SplitExpense.find({
            "participants.user": req.userId,
        })
            .populate("paidBy", "name email")
            .populate("participants.user", "name email");

        res.json(splits);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;