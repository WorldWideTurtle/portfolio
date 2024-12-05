import About from "@/components/Sections/about";
import Hero from "@/components/Sections/hero";
import Projects from "@/components/Sections/projects";
import Skills from "@/components/Sections/skills";
import Spacer from "@/components/spacer";

export default function Home() {
	return (
		<>
			<div className="pt-12"></div>
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

