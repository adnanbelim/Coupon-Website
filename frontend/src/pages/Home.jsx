import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
// import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
import VendorList from "../components/VendorList";

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      {/* <TopDoctors /> */}
      <VendorList />
      <Banner/>
    
    </div>
  );
};

export default Home;
