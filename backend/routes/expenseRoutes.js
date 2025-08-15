import express from "express";
import { addExpense, getExpenses, updateExpense, deleteExpense } from "../controllers/expenseController.js";
import {filterExpenses} from '../controllers/expenseController.js'
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.use(verifyToken);

router.get('/', verifyToken, getExpenses);
router.post('/', verifyToken, addExpense);
router.patch('/:id', verifyToken, updateExpense);
router.delete('/:id', verifyToken, deleteExpense);
router.put("/:id", verifyToken, updateExpense);

router.get('/filter', verifyToken, filterExpenses);

export default router;
