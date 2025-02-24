import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr,1fr,1fr] gap-14 my-10 mt-40 text-sm">
        {/* -left section */}
        <div>
          <div className="flex items-center">
            <img
              onClick={() => navigate(`/`)}
              className="w-12 md:w-16 cursor-pointer"
              src={assets.logo}
              alt="Logo"
            />
            <h2 className="text-blue-600 text-xl md-text-3xl font-bold">Coupan</h2>
          </div>
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Save Big with <Link to="/">Us</Link>! Discover the best deals and
            exclusive discounts on your favorite brands. Our easy-to-use
            platform helps you find the latest coupons, ensuring you never miss
            a chance to save. Start shopping smart today!
          </p>
        </div>
        {/* -center section */}
        <div>
          <p className="text-xl mb-5  font-medium">COMPANY</p>
          <ul className="flex flex-col text-gray-600 gap-2">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/about">
              <li>About us</li>
            </Link>
            <Link to="/contact">
              <li>Contact us</li>
            </Link>
            <Link to="/login">
              <li>Login</li>
            </Link>
          </ul>
        </div>
        {/* -right section */}
        <div>
          <p className="text-xl mb-5  font-medium">GET IN TOUCH</p>
          <ul className="flex flex-col text-gray-600 gap-2">
            <li>+91 98765 43210 </li>
            <li>coupan@gmail.com</li>
          </ul>
        </div>
      </div>
      {/* copyright section */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright © 2025 Coupan - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
