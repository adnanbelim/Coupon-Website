import express from 'express';
import { getAllVendors, signUpVendor, signInVendor, uploadShopDetails, addProduct, removeProduct, addCoupon, removeCoupon, listCoupons, listProducts, getVendorById } from '../controllers/vendorController.js';
import authVendor from '../middlewares/authVendor.js';
import upload from "../middlewares/multer.js";

const vendorRouter = express.Router();

// Get all vendors
vendorRouter.get("/vendors", getAllVendors);

// Vendor Authentication Routes
vendorRouter.post("/vendor/signup", signUpVendor);
vendorRouter.post("/vendor/signin", signInVendor);

// Vendor Shop Management Routes
vendorRouter.post("/vendor/add-product", authVendor, upload.single("image"), addProduct);
vendorRouter.delete("/vendor/remove-product", authVendor, removeProduct);
vendorRouter.get("/vendor/products/:vendorId", authVendor, listProducts);
vendorRouter.get("/vendor/:vendorId", authVendor, getVendorById);
vendorRouter.post("/vendor/add-coupon", authVendor, addCoupon);
vendorRouter.delete("/vendor/remove-coupon", authVendor, removeCoupon);
// Route to list coupons for a specific vendor
vendorRouter.get("/vendor/coupons/:vendorId", listCoupons);


// Upload Shop Details Route
vendorRouter.post("/vendor/upload-shop", authVendor, upload.single("image"), uploadShopDetails);


export default vendorRouter;
