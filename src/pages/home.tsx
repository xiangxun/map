import React from "react";
import { Navbar, HomePage, Footer } from "@/components/home";
const Home1 = () => {
  return (
    <div>
      <div className='relative z-0 bg-gray-100 h-full px-4'>
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
