import skillsConfig from "@/config/skills.config"
import { readFileSync } from "fs"
import path from "path"
import SkillLantern from "../skillLantern";


export default function Skills() {
    // Read icon file in sync since it's easier
    // This page is compiled at build time so speed is not a concern
    function getSkillIcon(name : string) : string {
        return readFileSync(path.join(process.cwd(),"src/icons/skills/", name + ".svg"),{ encoding: 'utf8', flag: 'r' });
    }

    function generateSkillIcons() {
        let skills = skillsConfig.skills;

        return (
        <>
            {skills.map((e,i)=>{
                return (
                <div className="relative w-fit isolate" key={e.skillName} style={{
                    zIndex: skills.length + 5 - i
                }}>
                    <SkillLantern key={e.skillName} icon={getSkillIcon(e.iconName)} skill={e} />
                </div> 
                ) 
            })}
        </>
        )
    }
    
    return (
        <div>
            <h1 id="about" className="sr-only">About</h1>
            <div className="px-8 pb-4 relative">
                <div className="max-w-text tracking-[0.075em] md:text-xl text-justify">
                    <span>Sebastian Eckhard (HE/HIM) - </span>
                    <span className="text-white-600 font-math">I love building experiences that impress, not only visually, but also on a technical level. When I'm not working on my own projects, I like to take pictures, read or play games.</span>
                </div>
            </div>
            <div className="px-[5%] flex flex-wrap justify-between gap-8 pt-16 overflow-hidden relative">
                <div className="absolute w-full h-16 bg-gradient-to-b from-primary-100 to-transparent top-0 z-50"></div>
                {generateSkillIcons()}
            </div>
        </div>
    )
}