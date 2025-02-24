import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { user, loading, setLoading, backendUrl, userId, userToken } = useContext(AppContext); // Get userId & token from context

  if (loading) return <p>Loading user data...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">User Profile</h2>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Coupons Purchased:</strong> {user.coupons?.length || 0}</p>
          <p><strong>Orders Placed:</strong> {user.orders?.length || 0}</p>
        </div>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
};

export default MyProfile;
