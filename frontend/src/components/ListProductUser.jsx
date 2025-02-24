import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const ListProductUser = () => {
  const { vendorId } = useParams();
  const { backendUrl } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vendor, setVendor] = useState(null);
  const { userToken, user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendorProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/${vendorId}`);
        setVendor(response.data.vendor);
        setProducts(response.data.vendor.products);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch products."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVendorProducts();
  }, [backendUrl, vendorId]);

  const purchaseCoupan = () => {
    if (userToken) {
      navigate(`/shopcoupan/${vendorId}`);
    } else {
      toast.error("Please Login First");
    }
  };

  const purchaseProduct = async (product) => {
    if (!userToken) {
      toast.error("Please Login First");
      return;
    }

    // Find a valid coupon for this vendor
    const userCoupon = user?.coupons?.find(
      (coupon) => coupon.vendorId === vendorId
    );

    let finalPrice = product.price;
    let discountApplied = 0;

    if (userCoupon) {
      discountApplied = (userCoupon.discountApplied / 100) * product.price;
      finalPrice = product.price - discountApplied;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/user/place-order`,
        {
          productId: product._id,
          vendorId,
          originalPrice: product.price,
          discountApplied,
          finalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">
          {vendor?.shop?.name || "Shop"} Products
        </h2>
        <button
          onClick={() => {
            purchaseCoupan();
          }}
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          Purchase Coupon
        </button>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow-md">
              <img
                src={`${backendUrl}/uploads/${product.image}`}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-blue-600 font-bold">{product.price}$</p>
              <button
                onClick={() => purchaseProduct(product)}
                className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Purchase Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListProductUser;
