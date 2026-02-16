import express from "express";
import authRoutes from "./routes/authRoute.js"; // ✅ matches file name
import expenseRoutes from './routes/expenseRoute.js'
import friendRoutes from "./routes/friendsRoute.js";
import splitRoutes from "./routes/splitRoutes.js";

const app = express();

// body parser — MUST be before routes
app.use(express.json());

// mount routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes)
app.use("/api/friends", friendRoutes)
app.use("/api/splits", splitRoutes)

export default app;
