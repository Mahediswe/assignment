import React, { useEffect, useState } from "react";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";
import EditExpenseModal from "./EditExpenseModal";
import { getExpenses, deleteExpense, updateExpense } from "../api/expenseApi";

function Home() {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleOpenEdit = (expense) => {
    setEditing(expense);
    setIsModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsModalOpen(false);
    setEditing(null);
  };

  const handleSubmitEdit = async (payload) => {
    if (!editing?._id) return;
    const updated = await updateExpense(editing._id, payload); // API call
    setExpenses(prev => prev.map(e => (e._id === updated._id ? updated : e)));
    handleCloseEdit();
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Personal Expense Tracker</h1>

      <AddExpenseForm onAdd={handleAdd} />

      <ExpenseList
        expenses={expenses}
        onDelete={handleDelete}
        onEdit={handleOpenEdit}
      />

      <EditExpenseModal
        open={isModalOpen}
        onClose={handleCloseEdit}
        expense={editing}
        onSubmit={handleSubmitEdit}
      />
    </div>
  );
}

export default Home;
