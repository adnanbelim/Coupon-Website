import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCoupon = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const { vendorToken, backendUrl, vendorId } = useContext(AppContext);
    const navigate = useNavigate();

    // Handle form submission
    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/api/vendor/add-coupon`, data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${vendorToken}`,
                }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                navigate(`/listcoupan/${vendorId}`); // Navigate to coupon list or some other page
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to add coupon.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Create Coupon</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Coupon Name */}
                <input
                    type="text"
                    {...register("name", { required: "Coupon Name is required" })}
                    placeholder="Coupon Name"
                    className="w-full border p-2 rounded-md"
                />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}

                {/* Percent Discount */}
                <input
                    type="number"
                    {...register("percent", { required: "Discount Percent is required", min: 1, max: 100 })}
                    placeholder="Discount Percent"
                    className="w-full border p-2 rounded-md"
                />
                {errors.percent && <span className="text-red-500">{errors.percent.message}</span>}

                {/* Price Condition */}
                <input
                    type="number"
                    {...register("price", { required: "Price is required", min: 1 })}
                    placeholder="Price Condition"
                    className="w-full border p-2 rounded-md"
                />
                {errors.price && <span className="text-red-500">{errors.price.message}</span>}

                {/* Expiry Date */}
                <input
                    type="date"
                    {...register("expiryDate", { required: "Expiry Date is required" })}
                    className="w-full border p-2 rounded-md"
                />
                {errors.expiryDate && <span className="text-red-500">{errors.expiryDate.message}</span>}

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full text-white py-2 rounded-md ${loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"}`}
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Coupon"}
                </button>
            </form>
        </div>
    );
};

export default AddCoupon;
