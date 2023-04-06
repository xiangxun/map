import Head from "next/head";
import Navbar from "./home/navbar";
import HomePage from "./home/homePage";
import Footer from "./home/footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>MAP</title>
        {/* <title>数字建筑</title> */}
        <meta name='description' content='Master_Archi_Parter' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {/* <link rel='icon' href='/favicon.ico' /> */}
        <link rel='icon' href='/logo.svg' />
      </Head>
      <div className='relative z-0 bg-gray-100 h-screen'>
        <div className='bg-center'>
          <Navbar />
        </div>
        <HomePage />
        <Footer />
      </div>
    </>
  );
}
