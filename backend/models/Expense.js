import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be greater than 0"],
    },
    category: {
      type: String,
      enum: ["Food", "Transport", "Shopping", "Others"],
      default: "Others",
      required: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    user: {
       type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
