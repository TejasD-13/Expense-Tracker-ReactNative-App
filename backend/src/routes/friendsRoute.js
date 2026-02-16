import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

const router = express.Router();

// send friend request
router.post("/request", authMiddleware, async (req, res) => {
    try {
        const { email } = req.body;

        const receiver = await User.findOne({ email });

        if (!receiver) {
            return res.status(404).json({ message: "User not found" });
        }

        if (receiver._id.toString() === req.userId) {
            return res.status(400).json({ message: "You cannot send a friend request to yourself" });
        }

        const existing = await FriendRequest.findOne({
            from: req.userId,
            to: receiver._id,
        });

        if (existing) {
            return res.status(400).json({ message: "Friend request already sent" });
        }

        const request = await FriendRequest.create({
            from: req.userId,
            to: receiver._id,
        })

        res.json({ message: "Friend request sent", request });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})


// accept friend request
router.post("/accept/:id", authMiddleware, async (req, res) => {
    try {
        const request = await FriendRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ message: "Friend request not found" });
        }

        if (request.to.toString() !== req.userId) {
            return res.status(403).json({ message: "You are not authorized to accept this friend request" });
        }

        request.status = "accepted";
        await request.save();

        // add each other as friend
        await User.findByIdAndUpdate(request.from, {
            $addToSet: { friends: request.to },
        });

        await User.findByIdAndUpdate(request.to, {
            $addToSet: { friends: request.from },
        });

        res.json({ message: "Friend request accepted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})

// get pending friend requests
router.get("/requests", authMiddleware, async (req, res) => {
    try {
        const requests = await FriendRequest.find({
            to: req.userId,
            status: "pending",
        }).populate("from", "name email");
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// get friend list
router.get("/", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate(
            "friends",
            "name email"
        );
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user.friends);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})

export default router;
