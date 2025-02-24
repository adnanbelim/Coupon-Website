import jwt from 'jsonwebtoken';
import Vendor from '../models/vendorModel.js';

const authVendor = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]; // Extract token from 'Authorization' header
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not Authorized, Please Login Again',
            });
        }

        // Decode token and get vendor ID
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Verify if the vendor exists
        const vendor = await Vendor.findById(decodedToken.id);
        if (!vendor) {
            return res.status(401).json({
                success: false,
                message: 'Vendor not found',
            });
        }

        req.body.vendorId = decodedToken.id; // Attach vendor ID to request body for use in controllers

        next(); // Proceed to the next middleware or controller
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: 'Invalid Token' });
    }
};

export default authVendor;