import React, { useState } from "react";
import { addExpense } from "../api/expenseApi";

const AddExpenseForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount || !date) return alert("Please fill all required fields");

    const expense = { title, amount: parseFloat(amount), category, date };
    const response = await addExpense(expense);
    onAdd(response.data);

    // clear form
    setTitle(""); setAmount(""); setCategory("Food"); setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded space-y-4">
      <div>
        <label>Title</label>
        <input className="border p-2 w-full" type="text" value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Amount</label>
        <input className="border p-2 w-full" type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} required />
      </div>
      <div>
        <label>Category</label>
        <select className="border p-2 w-full" value={category} onChange={e => setCategory(e.target.value)}>
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Others</option>
        </select>
      </div>
      <div>
        <label>Date</label>
        <input className="border p-2 w-full" type="date" value={date} onChange={e => setDate(e.target.value)} required />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Expense</button>
    </form>
  );
};

export default AddExpenseForm;
