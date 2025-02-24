import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VendorLogin from "./pages/vendorLogin";
import ShopDetails from "./components/ShopDetails";
import AddCoupan from "./components/AddCoupan";
import ListCoupan from './components/ListCoupan';
import ListProduct from './components/ListProduct';
import AddProduct from "./components/AddProduct";
import { ToastContainer, toast } from 'react-toastify';
import ListProductUser from "./components/ListProductUser";
import ShowVendorCoupan from "./components/ShowVendorCoupan";
import PurchasedCoupan from "./components/PurchasedCoupan";
import UserOrders from "./components/UserOrder";

const App = () => {
  return (
    <Router>
      <div className="mx-4 sm:mx-[10%]">
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vendorlogin" element={<VendorLogin />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/addcoupan" element={<AddCoupan />} />
          <Route path="/shopdetails/:vendorId" element={<ShopDetails />} />
          <Route path="/listcoupan/:vendorId" element={<ListCoupan />} />
          <Route path="/listproduct/:vendorId" element={<ListProduct />} />
          <Route path="/addproduct/:vendorId" element={<AddProduct />} />
          <Route path="/shop/:vendorId" element={<ListProductUser />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/shopcoupan/:vendorId" element={<ShowVendorCoupan />} />
          <Route path='/purchased-coupan' element={<PurchasedCoupan />} />
          <Route path='/user-order' element={<UserOrders />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
