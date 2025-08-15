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
      {/* <div className="max-w-3xl mx-auto p-4 text-center">
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
      </div> */}
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
  {/* Filter Controls */}
  <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-center">
    {/* Category Select */}
    <div className="w-full sm:w-auto">
      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
        Category
      </label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All Categories</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
      </select>
    </div>

    {/* Date Range */}
    <div className="flex flex-col sm:flex-row gap-4">
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
          Start Date
        </label>
        <input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="block px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
          End Date
        </label>
        <input
          id="endDate"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="block px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>

    {/* Filter Button */}
    <button
      onClick={handleFilter}
      className="mt-6 sm:mt-0 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
    >
      Filter
    </button>
  </div>

  {/* Expenses List */}
  <div className="border-t border-gray-200 pt-4">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Expenses</h2>
    {expenses.length === 0 ? (
      <p className="text-gray-500 py-4">No expenses found</p>
    ) : (
      <ul className="divide-y divide-gray-200">
        {expenses.map((exp) => (
          <li key={exp._id} className="py-4">
            <div className="flex justify-between items-center">
              <div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  exp.category === 'Food' ? 'bg-green-100 text-green-800' : 
                  exp.category === 'Transport' ? 'bg-blue-100 text-blue-800' :
                  exp.category === 'Shopping' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {exp.category}
                </span>
                <span className="ml-2 text-gray-500 text-sm">
                  {new Date(exp.date).toLocaleDateString()}
                </span>
              </div>
              <span className="font-medium text-gray-900">
                ${parseFloat(exp.amount).toFixed(2)}
              </span>
            </div>
            {exp.description && (
              <p className="mt-1 text-sm text-gray-600">{exp.description}</p>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
</div>
    </div>
  );
}

export default Home;
