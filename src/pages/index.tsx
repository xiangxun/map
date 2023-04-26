import Head from "next/head";
import Home1 from "./home";

export default function Home() {
  return (
    <>
      <Head>
        {/* <title>MAP</title> */}
        <title>数字建筑</title>
        <meta name='description' content='Master_Archi_Parter' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/logo.svg' />
      </Head>
      <Home1 />
    </>
  );
}
