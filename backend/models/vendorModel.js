import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
    // Vendor's account details
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

    // Shop details
    shop: {
        name: {
            type: String,
        },
        image: {
            type: String,
        },
        contactNumber: {
            type: String,
        },
        description: {
            type: String,
        },
        address: {
            city: {
                type: String,
            },
            state: {
                type: String,
            },
        },
        fill: {
            type: String,
            default: false
        }
    },

    // Products in the shop
    products: [{
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    }],

    // Coupons the vendor creates for their products
    coupons: [{
        name: {
            type: String,
            required: true,
        },
        percent: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        expiryDate: {
            type: Date,
            required: true,
        },
    }],

    // Orders made by users for this vendor's products
    orders: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",  // Reference to the User model
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",  // Reference to the Product model (optional, as we're storing product in vendor schema itself)
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

    // Token for vendor API access (Optional)
    token: {
        type: String,
    },
});

export default mongoose.model("Vendor", vendorSchema);

