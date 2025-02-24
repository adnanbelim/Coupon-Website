import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { assets } from "../assets/assets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator"; // Ensure validator is installed

const Contact = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = () => {
    if (!email.trim()) {
      toast.error("Please enter an email address.");
      return;
    }

    if (!validator.isEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.success("You're in! Keep an eye on your inbox for exciting updates and exclusive deals.", {
      onClose: () => {
        navigate("/");
        setEmail(""); // Clear input field
        setTimeout(() => {
          const section = document.getElementById("shops");
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }, 500); // Delay to ensure the page loads before scrolling
      },
    });
  };

  return (
   
    <div>
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar />

      <div className="text-center text-2xl text-gray-500 pt-10">
        <p>
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img className="w-full md:max-w-md" src={assets.cnt} alt="" />
        <div className="flex flex-col justify-start items-start gap-6 w-full">
          <p className="w-1/2">
            We are here to help! Whether you have questions about coupons, need
            support with your account, or want to collaborate with us, feel free
            to reach out.
          </p>
          <p className="font-semibold text-lg text-gray-600">Our OFFICE</p>
          <p className="text-gray-500">
            123, Main Market Road, <br />
            Jodhpur, Rajasthan, India - 342001
          </p>
          <p className="text-gray-500">
            Customer Support: +91 98765 43210 <br />
            Business Inquiries: +91 87654 32109
          </p>
          <p className="text-gray-500">Email: coupan@gmail.com</p>

          <div className="flex justify-center items-center pt-12">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Stay Updated with Our Newsletter
              </h2>
              <p className="text-gray-600 mb-6">
                Sign up to receive the latest updates, offers, and promotions.
              </p>
              <div className="flex flex-col items-center gap-4">
                <input
                  type="email"
                  placeholder="Type here your email..."
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={handleSubmit}
                  className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 "
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
