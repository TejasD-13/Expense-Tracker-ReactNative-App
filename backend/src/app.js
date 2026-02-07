import express from "express";
import authRoutes from "./routes/authRoute.js"; // ✅ matches file name
import expenseRoutes from './routes/expenseRoute.js'

const app = express();

// body parser — MUST be before routes
app.use(express.json());

// mount routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes)

export default app;
