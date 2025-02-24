import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const UserOrders = () => {
    const { user } = useContext(AppContext);

    if (!user || !user.orders || user.orders.length === 0) {
        return <p className="text-center text-gray-600">No orders found.</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Orders</h2>
            <div className="space-y-4">
                {user.orders.map((order) => (
                    <div key={order.orderId} className="border p-4 rounded-lg shadow-md">
                        <p className="text-lg font-semibold">Order ID: {order.orderId.toString()}</p>
                        <p className="text-gray-600">Vendor ID: {order.vendorId}</p>
                        <p className="text-gray-600">Total Price: ${order.totalPrice}</p>
                        <p className="text-gray-600">Status: <span className={`font-semibold ${order.orderStatus === 'Pending' ? 'text-yellow-500' : 'text-green-600'}`}>{order.orderStatus}</span></p>
                        <p className="text-gray-500">Ordered At: {new Date(order.orderedAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserOrders;
