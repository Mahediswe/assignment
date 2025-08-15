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
  const [filteredExpenses, setFilteredExpenses] = useState([]); 
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // fetch all expenses
  const fetchExpenses = async () => {
    const response = await getExpenses();
    setExpenses(response.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Add new expense
  const handleAdd = (expense) => setExpenses([expense, ...expenses]);

  // Delete expense
  const handleDelete = async (id) => {
    await deleteExpense(id);
    setExpenses(expenses.filter((exp) => exp._id !== id));
  };

  // Open edit modal
  const handleOpenEdit = (expense) => {
    setEditing(expense);
    setIsModalOpen(true);
  };

  // Close edit modal
  const handleCloseEdit = () => {
    setIsModalOpen(false);
    setEditing(null);
  };

  // Submit edited expense
  const handleSubmitEdit = async (payload) => {
    if (!editing?._id) return;
    const updated = await updateExpense(editing._id, payload);
    setExpenses((prev) =>
      prev.map((e) => (e._id === updated._id ? updated : e))
    );
    handleCloseEdit();
  };

  // Filter expenses
  const handleFilter = async () => {
    const data = await getFilteredExpenses(category, startDate, endDate);
    setFilteredExpenses(data.data);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-600 text-center">Personal Expense Tracker</h1>
      <h1 className="text-3xl font-bold mb-4  text-center">Add Expense</h1>

      {/* Add Expense */}
      <AddExpenseForm onAdd={handleAdd} />

      {/* Expense List */}
      <ExpenseList
        expenses={expenses}
        onDelete={handleDelete}
        onEdit={handleOpenEdit}
      />

      {/* Edit Modal */}
      <EditExpenseModal
        open={isModalOpen}
        onClose={handleCloseEdit}
        expense={editing}
        onSubmit={handleSubmitEdit}
      />

      {/* Filter Section */}
      <div className="mt-8 max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center p-4 mb-4">Filter Section </h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center justify-center">
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

          <button
            onClick={handleFilter}
            className="mt-4 sm:mt-0 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Filter
          </button>
        </div>

        {/* Filtered Expenses */}
        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filtered Expenses</h2>
          {filteredExpenses.length === 0 ? (
            <p className="text-gray-500 py-4">No filtered expenses found</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredExpenses.map((exp) => (
                <li key={exp._id} className="py-4 flex justify-between items-center">
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      exp.category === "Food" ? "bg-green-100 text-green-800" :
                      exp.category === "Transport" ? "bg-blue-100 text-blue-800" :
                      exp.category === "Shopping" ? "bg-purple-100 text-purple-800" :
                      "bg-gray-100 text-gray-800"
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
