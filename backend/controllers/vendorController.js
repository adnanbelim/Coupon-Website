import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Vendor from "../models/vendorModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Constants
const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRATION = "2h"; // Extend token validity
const SALT_ROUNDS = 10; // Secure password hashing

// Sign Up Vendor
export const signUpVendor = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const existingVendor = await Vendor.findOne({ email: email.trim() });
        if (existingVendor) {
            return res.status(400).json({ success: false, message: "Vendor already exists." });
        }

        const hashedPassword = bcrypt.hashSync(password.trim(), SALT_ROUNDS);
        const newVendor = new Vendor({ name: name.trim(), email: email.trim(), password: hashedPassword });

        await newVendor.save();

        const vendorToken = jwt.sign({ id: newVendor._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

        res.status(201).json({
            success: true,
            message: "Vendor signed up successfully!",
            vendorToken,
            vendorId: newVendor._id,
        });
    } catch (error) {
        console.error("Error signing up vendor:", error.message);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

// Sign In Vendor
export const signInVendor = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const vendor = await Vendor.findOne({ email: email.trim() });
        if (!vendor) {
            return res.status(404).json({ success: false, message: "Vendor not found." });
        }

        const isPasswordValid = await bcrypt.compare(password.trim(), vendor.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }

        const vendorToken = jwt.sign({ id: vendor._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

        res.status(200).json({
            success: true,
            message: "Vendor signed in successfully!",
            vendorToken,
            vendorId: vendor._id,
        });
    } catch (error) {
        console.error("Error signing in vendor:", error.message);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

// Add Product
export const addProduct = async (req, res) => {
    try {
        const { vendorId, name, price, description } = req.body;
        const image = req.file ? req.file.filename : null; // Get the uploaded file name

        if (!vendorId || !name || !image || !price || !description) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ success: false, message: "Vendor not found." });
        }

        vendor.products.push({ name, image, price, description });
        await vendor.save();

        res.status(201).json({ success: true, message: "Product added successfully!" });
    } catch (error) {
        console.error("Error adding product:", error.message);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};


// Remove Product
export const removeProduct = async (req, res) => {
    try {
        const { vendorId, productId } = req.body;

        if (!vendorId || !productId) {
            return res.status(400).json({ success: false, message: "Vendor ID and Product ID are required." });
        }

        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ success: false, message: "Vendor not found." });
        }

        vendor.products = vendor.products.filter(product => product._id.toString() !== productId);
        await vendor.save();

        res.status(200).json({ success: true, message: "Product removed successfully!" });
    } catch (error) {
        console.error("Error removing product:", error.message);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

// List Product
export const listProducts = async (req, res) => {
    try {
        const { vendorId } = req.params;

        if (!vendorId) {
            return res.status(400).json({ success: false, message: "Vendor ID is required." });
        }

        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ success: false, message: "Vendor not found." });
        }

        res.status(200).json({ success: true, products: vendor.products });
    } catch (error) {
        console.error("Error listing products:", error.message);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

export const getVendorById = async (req, res) => {
    try {
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


// Add Coupon
export const addCoupon = async (req, res) => {
    try {
        const { vendorId, name, percent, price, expiryDate } = req.body;

        if (!vendorId || !name || !percent || !price || !expiryDate) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ success: false, message: "Vendor not found." });
        }

        vendor.coupons.push({ name, percent, price, expiryDate });
        await vendor.save();

        res.status(201).json({ success: true, message: "Coupon added successfully!" });
    } catch (error) {
        console.error("Error adding coupon:", error.message);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

// Remove Coupon
export const removeCoupon = async (req, res) => {
    try {
        const { vendorId, couponId } = req.body;

        if (!vendorId || !couponId) {
            return res.status(400).json({ success: false, message: "Vendor ID and Coupon ID are required." });
        }

        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ success: false, message: "Vendor not found." });
        }

        vendor.coupons = vendor.coupons.filter(coupon => coupon._id.toString() !== couponId);
        await vendor.save();

        res.status(200).json({ success: true, message: "Coupon removed successfully!" });
    } catch (error) {
        console.error("Error removing coupon:", error.message);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

// List all coupons of a specific vendor
export const listCoupons = async (req, res) => {
    try {
        const { vendorId } = req.params;

        if (!vendorId) {
            return res.status(400).json({ success: false, message: "Vendor ID is required." });
        }

        // Find the vendor by vendorId
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ success: false, message: "Vendor not found." });
        }

        // Get all the coupons from the vendor's shop
        const coupons = vendor.coupons;

        // Respond with the list of coupons
        res.status(200).json({ success: true, coupons });
    } catch (error) {
        console.error("Error listing coupons:", error.message);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};


// Upload Shop Details
// export const uploadShopDetails = async (req, res) => {
//     try {
//         const { vendorId, name, contactNumber, description, city, state } = req.body;

//         if (!vendorId) {
//             return res.status(400).json({ success: false, message: "Vendor ID is required." });
//         }

//         const vendor = await Vendor.findById(vendorId);
//         if (!vendor) {
//             return res.status(404).json({ success: false, message: "Vendor not found." });
//         }

//         let imageUrl = vendor.shop?.image || ""; // Preserve existing image if no new one is uploaded

//         // Upload image to Cloudinary if a new file is provided
//         if (req.file) {
//             const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
//                 folder: "shop_images",
//             });

//             imageUrl = cloudinaryResponse.secure_url;

//             // Remove file from local storage after upload
//             fs.unlinkSync(req.file.path);
//         }

//         // Update shop details
//         vendor.shop = {
//             name,
//             image: imageUrl,
//             contactNumber,
//             description,
//             address: { city, state },
//             products: vendor.shop?.products || [],
//             coupons: vendor.shop?.coupons || [],
//             orders: vendor.shop?.orders || [],
//             fill: true, // Set fill to true when details are uploaded
//         };

//         await vendor.save();

//         res.status(200).json({
//             success: true,
//             message: "Shop details updated successfully!",
//             shop: vendor.shop,
//         });
//     } catch (error) {
//         console.error("Error uploading shop details:", error.message);
//         res.status(500).json({ success: false, message: "Internal server error", error: error.message });
//     }
// };

export const uploadShopDetails = async (req, res) => {
    console.log("📢 Received Vendor ID:", req.body.vendorId);

    try {
        const vendor = await Vendor.findById(req.body.vendorId);

        if (!vendor) {
            console.log("❌ Vendor not found in database.");
            return res.status(404).json({ success: false, message: "Vendor not found." });
        }

        console.log("✅ Vendor Found:", vendor);

        // ✅ Ensure image is received
        console.log("📸 Uploaded Image:", req.file ? req.file.filename : "No image uploaded");

        vendor.shop = {
            name: req.body.name,
            description: req.body.description,
            contactNumber: req.body.contactNumber,
            address: {
                city: req.body.city,
                state: req.body.state,
            },
            image: req.file ? req.file.filename : null,
            fill: true,
        };

        await vendor.save();

        res.status(200).json({ success: true, message: "Shop details uploaded successfully!", shop: vendor.shop });

    } catch (error) {
        console.error("❌ Error in uploadShopDetails:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

export const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find({});
        res.status(200).json({ success: true, vendors });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch vendors" });
    }
};

