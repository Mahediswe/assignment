import React, { useState } from "react";
import { addExpense } from "../api/expenseApi";

const AddExpenseForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!title || title.length < 3) return alert("Title must be at least 3 characters");
    if (!amount || amount <= 0) return alert("Amount must be greater than 0");
    if (!date) return alert("Date is required");

    const expense = { title, amount: parseFloat(amount), category, date };
    setLoading(true);
    try {
      const response = await addExpense(expense);
      onAdd(response.data);

      // Clear form
      setTitle("");
      setAmount("");
      setCategory("Food");
      setDate("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message || "Error adding expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow rounded space-y-4"
    >
      <div>
        <label>Title</label>
        <input
          className="border p-2 w-full"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter expense title"
          required
        />
      </div>

      <div>
        <label>Amount</label>
        <input
          className="border p-2 w-full"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />
      </div>

      <div>
        <label>Category</label>
        <select
          className="border p-2 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Others</option>
        </select>
      </div>

      <div>
        <label>Date</label>
        <input
          className="border p-2 w-full"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-500"}`}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
};

export default AddExpenseForm;
