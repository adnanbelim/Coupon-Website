import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
    console.log("🔹 Received Token:", token); // ✅ Debug: Check if token is received

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔹 Decoded Token:", decoded); // ✅ Debug: Check if token is valid

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
    }

    req.user = user; // Attach user details to request
    next();
  } catch (error) {
    console.error("🔴 Auth Error:", error.message);
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid token or session expired" });
  }
};

export default authUser;
