import NavPad from "@/components/navPad";
import About from "@/components/Sections/about";
import Hero from "@/components/Sections/hero";
import Projects from "@/components/Sections/projects";
import Skills from "@/components/Sections/skills";
import Spacer from "@/components/spacer";

export default function Home() {
	return (
		<>
			<NavPad />
			<Hero />
			<Spacer id="about" />
			<About />
			<Spacer id="skills"  />
			<Skills />
			<Spacer id="projects"  />
			<Projects />
			<div className="mt-12"></div>
		</>
	);
}