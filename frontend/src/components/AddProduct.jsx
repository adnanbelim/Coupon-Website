import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const { vendorId } = useParams();
    const { backendUrl, vendorToken } = useContext(AppContext);

    // Handle Image Upload Preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Handle Form Submission
    const onSubmit = async (data) => {
        setLoading(true);

        const formData = new FormData();
        formData.append("vendorId", vendorId);
        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("description", data.description);
        formData.append("image", data.image[0]);
        try {
            const response = await axios.post(`${backendUrl}/api/vendor/add-product`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${vendorToken}`
                }
            });
            toast.success("Product added successfully!");
            setImagePreview(null);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Product</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                    type="text"
                    {...register("name", { required: "Product Name is required" })}
                    placeholder="Product Name"
                    className="w-full border p-2 rounded-md"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                <input
                    type="number"
                    {...register("price", { required: "Price is required" })}
                    placeholder="Price"
                    className="w-full border p-2 rounded-md"
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

                <textarea
                    {...register("description", { required: "Description is required" })}
                    placeholder="Description"
                    className="w-full border p-2 rounded-md"
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

                <input
                    type="file"
                    {...register("image", { required: "Product Image is required" })}
                    accept="image/*"
                    className="w-full border p-2 rounded-md"
                    onChange={handleImageChange}
                />
                {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

                {/* Image Preview */}
                {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-md mt-2" />
                )}

                <button
                    type="submit"
                    className={`w-full text-white py-2 rounded-md ${loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"}`}
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
