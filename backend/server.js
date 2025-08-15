import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import { verifyToken } from './middlewares/auth.js';
import authRoutes from './routes/authRoutes.js'
import { addExpense } from "./controllers/expenseController.js";
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/expenses", expenseRoutes);
app.post("/api/expenses", verifyToken, addExpense);

app.get("/", (req, res) => {
  res.send("Expense Tracker API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
