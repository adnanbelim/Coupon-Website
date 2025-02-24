import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const ShopDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shopDetails, setShopDetails] = useState(null);
  const { vendorId } = useParams();
  const { backendUrl, vendorToken } = useContext(AppContext);
  // useEffect(() => {
  //   console.log("Vendor ID:", vendorId);
  //   console.log("Vendor Token:", vendorToken);
  // }, [vendorId, vendorToken]); // ✅ Runs only when vendorId or vendorToken change

  // ✅ Fetch Vendor Details on Mount
  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/vendor/${vendorId}`,
          {
            headers: { Authorization: `Bearer ${vendorToken}` },
          }
        );

        if (response.data.vendor.shop.fill === "true") {
          setShopDetails(response.data.vendor.shop);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch vendor details."
        );
      }
    };

    fetchVendorDetails();
  }, [backendUrl, vendorId, vendorToken]);

  // ✅ Handle Image Upload Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    formData.append("vendorId", vendorId); // ✅ Ensure vendorId is included
    if (data.image[0]) {
      formData.append("image", data.image[0]); // ✅ Send image file
    }

    console.log("📤 Sending Vendor ID:", vendorId);
    console.log("📤 Sending Vendor Token:", vendorToken);

    try {
      const response = await axios.post(
        `${backendUrl}/api/vendor/upload-shop`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${vendorToken}`,
          },
        }
      );

      console.log("🔍 Vendor ID:", vendorId);

      toast.success(response.data.message);

      setShopDetails({
        ...data,
        fill: true,
        image: response.data.shop.image, // ✅ Ensure correct image name is set
        address: { city: data.city, state: data.state },
      });
    } catch (error) {
      console.error("❌ Error Response:", error.response?.data);
      toast.error(
        error.response?.data?.message || "Failed to upload shop details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        {shopDetails?.fill ? "Your Shop Details" : "Upload Shop Details"}
      </h2>

      {shopDetails?.fill ? (
        <div className="text-center">
          <img
            src={`${backendUrl}/uploads/${shopDetails.image}`}
            alt={shopDetails.name}
            className="w-full h-40 object-cover rounded-md"
          />
          <h3 className="text-lg font-bold mt-3">{shopDetails.name}</h3>
          <p className="text-gray-600">{shopDetails.description}</p>
          <p className="text-gray-500">{shopDetails.contactNumber}</p>
          <p className="text-gray-500">
            {shopDetails.address?.city || "N/A"},{" "}
            {shopDetails.address?.state || "N/A"}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            {...register("name", { required: "Shop Name is required" })}
            placeholder="Shop Name"
            className="w-full border p-2 rounded-md"
          />

          <input
            type="text"
            {...register("contactNumber", {
              required: "Contact Number is required",
            })}
            placeholder="Contact Number"
            className="w-full border p-2 rounded-md"
          />

          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Description"
            className="w-full border p-2 rounded-md"
          />

          <input
            type="text"
            {...register("city", { required: "City is required" })}
            placeholder="City"
            className="w-full border p-2 rounded-md"
          />

          <input
            type="text"
            {...register("state", { required: "State is required" })}
            placeholder="State"
            className="w-full border p-2 rounded-md"
          />

          <input
            type="file"
            {...register("image", { required: "Shop Image is required" })}
            accept="image/*"
            className="w-full border p-2 rounded-md"
            onChange={handleImageChange}
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-40 object-cover rounded-md mt-2"
            />
          )}

          <button
            type="submit"
            className={`w-full text-white py-2 rounded-md ${
              loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Shop"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ShopDetails;
