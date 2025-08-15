import express from "express";
import { addExpense, getExpenses, updateExpense, deleteExpense } from "../controllers/expenseController.js";
import {filterExpenses} from '../controllers/expenseController.js'
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.use(auth);

router.post("/", addExpense);
router.get("/", getExpenses);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);
router.get('/filter', filterExpenses);

export default router;
