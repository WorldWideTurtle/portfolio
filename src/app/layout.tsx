import { ReactElement } from "react";
import localFont from 'next/font/local'
import Header from "../components/header";
import "@/styles/globals.css";
import { Metadata } from "next/types";
import Image from "next/image";
import { images } from "@/config/image.config";


const edo = localFont({src: "./edosz.woff2"})

export const metadata: Metadata = {
	title: 'WorldWideDev',
	description: 'Portfolio',
  }

export default async function RootLayout({
	children
} : {children: ReactElement}) {

	return (
		<html className={`bg-primary-100 ${edo.className} overflow-x-hidden`}>
			<body>
				<Image 
					src={images.GradientBG}
					alt="Radial gradient from the top right corner towards the center of the page, fading from red to transparent."
					width={400}
					height={400}
					className="absolute right-0 top-0 w-[30vmax] -z-50"
				/>
				{/* <div className="absolute h-[200dvh] w-full z-[-1]" style={{
					background: "radial-gradient(circle at left center, rgba(68, 4, 6, 0.6) 14%, rgba(44, 1, 2, 0) 50%)"
				}}></div>
				<div className="absolute size-[100dvh] right-0 z-[-1]" style={{
					background: "radial-gradient(circle at top right, rgba(68, 4, 6, 0.6), rgba(44,1,2,0) 60%)"
				}}></div> */}
				<Header />
				<div className="w-full">
					{children}
				</div>
			</body>
		</html>
	);
}