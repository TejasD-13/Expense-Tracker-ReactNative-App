import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import SplitExpense from "../models/SplitExpense.js";
import User from "../models/User.js";
import Settlement from "../models/Settlement.js";

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
            $or: [
                { paidBy: req.userId },
                { "participants.user": req.userId }
            ]
        })
            .sort({ createdAt: -1 })
            .populate("paidBy", "name email")
            .populate("participants.user", "name email");

        res.json(splits);
    } catch (err) {
        console.error("FETCH SPLITS ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const splits = await SplitExpense.find({
      $or: [
        { paidBy: req.userId },
        { "participants.user": req.userId }
      ]
    }).populate("paidBy participants.user", "name email");

    const settlements = await Settlement.find({
      $or: [
        { from: req.userId },
        { to: req.userId }
      ]
    });

    const balanceMap = {};

    // 🔥 Step 1: Calculate balances from splits
    splits.forEach((split) => {
    const paidBy = split.paidBy._id.toString();

    split.participants.forEach((participant) => {
        const participantId = participant.user._id.toString();
        const share = participant.share;

        if (participantId === req.userId) {
        // If someone else paid, you owe them
        if (paidBy !== req.userId) {
            if (!balanceMap[paidBy]) {
            balanceMap[paidBy] = {
                user: split.paidBy,
                amount: 0,
            };
            }
            balanceMap[paidBy].amount -= share;
        }
        } else {
        // If you paid, they owe you
        if (paidBy === req.userId) {
            if (!balanceMap[participantId]) {
            balanceMap[participantId] = {
                user: participant.user,
                amount: 0,
            };
            }
            balanceMap[participantId].amount += share;
        }
        }
    });
    });


    // 🔥 Step 2: Adjust balances using settlements
    settlements.forEach((settlement) => {
      const from = settlement.from.toString();
      const to = settlement.to.toString();
      const amount = settlement.amount;

      if (from === req.userId) {
        // You paid someone
        if (balanceMap[to]) {
          balanceMap[to].amount += amount;
        }
      }

      if (to === req.userId) {
        // Someone paid you
        if (balanceMap[from]) {
          balanceMap[from].amount -= amount;
        }
      }
    });

    res.json(Object.values(balanceMap));
  } catch (error) {
    console.error("BALANCE ERROR:", error);
    res.status(500).json({ message: "Server error." });
  }
});


router.post("/settle", authMiddleware, async (req, res) => {
    try {
        const {friendId, amount} = req.body;

        const settlement = await Settlement.create({
            from: req.userId,
            to: friendId,
            amount
        })

        res.json(settlement);
    } catch (error) {
        res.status(500).json({ message: "Settlement failed." });
    }
})

export default router;