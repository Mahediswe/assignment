// import Expense from "../models/Expense.js";

// // Add Expense
// export const addExpense = async (req, res) => {
//   try {
//     const { title, amount, category, date } = req.body;
//     const expense = await Expense.create({
//       title,
//       amount,
//       category,
//       date,
//       user: req.user._id,
//     });
//     res.status(201).json(expense);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // Get All Expenses
// export const getExpenses = async (req, res) => {
//   try {
//     const { category, startDate, endDate } = req.query;
//     const filter = { user: req.user._id };

//     if (category) filter.category = category;
//     if (startDate && endDate) {
//       filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
//     }
//     const expenses = await Expense.find().sort({ date: -1, createdAt: -1 });
//     res.json(expenses);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update Expense
// export const updateExpense = async (req, res) => {
//   try {
//     const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!expense) return res.status(404).json({ message: "Expense not found" });
//     res.json(expense);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // Delete Expense
// export const deleteExpense = async (req, res) => {
//   try {
//     const expense = await Expense.findByIdAndDelete(req.params.id);
//     if (!expense) return res.status(404).json({ message: "Expense not found" });
//     res.json({ message: "Expense deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Filter Expense
// export const filterExpenses = async (req, res) => {
//   try {
//     const { category, startDate, endDate } = req.query;

//     let query = {};

//     // category filter
//     if (category) {
//       query.category = category;
//     }

//     // date range filter
//     if (startDate && endDate) {
//       query.date = {
//         $gte: new Date(startDate),
//         $lte: new Date(endDate),
//       };
//     }

//     const expenses = await Expense.find(query);
//     res.status(200).json(expenses);
//   } catch (error) {
//     res.status(500).json({ message: "Error filtering expenses", error });
//   }
// };

import Expense from "../models/Expense.js";

// Create
export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    const userId = req.user._id;
    const expense = await Expense.create({
      title,
      amount,
      category,
      date,
      user: req.user._id,
    });
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get (with optional filters you already added)
export const getExpenses = async (req, res) => {
  try {
    const { category, startDate, endDate } = req.query;
    const filter = { user: req.user._id };

    if (category) filter.category = category;
    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const expenses = await Expense.find(filter).sort({
      date: -1,
      createdAt: -1,
    });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
export const updateExpense = async (req, res) => {
  try {
    const updated = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Expense not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete
export const deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!deleted) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const filterExpenses = async (req, res) => {
  try {
    const { category, startDate, endDate } = req.query;

    let query = {};

    // category filter
    if (category) {
      query.category = category;
    }

    // date range filter
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const expenses = await Expense.find(query);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error filtering expenses", error });
  }
};
