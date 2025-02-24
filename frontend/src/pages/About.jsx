import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl text-gray-500 pt-10">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      {/* second section */}
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-w-[360px]" src={assets.abt} alt="" />
        <div className="flex flex-col justify-start gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome to our Coupons Website, the Smart Way to Shop & Save! At our platform, we connect buyers with businesses through exclusive, money-saving discount coupons. Whether you're a savvy shopper hunting for the best deals or a business looking to drive more traffic and sales, we've got something special for you! Our goal is simple – to make your shopping experience easier and more affordable.
          </p>

          <h1 className="font-semibold">How It Works?</h1>

          <p>
            Shopping and saving has never been easier! For buyers, our website offers a vast selection of discount coupons across a wide range of categories. From fashion and electronics to dining and beauty services, you'll find discounts on products and services you love. Simply browse, purchase your preferred coupons at discounted rates, and redeem them while shopping at our partner stores to enjoy amazing savings!
          </p>

          <p>
            Our platform is perfect for every type of shopper. Whether you're looking for a seasonal sale, exclusive promotions, or limited-time offers, you'll always find something that fits your needs. Plus, we frequently update our listings to ensure you're always in the loop about the latest and greatest deals available.
          </p>

          <p>
            For businesses, our platform provides a unique opportunity to expand your reach and increase sales with minimal effort. By offering custom discount coupons, businesses can easily attract new customers and retain loyal ones. With the flexibility to set your own discount percentages, terms, and validity periods, businesses have full control over their promotional offers. It's an effective, cost-efficient way to boost visibility and sales.
          </p>

          <p>
            The platform includes a user-friendly dashboard that makes managing coupons a breeze. Businesses can track the performance of their coupons, see real-time customer engagement, and adjust offers accordingly to maximize results. Whether you're a small business or a large enterprise, our system is designed to help you thrive and stay ahead in today’s competitive market.
          </p>

          <p>
            Join our vibrant community of shoppers and businesses today and start benefiting from unbeatable discounts and exciting offers. Whether you’re hunting for the best deals as a customer or looking to grow your business, our platform is your ultimate destination for shopping smart and saving big!
          </p>
        </div>

      </div>

      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Affordable Shopping:</b>
          <p>Get discounts on every purchase.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Easy & Secure:</b>
          <p>Simple user interface with safe transactions.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Business Growth:</b>
          <p>
            A perfect platform for retailers and service providers to gain new
            customers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
