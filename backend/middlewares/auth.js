import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const auth = async (req, res, next) => {
  try {
    const hdr = req.headers.authorization || "";
    // Expect: "Bearer <token>"
    const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("_id name email");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // attach
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
