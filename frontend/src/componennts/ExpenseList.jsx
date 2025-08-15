import React from "react";

const badgeClasses = (cat) => {
  const base = "px-2 py-0.5 rounded text-xs font-medium";
  switch (cat) {
    case "Food": return `${base} bg-green-100 text-green-700`;
    case "Transport": return `${base} bg-blue-100 text-blue-700`;
    case "Shopping": return `${base} bg-purple-100 text-purple-700`;
    default: return `${base} bg-gray-100 text-gray-700`;
  }
};

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  const total = expenses.reduce((acc, exp) => acc + (Number(exp.amount) || 0), 0);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-3">Total: ${total.toFixed(2)}</h2>

      <div className="space-y-2">
        {expenses.map((exp) => (
          <div key={exp._id} className="flex justify-between items-center p-4 bg-white shadow rounded">
            <div>
              <h3 className="font-semibold">{exp.title}</h3>
              <p className="text-sm">
                ${Number(exp.amount).toFixed(2)} ·{" "}
                <span className={badgeClasses(exp.category)}>{exp.category}</span>
              </p>
              <p className="text-xs text-gray-500">
                {new Date(exp.date).toLocaleDateString()}
              </p>
            </div>

            <div className="space-x-2">
              <button
                className="bg-green-600 text-white px-3 py-1 rounded"
                onClick={() => onEdit(exp)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => onDelete(exp._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {expenses.length === 0 && (
          <div className="p-6 text-center text-gray-500 bg-white rounded shadow">
            No expenses yet. Add your first one!
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
