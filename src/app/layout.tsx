import { ReactElement } from "react";
import localFont from 'next/font/local'
import Header from "../components/header";
import "@/styles/globals.css";
import { Metadata } from "next/types";
import { images } from "@/config/image.config";
import Footer from "@/components/footer";


const edo = localFont({src: "./edosz.woff2", variable: "--font-edo"})

export const metadata: Metadata = {
	title: 'WorldWideTurtle - Portfolio',
	description: 'Portfolio',
  }

export default async function RootLayout({
	children
} : {children: ReactElement}) {

	return (
		<html className={`bg-primary-100 ${edo.className} ${edo.variable} overflow-x-hidden`} lang="en-US">
			<body>
				<img 
					src={images.GradientBG}
					alt="Radial gradient from the top right corner towards the center of the page, fading from red to transparent."
					className="absolute right-0 top-0 w-[30vmax] -z-50"
					aria-hidden
				/>
				<Header />
				<main className="w-full">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}