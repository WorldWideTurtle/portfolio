import skillsConfig from "@/config/skills.config"
import { readFileSync } from "fs"
import path from "path"
import SkillLantern from "../skillLantern";


export default function Skills() {
    function getSkillIcon(name : string) : string {
        return readFileSync(path.join(process.cwd(),"src/icons/skills/", name + ".svg"),{ encoding: 'utf8', flag: 'r' });
    }

    function generateSkillIcons() {
        let skills = skillsConfig.skills;
        let baseIconSize = skillsConfig.baseIconSize;

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

    generateSkillIcons();
    
    return (
        <div>
            <h1 id="about" className="sr-only">About</h1>
            <div className="px-8 pb-4 relative border-b-accent-red border-b-2">
                <div className="max-w-text tracking-[0.075em] md:text-xl text-justify">
                    <span>Sebastian Eckhard (HE/HIM) - </span>
                    <span className="text-white-600 font-math">I love building experiences that impress, not only visually, but also on a technical level. When I'm not working on my own projects, I like to take pictures or play games.</span>
                </div>
            </div>
            <div className="px-[5%] flex flex-wrap justify-between gap-8 pt-16 overflow-hidden">
                {generateSkillIcons()}
            </div>
        </div>
    )
}