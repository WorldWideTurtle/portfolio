import About from "@/components/Sections/about";
import Contact from "@/components/Sections/Contact";
import Hero from "@/components/Sections/hero";
import Projects from "@/components/Sections/projects";
import Skills from "@/components/Sections/skills";
import Spacer from "@/components/spacer";

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
			<Contact />
		</>
	);
}