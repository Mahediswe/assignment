import React, { useEffect, useState } from "react";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";
import { getExpenses, deleteExpense } from "../api/expenseApi";

function Home () {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const response = await getExpenses();
    setExpenses(response.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAdd = (expense) => setExpenses([expense, ...expenses]);

  const handleDelete = async (id) => {
    await deleteExpense(id);
    setExpenses(expenses.filter(exp => exp._id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Personal Expense Tracker</h1>
      <AddExpenseForm onAdd={handleAdd} />
      <ExpenseList expenses={expenses} onDelete={handleDelete} />
    </div>
  );
}

export default Home;
