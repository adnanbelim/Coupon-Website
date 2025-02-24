import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const ListProduct = () => {
  const { vendorId } = useParams();
  const { backendUrl, vendorToken } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/vendor/products/${vendorId}`,
          {
            headers: { Authorization: `Bearer ${vendorToken}` },
          }
        );
        console.log("Fetched products:", response.data.products); // Debugging
        setProducts(response.data.products);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch products."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [backendUrl, vendorId, vendorToken]);

  // 🔴 Remove Product Handler
  const removeProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to remove this product?"))
      return;

    try {
      const response = await axios.delete(
        `${backendUrl}/api/vendor/remove-product`,
        {
          headers: { Authorization: `Bearer ${vendorToken}` },
          data: { vendorId, productId },
        }
      );

      toast.success(response.data.message);
      setProducts(products.filter((product) => product._id !== productId)); // Update UI
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove product.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Your Products
      </h2>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                onClick={() => removeProduct(product._id)}
                className="mt-2 bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListProduct;
