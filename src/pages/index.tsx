import Head from "next/head";
import Navbar from "@/pages/components/navbar";
import HomePage from "./components/homePage";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>MAP</title>
        <meta name='description' content='Master_Archi_Parter' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='relative z-0 bg-gray-100'>
        <div className='bg-center'>
          <Navbar />
        </div>
        <HomePage />
        <Footer />
      </div>
    </>
  );
}
