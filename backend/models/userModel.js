import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // User SignUp Details
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  // Coupons the user has purchased (array of objects)
  coupons: [{
    couponId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",  // Reference to the Coupon created by a vendor
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",  // Reference to the vendor who created the coupon
    },
    discountApplied: {
      type: Number,  // Amount discounted by the coupon
    },
    purchasedAt: {
      type: Date,
      default: Date.now,
    },
  }],

  // Orders the user has placed (array of objects)
  orders: [{
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",  // Reference to an order object
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",  // Reference to the vendor's shop where the purchase was made
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      default: "Pending",
    },
    orderedAt: {
      type: Date,
      default: Date.now,
    },
  }],
});

export default mongoose.model("User", userSchema);

