import React, { useEffect, useState } from "react";

const EditExpenseModal = ({ open, onClose, expense, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (expense) {
      setTitle(expense.title || "");
      setAmount(expense.amount?.toString() || "");
      setCategory(expense.category || "Food");
      // ensure yyyy-mm-dd format
      const d = expense.date ? new Date(expense.date) : new Date();
      const iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10);
      setDate(iso);
    }
  }, [expense]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      amount: parseFloat(amount),
      category,
      date, // backend will parse ISO date
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Edit Expense</h2>
          <button onClick={onClose} className="px-2 py-1 rounded hover:bg-gray-100">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              className="border p-2 w-full rounded"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              minLength={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Amount</label>
            <input
              className="border p-2 w-full rounded"
              type="number"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Category</label>
            <select
              className="border p-2 w-full rounded"
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
            <label className="block text-sm mb-1">Date</label>
            <input
              className="border p-2 w-full rounded"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseModal;
