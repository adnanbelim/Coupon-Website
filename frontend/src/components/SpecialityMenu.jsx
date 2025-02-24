import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="flex flex-col justify-center items-center gap-4 py-16 text-gray-800">
      <h2 className="text-blue-600 font-bold text-xl md:text-3xl text-center">Follow Steps & Get Discounts!!</h2>
      <div className="flex justify-center sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        <img src={assets.steps} alt="" className="w-2/3" />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="border px-8 md:px-16 py-8 rounded-lg sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b className="text-xl text-center">Step 1</b>
          <p className="text-lg">Choose Your Favourite Shop.</p>
        </div>
        <div className="border px-8 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b className="text-xl text-center">Step 2</b>
          <p className="text-lg">Purchase Coupons</p>
        </div>
        <div className="border px-8 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b className="text-xl text-center">Step 3</b>
          <p className="text-lg">
            Purchase Products & Get Big Discount!!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpecialityMenu;
