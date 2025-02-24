import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ShowVendorCoupan = () => {
    const { vendorId } = useParams();
    const { backendUrl, userId, userToken } = useContext(AppContext);
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
    }, [backendUrl, vendorId]);

    // Purchase Coupon Handler
    const handlePurchaseCoupon = async (coupon) => {
        if (!userId || !userToken) {
            return toast.error("You must be logged in to purchase a coupon.");
        }

        setLoading(true);
        try {
            const response = await axios.post(
                `${backendUrl}/api/user/purchase-coupon`,
                {
                    couponId: coupon._id,
                    vendorId,
                    name: coupon.name,
                    percent: coupon.percent,
                    price: coupon.price,
                    expiryDate: coupon.expiryDate
                },
                { headers: { "Authorization": `Bearer ${userToken}` } }
            );

            toast.success(response.data.message);
        } catch (error) {
            console.error("Error purchasing coupon:", error);
            toast.error(error.response?.data?.message || "Failed to purchase coupon.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Available Coupons</h2>

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
                                        onClick={() => handlePurchaseCoupon(coupon)}
                                        className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                                    >
                                        Purchase
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

export default ShowVendorCoupan;
