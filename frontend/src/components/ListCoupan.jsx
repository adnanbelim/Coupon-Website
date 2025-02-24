import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const CouponList = () => {
    const { vendorId } = useParams();
    const { backendUrl, vendorToken } = useContext(AppContext);
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCoupons = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${backendUrl}/api/vendor/coupons/${vendorId}`);
                setCoupons(response.data.coupons);
            } catch (error) {
                console.error("Error fetching coupons:", error);
                toast.error("Failed to load coupons.");
            } finally {
                setLoading(false);
            }
        };

        fetchCoupons();
    }, [backendUrl, vendorId, vendorToken]);

    // Remove coupon handler
    const handleRemoveCoupon = async (couponId) => {
        if (window.confirm("Are you sure you want to remove this coupon?")) {
            setLoading(true);
            try {
                const response = await axios.delete(`${backendUrl}/api/vendor/remove-coupon`, {
                    data: { vendorId, couponId },
                    headers: {
                        "Authorization": `Bearer ${vendorToken}`,
                    },
                });

                toast.success(response.data.message);
                setCoupons(coupons.filter((coupon) => coupon._id !== couponId)); // Remove from state
            } catch (error) {
                console.error("Error removing coupon:", error);
                toast.error("Failed to remove coupon.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Coupons for Your Shop</h2>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {coupons.length === 0 ? (
                        <p>No coupons available.</p>
                    ) : (
                        <ul>
                            {coupons.map((coupon) => (
                                <li key={coupon._id} className="flex justify-between items-center mb-4">
                                    <div>
                                        <h3 className="font-medium text-gray-700">{coupon.name}</h3>
                                        <p className="text-sm text-gray-500">Discount: {coupon.percent}%</p>
                                        <p className="text-sm text-gray-500">Minimum Purchase: {coupon.price}$</p>
                                        <p className="text-sm text-gray-500">Expiry Date: {new Date(coupon.expiryDate).toLocaleDateString()}</p>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveCoupon(coupon._id)}
                                        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default CouponList;
