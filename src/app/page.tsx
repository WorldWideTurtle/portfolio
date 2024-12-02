import { Carousel } from "@/components/Carousel/Carousel";
import About from "@/components/Sections/about";
import Hero from "@/components/Sections/hero";
import Projects from "@/components/Sections/projects";
import Skills from "@/components/Sections/skills";
import Spacer from "@/components/spacer";
import Image from "next/image";



export default function Home() {
	return (
		<>
			<div className="pt-12"></div>
			<Hero />
			<Spacer />
			<About />
			<Skills />
			<Spacer />
			<Projects />
			<Spacer />
		</>
	);
}