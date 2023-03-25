import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/pages/components/navbar";
import Card from "./components/card";
import { HomePage } from "./components/homePage";
import { Footer } from "./components/footer";

const inter = Inter({ subsets: ["latin"] });
//
export default function Home() {
	return (
		<>
			<Head>
				<title>MAP</title>
				<meta name='description' content='Master_Archi_Parter' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Navbar />
			<HomePage />
			<Footer />
		</>
	);
}
