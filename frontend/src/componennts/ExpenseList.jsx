import React from "react";

const ExpenseList = ({ expenses, onDelete }) => {
  const total = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Total: ${total.toFixed(2)}</h2>
      <div className="space-y-2">
        {expenses.map((exp) => (
          <div key={exp._id} className="flex justify-between items-center p-4 bg-white shadow rounded">
            <div>
              <h3 className="font-semibold">{exp.title}</h3>
              <p>${exp.amount.toFixed(2)} - <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded">{exp.category}</span></p>
              <p className="text-sm text-gray-500">{new Date(exp.date).toLocaleDateString()}</p>
            </div>
            <div className="space-x-2">
              <button className="bg-green-500 text-white px-3 py-1 rounded">Edit</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => onDelete(exp._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
