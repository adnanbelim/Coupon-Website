import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  // Get tokens and user data from context
  const {
    userToken,
    vendorToken,
    setUserToken,
    setVendorToken,
    userData,
    vendorId,
  } = useContext(AppContext);

  const logout = () => {
    setUserToken("");
    setVendorToken("");
    localStorage.removeItem("userToken");
    localStorage.removeItem("vendorToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("vendorId");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <div className="flex items-center">
        <img
          onClick={() => navigate(`/`)}
          className="w-12 md:w-16 cursor-pointer"
          src={assets.logo}
          alt="Logo"
        />
        <h2 className="text-blue-600 text-xl md-text-3xl font-bold">MyCoupon</h2>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1 p-4 rounded  hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">HOME</li>
        </NavLink>
        <NavLink to="/about">
          <li className="py-1 p-4 rounded  hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">ABOUT</li>
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1 p-4 rounded  hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">CONTACT</li>
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {/* Show dropdown menu based on user/vendor authentication */}
        {vendorToken || userToken ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 h-8 rounded-full"
              src={assets.user}
              alt="User"
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />

            {/* Dropdown Menu */}
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                {vendorToken ? (
                  <>
                    <p
                      onClick={() => navigate(`/shopdetails/${vendorId}`)}
                      className="hover:text-black cursor-pointer"
                    >
                      Shop Details
                    </p>
                    <p
                      onClick={() => navigate(`/addcoupan`)}
                      className="hover:text-black cursor-pointer"
                    >
                      Create Coupon
                    </p>
                    <p
                      onClick={() => navigate(`/listcoupan/${vendorId}`)}
                      className="hover:text-black cursor-pointer"
                    >
                      List Coupan
                    </p>
                    <p
                      onClick={() => navigate(`/addproduct/${vendorId}`)}
                      className="hover:text-black cursor-pointer"
                    >
                      Add Product
                    </p>
                    <p
                      onClick={() => navigate(`/listproduct/${vendorId}`)}
                      className="hover:text-black cursor-pointer"
                    >
                      List Product
                    </p>
                  </>
                ) : (
                  <>
                    <p
                      onClick={() => navigate(`/my-profile`)}
                      className="hover:text-black cursor-pointer"
                    >
                      My Profile
                    </p>
                    <p
                      onClick={() => navigate(`/purchased-coupan`)}
                      className="hover:text-black cursor-pointer"
                    >
                      Purchase Coupon
                    </p>
                    <p
                      onClick={() => navigate(`/user-order`)}
                      className="hover:text-black cursor-pointer"
                    >
                      Orders
                    </p>
                  </>
                )}
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate(`/login`)}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Login
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu"
        />

        {/* Mobile Menu */}
        {showMenu && (
          <div className="fixed inset-0 bg-white z-30 transition-all md:hidden">
            <div className="flex items-center justify-between px-5 py-6">
              <div className="flex items-center">
                <img
                  onClick={() => navigate(`/`)}
                  className="w-12 md:w-16 cursor-pointer"
                  src={assets.logo}
                  alt="Logo"
                />
                <h2 className="text-blue-600 text-xl md-text-3xl font-bold">MyCoupan</h2>
              </div>
              <img
                className="w-7 cursor-pointer"
                onClick={() => setShowMenu(false)}
                src={assets.cross_icon}
                alt="Close"
              />
            </div>

            <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
             
              
                <NavLink onClick={() => setShowMenu(false)} to="/">
                  <li className="py-1 p-4 rounded  hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">HOME</li>
                </NavLink>
                <NavLink onClick={() => setShowMenu(false)} to="/about">
                  <li className="py-1 p-4 rounded  hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">ABOUT</li>
                </NavLink>
                <NavLink onClick={() => setShowMenu(false)} to="/contact">
                  <li className="py-1 p-4 rounded  hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">CONTACT</li>
                </NavLink>
              
            </ul>

            {/* Show Login Button in Mobile */}
            {!userToken && !vendorToken && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => {
                    navigate(`/login`);
                    setShowMenu(false);
                  }}
                  className="bg-primary text-white px-8 py-3 rounded-full font-light"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
