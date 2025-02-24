import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";
import Vendor from "../models/vendorModel.js";
import mongoose from 'mongoose'


// SignUp Controller: Creates a new user and returns a token and user details
export const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const userToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      message: "User signed up successfully!",
      userToken,
      userId: newUser._id,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error signing up user", error });
  }
};

// SignIn Controller: Authenticates user and returns token and user details
export const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      success: true,  
      message: "User signed in successfully!",
      userToken,
      userId: user._id,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error signing in user", error });
  }
};

// Get a specific vendor by ID
export const getVendorById = async (req, res) => {
  try {
    // console.log("Vendor API - Received Params:", req.params); // Debugging

    const { vendorId } = req.params;
    if (!vendorId) {
      return res.status(400).json({ success: false, message: "Vendor ID is required." });
    }

    const vendor = await Vendor.findById(vendorId).select("-password -token");
    if (!vendor) {
      return res.status(404).json({ success: false, message: "Vendor not found." });
    }

    res.status(200).json({ success: true, vendor });
  } catch (error) {
    console.error("Error fetching vendor:", error.message);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export const viewOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    res.status(200).json(user.orders);
  } catch (error) {
    res.status(400).json({ message: "Error retrieving orders", error });
  }
};

export const viewCoupons = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    res.status(200).json(user.coupons);
  } catch (error) {
    res.status(400).json({ message: "Error retrieving coupons", error });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from userAuth middleware

    const user = await User.findById(userId).select("-password"); // Exclude password field

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};


export const purchaseCoupon = async (req, res) => {
  try {
    const { couponId, vendorId, name, percent, price, expiryDate } = req.body; // Coupon details
    const userId = req.user.id;

    // Validate input
    if (!couponId || !vendorId || !name || percent === undefined || !price || !expiryDate) {
      return res.status(400).json({ success: false, message: "All coupon details are required." });
    }

    // Fetch user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Check if the user already purchased this coupon
    const alreadyPurchased = user.coupons.some((c) => c.couponId.toString() === couponId);
    if (alreadyPurchased) {
      return res.status(400).json({ success: false, message: "You already own this coupon." });
    }

    // Add coupon to user's coupons array
    user.coupons.push({
      couponId,
      vendorId,
      discountApplied: percent,
      purchasedAt: new Date(),
    });

    await user.save();

    res.status(200).json({ success: true, message: "Coupon purchased successfully!", coupons: user.coupons });
  } catch (error) {
    console.error("Error purchasing coupon:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const placeOrder = async (req, res) => {
  try {

    const { productId, vendorId, originalPrice, discountApplied, finalPrice } = req.body;
    if (!productId || !vendorId || !originalPrice || !finalPrice) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const userId = req.user.id; // Extract authenticated user ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Create a new order
    const newOrder = {
      orderId: new mongoose.Types.ObjectId(),
      vendorId,
      totalPrice: finalPrice,
      orderStatus: "Pending",
      orderedAt: new Date(),
    };

    user.orders.push(newOrder);
    await user.save();

    res.status(201).json({ success: true, message: "Order placed successfully with discount!" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};


