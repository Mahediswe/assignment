import React, { useEffect, useState } from "react";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";
import EditExpenseModal from "./EditExpenseModal";
import {
  getExpenses,
  deleteExpense,
  updateExpense,
  getFilteredExpenses,
} from "../api/expenseApi";

function Home() {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = async () => {
    const data = await getFilteredExpenses(category, startDate, endDate);
    setExpenses(data.data);
  };

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
    setExpenses(expenses.filter((exp) => exp._id !== id));
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
    setExpenses((prev) =>
      prev.map((e) => (e._id === updated._id ? updated : e))
    );
    handleCloseEdit();
  };

  return (
   <div>
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
    <div className="max-w-3xl mx-auto p-4 text-center">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button onClick={handleFilter}>Filter</button>

        <ul>
          {expenses.map((exp) => (
            <li key={exp._id}>
              {exp.category} - {exp.amount} - {exp.date}
            </li>
          ))}
        </ul>
      </div>
   </div>
  );
}

export default Home;


