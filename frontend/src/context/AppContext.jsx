import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [vendorId, setVendorId] = useState(
    localStorage.getItem("vendorId") || null
  );
  const [userToken, setUserToken] = useState(
    localStorage.getItem("userToken") || ""
  );
  const [vendorToken, setVendorToken] = useState(
    localStorage.getItem("vendorToken") || ""
  );
  const [vendors, setVendors] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    setUserId(null);
    setUserToken("");

    localStorage.removeItem("vendorToken");
    localStorage.removeItem("vendorId");
    setVendorId(null);
    setVendorToken("");
  };

  const signUpUser = async (userData) => {
    const response = await axios.post(
      `${backendUrl}/api/user/signup`,
      userData
    );
    if (response.data.success) {
      localStorage.setItem("userToken", response.data.userToken);
      localStorage.setItem("userId", response.data.userId);
      setUserId(response.data.userId);
      setUserToken(response.data.userToken);
    }
    return response.data;
  };

  const signInUser = async (credentials) => {
    const response = await axios.post(
      `${backendUrl}/api/user/signin`,
      credentials
    );
    if (response.data.success) {
      localStorage.setItem("userToken", response.data.userToken);
      localStorage.setItem("userId", response.data.userId);
      setUserId(response.data.userId);
      setUserToken(response.data.userToken);
    }
    return response.data;
  };

  const signUpVendor = async (vendorData) => {
    const response = await axios.post(
      `${backendUrl}/api/vendor/signup`,
      vendorData
    );
    if (response.data.success) {
      localStorage.setItem("vendorToken", response.data.vendorToken);
      localStorage.setItem("vendorId", response.data.vendorId);
      setVendorId(response.data.vendorId);
      setVendorToken(response.data.vendorToken);
    }
    return response.data;
  };

  useEffect(() => {
    console.log(vendorId);
    console.log(vendorToken);
  });

  const signInVendor = async (credentials) => {
    const response = await axios.post(
      `${backendUrl}/api/vendor/signin`,
      credentials
    );
    if (response.data.success) {
      localStorage.setItem("vendorToken", response.data.vendorToken);
      localStorage.setItem("vendorId", response.data.vendorId);
      setVendorId(response.data.vendorId);
      setVendorToken(response.data.vendorToken);
    }
    return response.data;
  };

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/vendors`);
        setVendors(response.data.vendors);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch vendors");
      }
    };

    fetchVendors();
  }, [backendUrl]);

  // useEffect(()=>{
  //   console.log('UserId : ' + userId);
  //   console.log('UserToken : ' + userToken);
  // })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/single`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        setUser(response.data.user);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch user details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (userToken) {
      // 🔥 Only fetch if user is logged in
      fetchUser();
    }
  }, [backendUrl, userToken]);
  console.log("Backend URL:", backendUrl);
  console.log("Vendor Token:", vendorToken);
  console.log("Vendor ID:", vendorId);

  return (
    <AppContext.Provider
      value={{
        userId,
        vendorId,
        userToken,
        vendorToken,
        signUpUser,
        signInUser,
        signUpVendor,
        signInVendor,
        logout,
        backendUrl,
        setUserToken,
        setVendorToken,
        vendors,
        user,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AuthProvider;
