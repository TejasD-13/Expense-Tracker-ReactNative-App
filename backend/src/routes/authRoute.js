import express from "express";
import { registerUser, loginUser } from "../controller/authController.js"; // ✅ matches folder
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);


router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route works",
    userId: req.userId,
  });
});

export default router;
