import express from 'express';
import {  signUpUser, signInUser, purchaseCoupon, placeOrder, viewOrders, viewCoupons, getVendorById, getUser } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js'; // Importing the authentication middleware

const userRouter = express.Router();

// User Routes
userRouter.post("/user/signup", signUpUser); // Route to sign up a new user
userRouter.post("/user/signin", signInUser); // Route to sign in an existing user
userRouter.post("/user/place-order", authUser, placeOrder); // Auth required
userRouter.get("/user/:userId/orders", authUser, viewOrders); // Auth required
userRouter.get("/user/single", authUser, getUser);
userRouter.get("/user/:vendorId", getVendorById);
userRouter.get("/user/:userId/coupons", authUser, viewCoupons); // Auth required
userRouter.post("/user/purchase-coupon", authUser, purchaseCoupon);
userRouter.post("/user/place-order", authUser, placeOrder);

export default userRouter;
