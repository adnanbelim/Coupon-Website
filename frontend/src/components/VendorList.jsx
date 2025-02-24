// import { useContext } from "react";
// import { AppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import { Link } from "react-router-dom";

// const VendorList = () => {
//   const { vendors, backendUrl } = useContext(AppContext);

//   return (
//     <div className="max-w-6xl mx-auto p-6" id="shops">
//       <h1 className="text-3xl font-bold text-blue-600 text-center mb-10">
//         Find By Shops
//       </h1>
//       <hr className="w-1/2 text-center" />
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {vendors
//           .filter((vendor) => vendor.shop?.fill === "true")
//           .map((vendor) => (
//             <Link to={`/shop/${vendor._id}`} key={vendor._id}>
//               <div className="relative bg-white shadow-lg rounded-lg overflow-hidden">
//                 {!vendor.shop?.image ? (
//                   <img
//                     src={assets.shop_img}
//                     alt="Default Shop"
//                     className="w-full h-48 object-cover"
//                   />
//                 ) : (
//                   <img
//                     src={`${backendUrl}/uploads/${vendor.shop.image}`}
//                     alt={vendor.shop.name}
//                     className="w-full h-48 object-cover"
//                   />
//                 )}

//                 {/* Coupon Display */}
//                 {vendor.coupons?.length > 0 && (
//                   <div className="absolute bottom-3 right-5 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
//                     {vendor.coupons.length === 1
//                       ? vendor.coupons[0].percent
//                       : [...vendor.coupons].sort(
//                           (a, b) =>
//                             new Date(b.expiryDate) - new Date(a.expiryDate)
//                         )[0].percent}
//                     % OFF
//                   </div>
//                 )}

//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold">{vendor.shop?.name}</h3>
//                 </div>
//               </div>
//             </Link>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default VendorList;

import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const VendorList = () => {
  const { vendors, backendUrl } = useContext(AppContext);
  const [showAll, setShowAll] = useState(false);

  const filteredVendors = vendors.filter(
    (vendor) => vendor.shop?.fill === "true"
  );
  const displayedVendors = showAll
    ? filteredVendors
    : filteredVendors.slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto p-6" id="shops">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-10">
        Find By Shops
      </h1>
      <hr className="w-1/2 text-center" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayedVendors.map((vendor) => (
          <Link to={`/shop/${vendor._id}`} key={vendor._id}>
            <div className="relative bg-white shadow-lg rounded-lg overflow-hidden">
              {!vendor.shop?.image ? (
                <img
                  src={assets.shop_img}
                  alt="Default Shop"
                  className="w-full h-48 object-cover"
                />
              ) : (
                <img
                  src={`${backendUrl}/uploads/${vendor.shop.image}`}
                  alt={vendor.shop.name}
                  className="w-full h-48 object-cover"
                />
              )}

              {/* Coupon Display */}
              {vendor.coupons?.length > 0 && (
                <div className="absolute bottom-3 right-5 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
                  {vendor.coupons.length === 1
                    ? vendor.coupons[0].percent
                    : [...vendor.coupons].sort(
                        (a, b) =>
                          new Date(b.expiryDate) - new Date(a.expiryDate)
                      )[0].percent}
                  % OFF
                </div>
              )}

              <div className="p-4">
                <h3 className="text-lg font-semibold">{vendor.shop?.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* More Button */}
      {filteredVendors.length > 6 && (
        <div className="text-center mt-6">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default VendorList;
