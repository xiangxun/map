import React from "react";
import Navbar from "./navbar";
import HomePage from "./homePage";
import Footer from "./footer";
const Home1 = () => {
  return (
    <div>
      <div className='relative z-0 bg-gray-100 h-screen'>
        <div className='bg-center'>
          <Navbar />
        </div>
        <HomePage />
        <Footer />
      </div>
    </div>
  );
};

export default Home1;
