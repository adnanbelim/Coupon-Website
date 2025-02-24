import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const PurchasedCoupan = () => {
    const { user } = useContext(AppContext); // Get user data from context
    const { coupons } = user || {}; // Extract coupons

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Purchased Coupons</h2>

            {coupons?.length > 0 ? (
                <ul>
                    {coupons.map((coupon) => (
                        <li key={coupon._id} className="border-b pb-4 mb-4">
                            <p><strong>Coupon ID:</strong> {coupon.couponId}</p>
                            <p><strong>Discount Applied:</strong> {coupon.discountApplied}%</p>
                            <p><strong>Vendor ID:</strong> {coupon.vendorId}</p>
                            <p><strong>Purchased At:</strong> {new Date(coupon.purchasedAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No coupons purchased yet.</p>
            )}
        </div>
    );
};

export default PurchasedCoupan;
